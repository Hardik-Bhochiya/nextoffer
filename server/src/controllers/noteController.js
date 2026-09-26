import Note from '../models/Note.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const parseTags = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(t => String(t).trim()).filter(Boolean);
  if (typeof input === 'string') return input.split(/[,;:]+/).map(t => t.trim()).filter(Boolean);
  return [];
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { tag, topic, importance, search, sort } = req.query;
    let query = { userId };

    if (tag && tag !== 'All') {
      query.tags = tag;
    }
    if (topic && topic !== 'All') {
      query.$or = [{ topic }, { tags: topic }];
    }
    if (importance && importance !== 'All') {
      query.importance = importance;
    }
    if (search && search.trim()) {
      const safePattern = escapeRegex(search.trim());
      query.$and = [
        { userId },
        {
          $or: [
            { title: { $regex: safePattern, $options: 'i' } },
            { content: { $regex: safePattern, $options: 'i' } },
            { topic: { $regex: safePattern, $options: 'i' } },
            { tags: { $elemMatch: { $regex: safePattern, $options: 'i' } } }
          ]
        }
      ];
    }

    let sortOption = { pinned: -1, updatedAt: -1 };
    if (sort === 'title') {
      sortOption = { pinned: -1, title: 1 };
    } else if (sort === 'topic') {
      sortOption = { pinned: -1, topic: 1 };
    } else if (sort === 'oldest') {
      sortOption = { pinned: -1, createdAt: 1 };
    }

    const notes = await Note.find(query).sort(sortOption);
    return res.json({ success: true, data: notes.map(formatDoc) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { title, content, tags, topic, importance, pinned, isFavorite } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Note title is required' });
    }
    const tagsArray = (tags && (Array.isArray(tags) ? tags.length > 0 : String(tags).trim()))
      ? parseTags(tags)
      : parseTags(topic);
    const primaryTopic = topic?.trim() || (tagsArray[0] || 'General');

    const note = await Note.create({
      userId,
      title: title.trim(),
      content: content || '',
      topic: primaryTopic,
      tags: tagsArray,
      importance: ['High', 'Medium', 'Low'].includes(importance) ? importance : 'Medium',
      pinned: !!pinned,
      isFavorite: !!isFavorite
    });
    return res.status(201).json({ success: true, data: formatDoc(note) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.tags !== undefined) {
      updateData.tags = parseTags(updateData.tags);
      if (!updateData.topic && updateData.tags.length > 0) {
        updateData.topic = updateData.tags.join(': ');
      }
    } else if (updateData.topic !== undefined) {
      updateData.tags = parseTags(updateData.topic);
    }
    if (updateData.importance && !['High', 'Medium', 'Low'].includes(updateData.importance)) {
      delete updateData.importance;
    }

    let updated = null;
    try {
      updated = await Note.findOneAndUpdate(
        { _id: id, userId },
        updateData,
        { new: true, runValidators: true }
      );
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message || 'Failed to update note' });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    return res.json({ success: true, data: formatDoc(updated) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    let deleted = null;
    try {
      deleted = await Note.findOneAndDelete({ _id: id, userId });
    } catch (castErr) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    return res.json({ success: true, message: 'Note deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
