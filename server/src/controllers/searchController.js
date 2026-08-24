import DsaProblem from '../models/DsaProblem.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';

export const globalSearch = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.json({ success: true, data: { problems: [], notes: [], projects: [] } });
    }

    const regex = new RegExp(q.trim(), 'i');

    const [problems, notes, projects] = await Promise.all([
      DsaProblem.find({ userId, $or: [{ title: regex }, { topic: regex }, { notes: regex }] }).limit(10),
      Note.find({ userId, $or: [{ title: regex }, { content: regex }, { tags: regex }] }).limit(10),
      Project.find({ userId, $or: [{ title: regex }, { description: regex }, { techStack: regex }] }).limit(10)
    ]);

    return res.json({ success: true, data: { problems, notes, projects } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
