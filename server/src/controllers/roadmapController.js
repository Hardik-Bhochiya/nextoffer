import User from '../models/User.js';
import { defaultRoadmaps } from '../data/seedData.js';

export const getRoadmaps = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const completedSet = new Set(user?.completedTopics || []);
    const enrolledSet = new Set(user?.enrolledRoadmaps || []);

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
      user.enrolledRoadmaps.splice(idx, 1);
      enrolled = false;
    } else {
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

export const enrollBatchRoadmaps = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { roadmapIds } = req.body; // array of roadmap string IDs

    if (!Array.isArray(roadmapIds)) {
      return res.status(400).json({ success: false, message: 'roadmapIds must be an array' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.enrolledRoadmaps) user.enrolledRoadmaps = [];

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

export const toggleTopic = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { roadmapId, topicId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Auto-enroll if not already enrolled
    if (!user.enrolledRoadmaps) user.enrolledRoadmaps = [];
    if (!user.enrolledRoadmaps.includes(roadmapId)) {
      user.enrolledRoadmaps.push(roadmapId);
    }

    if (!user.completedTopics) {
      user.completedTopics = [];
    }

    const idx = user.completedTopics.indexOf(topicId);
    if (idx > -1) {
      user.completedTopics.splice(idx, 1);
    } else {
      user.completedTopics.push(topicId);
    }

    await user.save();

    const completedSet = new Set(user.completedTopics);
    const enrolledSet = new Set(user.enrolledRoadmaps);

    const updatedRoadmaps = defaultRoadmaps.map(r => ({
      ...r,
      isEnrolled: enrolledSet.has(r.id),
      topics: r.topics.map(t => ({
        ...t,
        completed: completedSet.has(t.id) || completedSet.has(t.title)
      }))
    }));

    return res.json({
      success: true,
      message: 'Topic progress saved',
      data: updatedRoadmaps
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
