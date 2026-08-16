import { memoryStore } from '../services/store.js';

export const globalSearch = (req, res) => {
  try {
    const { q } = req.query;
    const results = memoryStore.globalSearch(q);
    return res.json({ success: true, data: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
