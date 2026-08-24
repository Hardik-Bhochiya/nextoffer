import User from '../models/User.js';
import { defaultRoadmaps } from '../data/seedData.js';

export const getRoadmaps = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const completedSet = new Set(user?.completedTopics || []);

    const userRoadmaps = defaultRoadmaps.map(r => ({
      ...r,
      topics: r.topics.map(t => ({
        ...t,
        completed: completedSet.has(t.id) || completedSet.has(t.title)
      }))
    }));

    return res.json({ success: true, data: userRoadmaps });
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
    const updatedRoadmaps = defaultRoadmaps.map(r => ({
      ...r,
      topics: r.topics.map(t => ({
        ...t,
        completed: completedSet.has(t.id) || completedSet.has(t.title)
      }))
    }));

    return res.json({
      success: true,
      message: 'Topic status updated',
      data: updatedRoadmaps
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
