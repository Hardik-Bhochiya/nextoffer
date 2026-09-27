import User from '../models/User.js';
import { defaultRoadmaps } from '../data/seedData.js';
import { recordUserActivity } from '../utils/streakHelper.js';

/**
 * GET /api/roadmap
 * Returns all structured learning paths combined with the candidate's personal enrollment
 * and completed milestone status.
 */
export const getRoadmaps = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const completedSet = new Set(user?.completedTopics || []);
    const enrolledSet = new Set(user?.enrolledRoadmaps || []);

    // Merge baseline roadmap definition with candidate's personal progression
    const userRoadmaps = defaultRoadmaps.map(r => ({
      ...r,
      isEnrolled: enrolledSet.has(r.id),
      topics: r.topics.map(t => ({
        ...t,
        completed: completedSet.has(t.id) || completedSet.has(t.title)
      }))
    }));

    return res.json({
      success: true,
      enrolledCount: enrolledSet.size,
      data: userRoadmaps
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/roadmap/:roadmapId/enroll
 * Toggles candidate enrollment in a specific curriculum track.
 */
export const toggleEnrollRoadmap = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { roadmapId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.enrolledRoadmaps) {
      user.enrolledRoadmaps = [];
    }

    const idx = user.enrolledRoadmaps.indexOf(roadmapId);
    let enrolled = false;
    if (idx > -1) {
      // Already enrolled -> remove from active workspace
      user.enrolledRoadmaps.splice(idx, 1);
      enrolled = false;
    } else {
      // Not yet enrolled -> add to active workspace
      user.enrolledRoadmaps.push(roadmapId);
      enrolled = true;
    }

    await user.save();

    return res.json({
      success: true,
      message: enrolled ? `Enrolled in ${roadmapId} roadmap!` : `Unenrolled from ${roadmapId} roadmap`,
      isEnrolled: enrolled,
      enrolledRoadmaps: user.enrolledRoadmaps
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/roadmap/batch-enroll
 * Bulk-enrolls a candidate into multiple tracks (e.g. all 4 Core CS or role compulsory tracks).
 */
export const enrollBatchRoadmaps = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { roadmapIds } = req.body; // Array of roadmap string IDs

    if (!Array.isArray(roadmapIds)) {
      return res.status(400).json({ success: false, message: 'roadmapIds must be an array' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.enrolledRoadmaps) user.enrolledRoadmaps = [];

    // Avoid duplicate enrollments
    roadmapIds.forEach(id => {
      if (!user.enrolledRoadmaps.includes(id)) {
        user.enrolledRoadmaps.push(id);
      }
    });

    await user.save();

    return res.json({
      success: true,
      message: `Enrolled in ${roadmapIds.length} recommended roadmaps!`,
      enrolledRoadmaps: user.enrolledRoadmaps
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PATCH /api/roadmap/:roadmapId/topic/:topicId
 * Toggles a roadmap milestone topic with strict sequential progression enforcement:
 * 1. Completing a topic requires all prior topics in the track to be completed.
 * 2. Unchecking a topic triggers a cascading uncheck of all subsequent topics.
 * 3. Records study activity to maintain user's daily discipline streak.
 */
export const toggleTopic = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { roadmapId, topicId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Auto-enroll track in workspace if interacting with a topic for the first time
    if (!user.enrolledRoadmaps) user.enrolledRoadmaps = [];
    if (!user.enrolledRoadmaps.includes(roadmapId)) {
      user.enrolledRoadmaps.push(roadmapId);
    }

    if (!user.completedTopics) {
      user.completedTopics = [];
    }

    const roadmap = defaultRoadmaps.find(r => r.id === roadmapId);
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    const topicIndex = roadmap.topics.findIndex(t => t.id === topicId || t.title === topicId);
    if (topicIndex === -1) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    const completedSet = new Set(user.completedTopics);
    const isCurrentlyCompleted = completedSet.has(topicId) || completedSet.has(roadmap.topics[topicIndex].title);

    if (!isCurrentlyCompleted) {
      // Attempting to mark complete -> Check all previous topics in strict sequential order
      for (let j = 0; j < topicIndex; j++) {
        const prevT = roadmap.topics[j];
        if (!completedSet.has(prevT.id) && !completedSet.has(prevT.title)) {
          return res.status(400).json({
            success: false,
            message: `Sequential milestone locked: Complete "${prevT.title}" before proceeding.`
          });
        }
      }
      // Prerequisites satisfied -> Mark this topic complete and advance streak
      user.completedTopics.push(topicId);
      await recordUserActivity(userId, `Completed Roadmap Milestone: ${roadmap.topics[topicIndex].title}`);
    } else {
      // Unchecking -> Cascading uncheck of all subsequent milestones in this track
      for (let k = topicIndex; k < roadmap.topics.length; k++) {
        const target = roadmap.topics[k];
        user.completedTopics = user.completedTopics.filter(t => t !== target.id && t !== target.title);
      }
    }

    await user.save();

    // Rebuild updated view of all roadmaps with current completion states
    const updatedCompletedSet = new Set(user.completedTopics);
    const enrolledSet = new Set(user.enrolledRoadmaps);

    const updatedRoadmaps = defaultRoadmaps.map(r => ({
      ...r,
      isEnrolled: enrolledSet.has(r.id),
      topics: r.topics.map(t => ({
        ...t,
        completed: updatedCompletedSet.has(t.id) || updatedCompletedSet.has(t.title)
      }))
    }));

    return res.json({
      success: true,
      message: isCurrentlyCompleted ? 'Milestone progress updated (downstream milestones reset)' : 'Milestone marked completed',
      data: updatedRoadmaps
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
