import Note from '../models/Note.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { tag, search } = req.query;
    let query = { userId };

    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.$and = [
        { userId },
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
          ]
        }
      ];
    }
    const notes = await Note.find(query).sort({ pinned: -1, updatedAt: -1 });
    return res.json({ success: true, data: notes.map(formatDoc) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { title, content, tags, pinned, isFavorite } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Note title is required' });
    }
    const note = await Note.create({
      userId,
      title,
      content: content || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
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
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(t => t.trim());
    }

    const updated = await Note.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

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
    const deleted = await Note.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    return res.json({ success: true, message: 'Note deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
