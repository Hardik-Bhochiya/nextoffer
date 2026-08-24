import Revision from '../models/Revision.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

export const getRevisions = async (req, res) => {
  try {
    const userId = req.user?.id;
    const revisions = await Revision.find({ userId }).sort({ scheduledDate: 1 });
    return res.json({ success: true, data: revisions.map(formatDoc) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createRevision = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { topic, category, priority, scheduledDate, notes } = req.body;
    if (!topic) {
      return res.status(400).json({ success: false, message: 'Topic is required' });
    }
    const newRev = await Revision.create({
      userId,
      topic,
      category: category || 'DSA',
      priority: priority || 'Medium',
      scheduledDate: scheduledDate || new Date().toISOString().split('T')[0],
      notes: notes || '',
      completed: false
    });
    return res.status(201).json({ success: true, data: formatDoc(newRev) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleRevision = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const rev = await Revision.findOne({ _id: id, userId });
    if (!rev) {
      return res.status(404).json({ success: false, message: 'Revision item not found' });
    }
    rev.completed = !rev.completed;
    await rev.save();
    return res.json({ success: true, data: formatDoc(rev) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRevision = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const deleted = await Revision.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Revision item not found' });
    }
    return res.json({ success: true, message: 'Revision deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
