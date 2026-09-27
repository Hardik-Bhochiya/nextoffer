import DsaProblem from '../models/DsaProblem.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';
import Roadmap from '../models/Roadmap.js';
import Revision from '../models/Revision.js';

/**
 * Escapes special characters for safe regular expression queries
 * to prevent ReDoS (Regular Expression Denial of Service) attacks.
 */
const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * GET /api/search?q={searchTerm}
 * Unified Global Omnibox Search
 * Concurrently queries across 5 distinct domain models:
 * 1. DSA Problems (title, topic, difficulty, companies, notes)
 * 2. Notes & Flashcards (title, content, tags)
 * 3. Portfolio Projects (title, description, techStack, category)
 * 4. Career Roadmaps (category, description, topic titles)
 * 5. Spaced Revisions (topic, category, notes)
 * 
 * Results are capped at 8 items per domain to ensure snappy round-trip responses.
 */
export const globalSearch = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.json({
        success: true,
        data: { problems: [], notes: [], projects: [], roadmaps: [], revisions: [] }
      });
    }

    const safePattern = escapeRegex(q.trim());
    const regex = new RegExp(safePattern, 'i');

    // Run parallel targeted queries across all collections
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

