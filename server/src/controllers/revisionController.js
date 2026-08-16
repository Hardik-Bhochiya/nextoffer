import { memoryStore } from '../services/store.js';

export const getRevisions = (req, res) => {
  try {
    const revisions = memoryStore.getRevisions();
    return res.json({ success: true, data: revisions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createRevision = (req, res) => {
  try {
    const { topic, category, priority, scheduledDate, notes } = req.body;
    if (!topic) {
      return res.status(400).json({ success: false, message: 'Topic is required' });
    }
    const newRev = memoryStore.addRevision({
      topic,
      category: category || 'DSA',
      priority: priority || 'Medium',
      scheduledDate: scheduledDate || new Date().toISOString().split('T')[0],
      notes: notes || ''
    });
    return res.status(201).json({ success: true, data: newRev });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleRevision = (req, res) => {
  try {
    const { id } = req.params;
    const toggled = memoryStore.toggleRevision(id);
    if (!toggled) {
      return res.status(404).json({ success: false, message: 'Revision item not found' });
    }
    return res.json({ success: true, data: toggled });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRevision = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = memoryStore.deleteRevision(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Revision item not found' });
    }
    return res.json({ success: true, message: 'Revision deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
