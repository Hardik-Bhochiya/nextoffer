import Revision from '../models/Revision.js';
import { recordUserActivity } from '../utils/streakHelper.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

export const getRevisions = async (req, res) => {
  try {
    const userId = req.user?.id;
    const revisions = await Revision.find({ userId }).sort({ scheduledDate: 1, createdAt: -1 });
    return res.json({ success: true, data: revisions.map(formatDoc) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createRevision = async (req, res) => {
  try {
    const userId = req.user?.id;
    const {
      topic,
      category,
      priority,
      difficulty,
      interval,
      confidence,
      scheduledDate,
      notes
    } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ success: false, message: 'Topic is required' });
    }

    const newRev = await Revision.create({
      userId,
      topic: topic.trim(),
      category: category || 'DSA',
      priority: priority || 'Medium',
      difficulty: difficulty || 'Medium',
      interval: interval || 'Day 1',
      confidence: confidence || 'Needs Practice',
      scheduledDate: scheduledDate || new Date().toISOString().split('T')[0],
      notes: notes ? notes.trim() : '',
      completed: false
    });

    return res.status(201).json({ success: true, data: formatDoc(newRev) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRevision = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    let rev = await Revision.findOne({ _id: id, userId });
    if (!rev) {
      return res.status(404).json({ success: false, message: 'Revision item not found' });
    }

    if (req.body.topic !== undefined) rev.topic = req.body.topic.trim();
    if (req.body.category !== undefined) rev.category = req.body.category;
    if (req.body.priority !== undefined) rev.priority = req.body.priority;
    if (req.body.difficulty !== undefined) rev.difficulty = req.body.difficulty;
    if (req.body.interval !== undefined) rev.interval = req.body.interval;
    if (req.body.confidence !== undefined) rev.confidence = req.body.confidence;
    if (req.body.scheduledDate !== undefined) rev.scheduledDate = req.body.scheduledDate;
    if (req.body.notes !== undefined) rev.notes = req.body.notes.trim();
    if (req.body.completed !== undefined) {
      const wasCompleted = rev.completed;
      rev.completed = !!req.body.completed;
      if (!wasCompleted && rev.completed) {
        rev.completedAt = new Date();
        await recordUserActivity(userId, `Completed Spaced Revision: ${rev.topic}`);
      } else if (!rev.completed) {
        rev.completedAt = null;
      }
    }

    await rev.save();
    return res.json({ success: true, data: formatDoc(rev) });
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
    let streakUpdate = null;

    if (rev.completed) {
      rev.completedAt = new Date();
      streakUpdate = await recordUserActivity(userId, `Completed Spaced Revision: ${rev.topic}`);
    } else {
      rev.completedAt = null;
    }

    await rev.save();
    return res.json({
      success: true,
      data: formatDoc(rev),
      streakInfo: streakUpdate
    });
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
    return res.json({ success: true, message: 'Revision deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
