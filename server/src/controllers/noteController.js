import { memoryStore } from '../services/store.js';

export const getNotes = (req, res) => {
  try {
    const { tag, search } = req.query;
    let notes = memoryStore.getNotes();
    if (tag) {
      notes = notes.filter(n => n.tags && n.tags.includes(tag));
    }
    if (search) {
      const q = search.toLowerCase();
      notes = notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    }
    return res.json({ success: true, data: notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createNote = (req, res) => {
  try {
    const { title, content, tags, pinned, isFavorite } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Note title is required' });
    }
    const newNote = memoryStore.addNote({
      title,
      content: content || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      pinned: !!pinned,
      isFavorite: !!isFavorite
    });
    return res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNote = (req, res) => {
  try {
    const { id } = req.params;
    const updated = memoryStore.updateNote(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNote = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = memoryStore.deleteNote(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    return res.json({ success: true, message: 'Note deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
