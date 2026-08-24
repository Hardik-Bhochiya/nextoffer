import User from '../models/User.js';
import DsaProblem from '../models/DsaProblem.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';
import Revision from '../models/Revision.js';
import { defaultRoadmaps } from '../data/seedData.js';

// Calculate Role-Based Placement Readiness Score
export const calculateRoleBasedReadiness = (targetRole = '', dsaProblems = [], userCompletedTopics = [], projects = [], notes = []) => {
  const role = targetRole.toLowerCase();

  // DSA Metrics
  const solvedProblems = dsaProblems.filter(p => p.status === 'Solved');
  const easySolved = solvedProblems.filter(p => p.difficulty === 'Easy').length;
  const mediumSolved = solvedProblems.filter(p => p.difficulty === 'Medium').length;
  const hardSolved = solvedProblems.filter(p => p.difficulty === 'Hard').length;

  // Weighted DSA points (target ~15-20 problems for high score early on)
  const dsaPoints = (easySolved * 2) + (mediumSolved * 4) + (hardSolved * 7);
  const dsaProgress = Math.min(100, Math.round((dsaPoints / 50) * 100));

  // Roadmap Metrics
  const completedSet = new Set(userCompletedTopics || []);
  
  // Count by category
  const frontendTopics = defaultRoadmaps.find(r => r.id === 'frontend')?.topics || [];
  const backendTopics = defaultRoadmaps.find(r => r.id === 'backend')?.topics || [];
  const dsaMapTopics = defaultRoadmaps.find(r => r.id === 'dsa-mastery')?.topics || [];
  const sysDesignTopics = defaultRoadmaps.find(r => r.id === 'system-design')?.topics || [];
  const coreCsTopics = defaultRoadmaps.find(r => r.id === 'core-cs')?.topics || [];
  const devopsTopics = defaultRoadmaps.find(r => r.id === 'devops')?.topics || [];
  const aiTopics = defaultRoadmaps.find(r => r.id === 'ai-ml')?.topics || [];

  const feCompleted = frontendTopics.filter(t => completedSet.has(t.id)).length;
  const beCompleted = backendTopics.filter(t => completedSet.has(t.id)).length;
  const sysCompleted = sysDesignTopics.filter(t => completedSet.has(t.id)).length;
  const csCompleted = coreCsTopics.filter(t => completedSet.has(t.id)).length;
  const doCompleted = devopsTopics.filter(t => completedSet.has(t.id)).length;
  const aiCompleted = aiTopics.filter(t => completedSet.has(t.id)).length;

  const totalAllTopics = defaultRoadmaps.reduce((acc, r) => acc + r.topics.length, 0);
  const totalCompletedTopics = completedSet.size;
  const allRoadmapsProgress = totalAllTopics > 0 ? Math.min(100, Math.round((totalCompletedTopics / totalAllTopics) * 100)) : 0;

  // Project Metrics
  const totalProjects = projects.length;
  const projectScore = Math.min(100, totalProjects * 35); // 3 good projects = 100%

  // Notes & Core CS
  const noteScore = Math.min(100, notes.length * 25); // 4 notes = 100%

  let finalScore = 0;
  let weightsExplanation = {};

  if (role.includes('frontend') || role.includes('react') || role.includes('ui') || role.includes('web')) {
    // Frontend-heavy weighting
    const feProgress = frontendTopics.length > 0 ? Math.round((feCompleted / frontendTopics.length) * 100) : 0;
    finalScore = (feProgress * 0.40) + (projectScore * 0.35) + (dsaProgress * 0.25);
    weightsExplanation = {
      roleCategory: 'Frontend Engineer',
      breakdown: [
        { label: 'Frontend Roadmap (40%)', score: feProgress, weight: '40%' },
        { label: 'Portfolio Projects (35%)', score: projectScore, weight: '35%' },
        { label: 'DSA & Coding (25%)', score: dsaProgress, weight: '25%' }
      ]
    };
  } else if (role.includes('backend') || role.includes('node') || role.includes('java') || role.includes('api') || role.includes('python')) {
    // Backend-heavy weighting
    const beSysTotal = backendTopics.length + sysDesignTopics.length;
    const beSysCompleted = beCompleted + sysCompleted;
    const beSysProgress = beSysTotal > 0 ? Math.round((beSysCompleted / beSysTotal) * 100) : 0;
    finalScore = (beSysProgress * 0.40) + (dsaProgress * 0.35) + (projectScore * 0.25);
    weightsExplanation = {
      roleCategory: 'Backend Engineer',
      breakdown: [
        { label: 'Backend & System Design (40%)', score: beSysProgress, weight: '40%' },
        { label: 'DSA & Algorithms (35%)', score: dsaProgress, weight: '35%' },
        { label: 'Backend Projects (25%)', score: projectScore, weight: '25%' }
      ]
    };
  } else if (role.includes('ai') || role.includes('machine') || role.includes('ml') || role.includes('data')) {
    // AI / ML / Data
    const aiTotal = aiTopics.length + coreCsTopics.length;
    const aiDone = aiCompleted + csCompleted;
    const aiProgress = aiTotal > 0 ? Math.round((aiDone / aiTotal) * 100) : 0;
    finalScore = (aiProgress * 0.40) + (projectScore * 0.30) + (dsaProgress * 0.30);
    weightsExplanation = {
      roleCategory: 'AI & Machine Learning Engineer',
      breakdown: [
        { label: 'AI/ML & Math Track (40%)', score: aiProgress, weight: '40%' },
        { label: 'ML Projects & Papers (30%)', score: projectScore, weight: '30%' },
        { label: 'DSA & Coding (30%)', score: dsaProgress, weight: '30%' }
      ]
    };
  } else if (role.includes('devops') || role.includes('cloud') || role.includes('sys') || role.includes('infra')) {
    // DevOps / Cloud / System
    const infraTotal = devopsTopics.length + sysDesignTopics.length;
    const infraCompleted = doCompleted + sysCompleted;
    const infraProgress = infraTotal > 0 ? Math.round((infraCompleted / infraTotal) * 100) : 0;
    finalScore = (infraProgress * 0.45) + (projectScore * 0.30) + (dsaProgress * 0.25);
    weightsExplanation = {
      roleCategory: 'DevOps & Cloud Engineer',
      breakdown: [
        { label: 'Infrastructure & Cloud Roadmap (45%)', score: infraProgress, weight: '45%' },
        { label: 'Projects & Implementations (30%)', score: projectScore, weight: '30%' },
        { label: 'DSA & Scripting (25%)', score: dsaProgress, weight: '25%' }
      ]
    };
  } else {
    // Standard Full Stack / SDE-1
    finalScore = (dsaProgress * 0.35) + (allRoadmapsProgress * 0.35) + (projectScore * 0.20) + (noteScore * 0.10);
    weightsExplanation = {
      roleCategory: 'Full Stack SDE-1',
      breakdown: [
        { label: 'DSA Mastery (35%)', score: dsaProgress, weight: '35%' },
        { label: 'Expert Roadmaps (35%)', score: allRoadmapsProgress, weight: '35%' },
        { label: 'Projects & Milestones (20%)', score: projectScore, weight: '20%' },
        { label: 'Core CS & Notes (10%)', score: noteScore, weight: '10%' }
      ]
    };
  }

  return {
    score: Math.min(100, Math.max(0, Math.round(finalScore))),
    dsaProgress,
    allRoadmapsProgress,
    projectScore,
    weightsExplanation
  };
};

export const getDashboardMetrics = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const [dsaProblems, notes, projects, pendingRevisions] = await Promise.all([
      DsaProblem.find({ userId }),
      Note.find({ userId }),
      Project.find({ userId }),
      Revision.find({ userId, completed: false })
    ]);

    // Role-based calculation
    const readinessInfo = calculateRoleBasedReadiness(
      user.targetRole,
      dsaProblems,
      user.completedTopics || [],
      projects,
      notes
    );

    // Save updated score to user record
    if (user.readinessScore !== readinessInfo.score) {
      user.readinessScore = readinessInfo.score;
      await user.save();
    }

    // DSA stats breakdown
    const solvedProblems = dsaProblems.filter(p => p.status === 'Solved');
    const easyCount = solvedProblems.filter(p => p.difficulty === 'Easy').length;
    const mediumCount = solvedProblems.filter(p => p.difficulty === 'Medium').length;
    const hardCount = solvedProblems.filter(p => p.difficulty === 'Hard').length;

    // Topic wise distribution
    const topicBreakdown = {};
    const standardTopics = [
      'Arrays & Hashing',
      'Two Pointers',
      'Sliding Window',
      'Linked List',
      'Trees',
      'Graphs',
      'Dynamic Programming'
    ];

    standardTopics.forEach(t => {
      topicBreakdown[t] = { total: 0, solved: 0 };
    });

    dsaProblems.forEach(p => {
      const t = p.topic || 'General DSA';
      if (!topicBreakdown[t]) {
        topicBreakdown[t] = { total: 0, solved: 0 };
      }
      topicBreakdown[t].total += 1;
      if (p.status === 'Solved') {
        topicBreakdown[t].solved += 1;
      }
    });

    // Roadmap counts
    const totalRoadmapTopics = defaultRoadmaps.reduce((acc, r) => acc + r.topics.length, 0);
    const completedRoadmapTopics = (user.completedTopics || []).length;
    const roadmapPercentage = totalRoadmapTopics > 0 
      ? Math.min(100, Math.round((completedRoadmapTopics / totalRoadmapTopics) * 100))
      : 0;

    return res.json({
      success: true,
      data: {
        readinessScore: readinessInfo.score,
        targetRole: user.targetRole,
        weightsExplanation: readinessInfo.weightsExplanation,
        dsaStats: {
          total: dsaProblems.length,
          solved: solvedProblems.length,
          easySolved: easyCount,
          mediumSolved: mediumCount,
          hardSolved: hardCount
        },
        roadmapStats: {
          total: totalRoadmapTopics,
          completed: completedRoadmapTopics,
          percentage: roadmapPercentage
        },
        topicBreakdown,
        totalProjects: projects.length,
        totalNotes: notes.length,
        pendingRevisionsCount: pendingRevisions.length,
        user: {
          name: user.name,
          streak: user.streak,
          targetRole: user.targetRole,
          dreamCompany: user.dreamCompany,
          gradYear: user.gradYear,
          readinessScore: readinessInfo.score
        }
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
      message: 'Study hours recorded successfully',
      data: { hours: Number(hours) || 1, dsaSolved: Number(dsaSolved) || 0 }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
