import User from '../models/User.js';
import DsaProblem from '../models/DsaProblem.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';
import Revision from '../models/Revision.js';
import Roadmap from '../models/Roadmap.js';

export const getDashboardMetrics = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const dsaProblems = await DsaProblem.find({ userId });
    const totalDsa = dsaProblems.length;
    const solvedDsa = dsaProblems.filter(p => p.status === 'Solved').length;
    const easyCount = dsaProblems.filter(p => p.difficulty === 'Easy' && p.status === 'Solved').length;
    const mediumCount = dsaProblems.filter(p => p.difficulty === 'Medium' && p.status === 'Solved').length;
    const hardCount = dsaProblems.filter(p => p.difficulty === 'Hard' && p.status === 'Solved').length;

    const totalNotes = await Note.countDocuments({ userId });
    const totalProjects = await Project.countDocuments({ userId });
    const pendingRevisions = await Revision.find({ userId, completed: false });

    // Roadmaps completion (roadmaps are shared, not per user)
    const roadmaps = await Roadmap.find();
    let totalTopics = 0;
    let completedTopics = 0;
    roadmaps.forEach(r => {
      r.topics.forEach(t => {
        totalTopics++;
        if (t.completed) completedTopics++;
      });
    });
    const roadmapProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return res.json({
      success: true,
      data: {
        totalDsa,
        solvedDsa,
        dsaBreakdown: { easy: easyCount, medium: mediumCount, hard: hardCount },
        roadmapProgress,
        totalProjects,
        totalNotes,
        user: {
          name: user.name,
          streak: user.streak,
          targetRole: user.targetRole,
          dreamCompany: user.dreamCompany,
          readinessScore: user.readinessScore
        },
        pendingRevisionsCount: pendingRevisions.length
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logStudyHours = async (req, res) => {
  try {
    const { hours, dsaSolved } = req.body;
    return res.json({
      success: true,
      message: 'Study hours logged successfully',
      data: { hours: Number(hours) || 1, dsaSolved: Number(dsaSolved) || 0 }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
