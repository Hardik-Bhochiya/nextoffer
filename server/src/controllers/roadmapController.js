import Roadmap from '../models/Roadmap.js';

export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    return res.json({ success: true, data: roadmaps });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleTopic = async (req, res) => {
  try {
    const { roadmapId, topicId } = req.params;
    const roadmap = await Roadmap.findOne({ id: roadmapId });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    const topic = roadmap.topics.id(topicId) || roadmap.topics.find(t => t.id === topicId || t.title === topicId);
    if (!topic) {
      // Also check topic by title or fallback
      const foundIdx = roadmap.topics.findIndex(t => t.title.toLowerCase() === topicId.toLowerCase());
      if (foundIdx !== -1) {
        roadmap.topics[foundIdx].completed = !roadmap.topics[foundIdx].completed;
        await roadmap.save();
        return res.json({ success: true, data: roadmap });
      }
      return res.status(404).json({ success: false, message: 'Topic not found in roadmap' });
    }

    topic.completed = !topic.completed;
    await roadmap.save();

    return res.json({ success: true, data: roadmap });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
