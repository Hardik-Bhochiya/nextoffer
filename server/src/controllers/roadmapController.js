import { memoryStore } from '../services/store.js';

export const getRoadmaps = (req, res) => {
  try {
    const roadmaps = memoryStore.getRoadmaps();
    return res.json({ success: true, data: roadmaps });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleTopic = (req, res) => {
  try {
    const { roadmapId, topicId } = req.params;
    const result = memoryStore.toggleRoadmapTopic(roadmapId, topicId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Roadmap or topic not found' });
    }
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
