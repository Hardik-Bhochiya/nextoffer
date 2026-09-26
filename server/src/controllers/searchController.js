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
      DsaProblem.find({
        $and: [
          { userId },
          {
            $or: [
              { title: regex },
              { topic: regex },
              { topics: regex },
              { difficulty: regex },
              { companies: regex },
              { notes: regex },
              { platform: regex }
            ]
          }
        ]
      }).limit(8),
      Note.find({
        userId,
        $or: [
          { title: regex },
          { content: regex },
          { tags: regex }
        ]
      }).limit(8),
      Project.find({
        userId,
        $or: [
          { title: regex },
          { description: regex },
          { techStack: regex },
          { category: regex }
        ]
      }).limit(8),
      Roadmap.find({
        $or: [
          { category: regex },
          { description: regex },
          { 'topics.title': regex },
          { 'topics.resources': regex }
        ]
      }).limit(8),
      Revision.find({
        userId,
        $or: [
          { topic: regex },
          { category: regex },
          { notes: regex }
        ]
      }).limit(8)
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
