import DsaProblem from '../models/DsaProblem.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';
import Roadmap from '../models/Roadmap.js';
import Revision from '../models/Revision.js';

const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const globalSearch = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.json({ success: true, data: { problems: [], notes: [], projects: [], roadmaps: [], revisions: [] } });
    }

    const safePattern = escapeRegex(q.trim());
    const regex = new RegExp(safePattern, 'i');

    const [problems, notes, projects, roadmaps, revisions] = await Promise.all([
      DsaProblem.find({ userId, $or: [{ title: regex }, { topic: regex }, { notes: regex }] }).limit(6),
      Note.find({ userId, $or: [{ title: regex }, { content: regex }, { tags: regex }] }).limit(6),
      Project.find({ userId, $or: [{ title: regex }, { description: regex }, { techStack: regex }] }).limit(6),
      Roadmap.find({ $or: [{ category: regex }, { description: regex }, { 'topics.title': regex }] }).limit(6),
      Revision.find({ userId, $or: [{ topic: regex }, { category: regex }, { notes: regex }] }).limit(6)
    ]);

    return res.json({
      success: true,
      data: {
        problems,
        notes,
        projects,
        roadmaps,
        revisions
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default { globalSearch };
