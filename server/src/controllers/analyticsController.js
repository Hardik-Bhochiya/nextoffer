import User from '../models/User.js';
import DsaProblem from '../models/DsaProblem.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';
import { DailyTask, StudyGoal } from '../models/Planner.js';
import { defaultRoadmaps } from '../data/seedData.js';
import { calculateStreakStatus } from '../utils/streakHelper.js';

export const universalCoreCsIds = ['cs-os', 'cs-dbms', 'cs-networks', 'cs-oop-lld'];

// Calculate Role-Based Placement Readiness & Predictive Placement Score
export const calculateRoleBasedReadiness = (targetRole = '', dsaProblems = [], userCompletedTopics = [], projects = [], notes = [], enrolledRoadmaps = []) => {
  const role = (targetRole || 'Full Stack Engineer').toLowerCase();

  // 1. Solved DSA Metrics & Pattern Diversity
  const solvedProblems = dsaProblems.filter(p => p.status === 'Solved' || p.status === 'Completed');
  const easySolved = solvedProblems.filter(p => p.difficulty === 'Easy').length;
  const mediumSolved = solvedProblems.filter(p => p.difficulty === 'Medium').length;
  const hardSolved = solvedProblems.filter(p => p.difficulty === 'Hard').length;

  const distinctTopics = new Set();
  solvedProblems.forEach(p => {
    if (Array.isArray(p.topics)) {
      p.topics.forEach(t => distinctTopics.add(t));
    } else if (p.topic) {
      distinctTopics.add(p.topic);
    }
  });

  // Easy = 1, Medium = 2.5, Hard = 4.5
  const dsaWeightedScore = (easySolved * 1) + (mediumSolved * 2.5) + (hardSolved * 4.5);

  const getDsaProgress = (benchmarkPoints, requiredTopics) => {
    const rawVolume = Math.min(100, Math.round((dsaWeightedScore / benchmarkPoints) * 100));
    const diversityRatio = Math.min(1.0, 0.4 + (0.6 * (distinctTopics.size / Math.max(1, requiredTopics))));
    return Math.min(100, Math.round(rawVolume * diversityRatio));
  };

  // 2. Completed Milestones Set
  const completedSet = new Set(userCompletedTopics || []);

  // Helper to calculate progress for specific roadmap IDs
  const getRoadmapsProgress = (roadmapIds = []) => {
    const relevantRoadmaps = defaultRoadmaps.filter(r => roadmapIds.includes(r.id));
    const totalTopics = relevantRoadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
    if (totalTopics === 0) return 0;
    const completedTopics = relevantRoadmaps.reduce((acc, r) => {
      return acc + (r.topics?.filter(t => completedSet.has(t.id) || completedSet.has(t.title)).length || 0);
    }, 0);
    return Math.min(100, Math.round((completedTopics / totalTopics) * 100));
  };

  // 3. Core CS Progress
  const coreCsProgress = getRoadmapsProgress(universalCoreCsIds);

  // 4. Project Progress (benchmarked against 2 completed architecture capstones)
  const projectScore = Math.min(100, Math.round((projects.length / 2) * 100));

  let finalScore = 0;
  let recommendedRoadmapIds = [];
  let recommendedRoadmapTitles = [];
  let nextActionItems = [];
  let weightsExplanation = {};

  if (role.includes('sde') || role.includes('core dsa') || role.includes('algorithm') || role.includes('software engineer')) {
    // 1. Software Engineer (SDE)
    const dsaProgress = getDsaProgress(75, 8);

    recommendedRoadmapIds = ['dsa-foundation', 'dsa-advanced', 'sys-hld'];
    recommendedRoadmapTitles = [
      'Data Structures Foundation',
      'Advanced Algorithms & Graph Mastery',
      'High-Level Distributed Systems (HLD)'
    ];

    const sdeRoadmapScore = getRoadmapsProgress(recommendedRoadmapIds);
    finalScore = (dsaProgress * 0.40) + (sdeRoadmapScore * 0.25) + (projectScore * 0.20) + (coreCsProgress * 0.15);

    nextActionItems = [
      { action: 'Solve 40+ LeetCode Medium/Hard DP, Tree & Graph patterns across topics', boost: '+20%', done: dsaProgress >= 60 },
      { action: 'Complete High-Level Distributed Systems & LLD Machine Coding', boost: '+15%', done: sdeRoadmapScore >= 50 },
      { action: 'Master 4 Universal Core CS Subjects (OS Concurrency, DBMS ACID, Networks)', boost: '+15%', done: coreCsProgress >= 50 }
    ];

    weightsExplanation = {
      roleCategory: 'Software Development Engineer (SDE)',
      breakdown: [
        { label: 'DSA Problem Solving & Patterns (40%)', score: dsaProgress, weight: '40%' },
        { label: 'Algorithms & HLD Roadmaps (25%)', score: sdeRoadmapScore, weight: '25%' },
        { label: 'System Capstone Projects (20%)', score: projectScore, weight: '20%' },
        { label: '4 Universal Core CS Subjects (15%)', score: coreCsProgress, weight: '15%' }
      ]
    };
  } else if (role.includes('backend') || role.includes('node') || role.includes('java') || role.includes('spring') || role.includes('express')) {
    // 2. Backend & Distributed Systems Engineer
    const dsaProgress = getDsaProgress(50, 6);

    recommendedRoadmapIds = ['be-node', 'be-spring', 'sys-hld'];
    recommendedRoadmapTitles = [
      'Node.js & Express Architecture',
      'Java Spring Boot Enterprise SDE',
      'High-Level Distributed Systems (HLD)'
    ];

    const beRoadmapScore = getRoadmapsProgress(recommendedRoadmapIds);
    finalScore = (beRoadmapScore * 0.35) + (projectScore * 0.30) + (dsaProgress * 0.25) + (coreCsProgress * 0.10);

    nextActionItems = [
      { action: 'Complete Node.js / Spring Boot RESTful & gRPC API pipeline', boost: '+15%', done: beRoadmapScore >= 50 },
      { action: 'Build and deploy a scalable backend with Redis caching and Kafka', boost: '+15%', done: projects.length >= 2 },
      { action: 'Master Database Indexing, B-Trees & OS Concurrency', boost: '+10%', done: coreCsProgress >= 50 }
    ];

    weightsExplanation = {
      roleCategory: 'Backend & Distributed Systems Engineer',
      breakdown: [
        { label: 'Backend & System Design Roadmaps (35%)', score: beRoadmapScore, weight: '35%' },
        { label: 'Scalable Architecture Projects (30%)', score: projectScore, weight: '30%' },
        { label: 'DSA & Non-Linear Algorithms (25%)', score: dsaProgress, weight: '25%' },
        { label: 'OS & DBMS Architecture (10%)', score: coreCsProgress, weight: '10%' }
      ]
    };
  } else if (role.includes('frontend') || role.includes('react') || role.includes('ui')) {
    // 3. Frontend & UI Architecture Engineer
    const dsaProgress = getDsaProgress(35, 4);

    recommendedRoadmapIds = ['fe-react', 'fe-nextjs', 'fe-typescript'];
    recommendedRoadmapTitles = [
      'React.js & Modern UI Architecture',
      'Next.js 15 & Full-Stack Frontend',
      'TypeScript & Modern JavaScript Internals'
    ];

    const feRoadmapScore = getRoadmapsProgress(recommendedRoadmapIds);
    finalScore = (feRoadmapScore * 0.40) + (projectScore * 0.35) + (dsaProgress * 0.15) + (coreCsProgress * 0.10);

    nextActionItems = [
      { action: 'Master React 19 Hooks, Server Components (RSC) & State Architecture', boost: '+20%', done: feRoadmapScore >= 50 },
      { action: 'Build and showcase 2 production-ready web applications with Tailwind', boost: '+15%', done: projects.length >= 2 },
      { action: 'Optimize Core Web Vitals (LCP/INP) and Web Protocols (HTTP/3)', boost: '+10%', done: coreCsProgress >= 40 }
    ];

    weightsExplanation = {
      roleCategory: 'Frontend & UI Architecture Engineer',
      breakdown: [
        { label: 'Frontend & Next.js Roadmaps (40%)', score: feRoadmapScore, weight: '40%' },
        { label: 'UI Capstone Applications (35%)', score: projectScore, weight: '35%' },
        { label: 'DSA & Algorithmic Patterns (15%)', score: dsaProgress, weight: '15%' },
        { label: 'Web Networks & Performance (10%)', score: coreCsProgress, weight: '10%' }
      ]
    };
  } else if (role.includes('devops') || role.includes('docker') || role.includes('k8s') || role.includes('kubernetes') || role.includes('sre')) {
    // 4. DevOps & Site Reliability Engineer
    const dsaProgress = getDsaProgress(30, 4);

    recommendedRoadmapIds = ['do-docker-k8s', 'do-cicd-cloud', 'do-monitoring-linux'];
    recommendedRoadmapTitles = [
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Linux Administration & Observability'
    ];

    const doRoadmapScore = getRoadmapsProgress(recommendedRoadmapIds);
    finalScore = (doRoadmapScore * 0.40) + (projectScore * 0.35) + (dsaProgress * 0.15) + (coreCsProgress * 0.10);

    nextActionItems = [
      { action: 'Dockerize multi-container services with Kubernetes deployments', boost: '+20%', done: doRoadmapScore >= 50 },
      { action: 'Configure automated GitHub Actions CI/CD with AWS Cloud', boost: '+15%', done: projects.length >= 2 },
      { action: 'Practice Linux kernel diagnostics and TCP/IP networking', boost: '+10%', done: coreCsProgress >= 50 }
    ];

    weightsExplanation = {
      roleCategory: 'DevOps & Site Reliability Engineer',
      breakdown: [
        { label: 'Docker, K8s & Cloud Tracks (40%)', score: doRoadmapScore, weight: '40%' },
        { label: 'Automated Pipeline Deployments (35%)', score: projectScore, weight: '35%' },
        { label: 'Systems & Shell Problem Solving (15%)', score: dsaProgress, weight: '15%' },
        { label: 'OS Isolation & Networks (10%)', score: coreCsProgress, weight: '10%' }
      ]
    };
  } else if (role.includes('cloud') || role.includes('aws') || role.includes('azure') || role.includes('gcp') || role.includes('infra')) {
    // 5. Cloud Platform Engineer
    const dsaProgress = getDsaProgress(30, 4);

    recommendedRoadmapIds = ['do-cicd-cloud', 'do-docker-k8s', 'sys-hld'];
    recommendedRoadmapTitles = [
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Docker & Kubernetes Orchestration',
      'High-Level Distributed Systems (HLD)'
    ];

    const cloudRoadmapScore = getRoadmapsProgress(recommendedRoadmapIds);
    finalScore = (cloudRoadmapScore * 0.40) + (projectScore * 0.35) + (dsaProgress * 0.15) + (coreCsProgress * 0.10);

    nextActionItems = [
      { action: 'Deploy resilient multi-AZ infrastructure on AWS (EC2/S3/VPC/ALB)', boost: '+20%', done: cloudRoadmapScore >= 50 },
      { action: 'Author infrastructure as code with Terraform modules', boost: '+15%', done: projects.length >= 2 },
      { action: 'Review TCP/IP handshake, DNS resolution & TLS handshake', boost: '+10%', done: coreCsProgress >= 50 }
    ];

    weightsExplanation = {
      roleCategory: 'Cloud Platform Engineer',
      breakdown: [
        { label: 'AWS & Cloud Infrastructure Tracks (40%)', score: cloudRoadmapScore, weight: '40%' },
        { label: 'Infrastructure as Code Projects (35%)', score: projectScore, weight: '35%' },
        { label: 'Networking & Problem Solving (15%)', score: dsaProgress, weight: '15%' },
        { label: 'Network Protocols & Security (10%)', score: coreCsProgress, weight: '10%' }
      ]
    };
  } else if (role.includes('ai') || role.includes('ml') || role.includes('machine learning') || role.includes('genai') || role.includes('pytorch')) {
    // 6. AI & Machine Learning Engineer
    const dsaProgress = getDsaProgress(40, 5);

    recommendedRoadmapIds = ['ai-ml-python', 'ai-genai-llm', 'be-python'];
    recommendedRoadmapTitles = [
      'Applied Machine Learning & PyTorch',
      'Generative AI, LLMs & RAG Systems',
      'Python & FastAPI High-Performance Backend'
    ];

    const aiRoadmapScore = getRoadmapsProgress(recommendedRoadmapIds);
    finalScore = (aiRoadmapScore * 0.40) + (projectScore * 0.30) + (dsaProgress * 0.20) + (coreCsProgress * 0.10);

    nextActionItems = [
      { action: 'Build and deploy a RAG Pipeline with Vector DB & LLM inference', boost: '+20%', done: projects.length >= 2 },
      { action: 'Master PyTorch Tensors, Linear Algebra & Backpropagation', boost: '+15%', done: aiRoadmapScore >= 50 },
      { action: 'Solve 20+ Matrix, Dynamic Programming & Graph problems', boost: '+10%', done: dsaProgress >= 50 }
    ];

    weightsExplanation = {
      roleCategory: 'AI & Machine Learning Engineer',
      breakdown: [
        { label: 'Python & ML Backend Tracks (40%)', score: aiRoadmapScore, weight: '40%' },
        { label: 'Deployed GenAI / RAG Projects (30%)', score: projectScore, weight: '30%' },
        { label: 'Algorithms & Computational Math (20%)', score: dsaProgress, weight: '20%' },
        { label: 'Vector DB & Data Fundamentals (10%)', score: coreCsProgress, weight: '10%' }
      ]
    };
  } else if (role.includes('sdet') || role.includes('testing') || role.includes('qa') || role.includes('automation')) {
    // 7. SDET / Test Automation Engineer
    const dsaProgress = getDsaProgress(35, 4);

    recommendedRoadmapIds = ['sdet-automation', 'fe-typescript', 'be-node'];
    recommendedRoadmapTitles = [
      'Automated Testing & SDET Architecture',
      'TypeScript & Modern JavaScript Internals',
      'Node.js & Express Architecture'
    ];

    const sdetRoadmapScore = getRoadmapsProgress(recommendedRoadmapIds);
    finalScore = (sdetRoadmapScore * 0.40) + (projectScore * 0.35) + (dsaProgress * 0.20) + (coreCsProgress * 0.05);

    nextActionItems = [
      { action: 'Build Playwright/Cypress automated E2E test suites with CI/CD', boost: '+20%', done: projects.length >= 2 },
      { action: 'Master REST API automated integration tests with Jest & Supertest', boost: '+15%', done: sdetRoadmapScore >= 50 },
      { action: 'Solve 20+ String, Array & Linked List problem patterns', boost: '+10%', done: dsaProgress >= 40 }
    ];

    weightsExplanation = {
      roleCategory: 'Software Development Engineer in Test (SDET)',
      breakdown: [
        { label: 'Test Automation & Core Tracks (40%)', score: sdetRoadmapScore, weight: '40%' },
        { label: 'Automated Test Suite Projects (35%)', score: projectScore, weight: '35%' },
        { label: 'String, Array & Core DSA (20%)', score: dsaProgress, weight: '20%' },
        { label: 'Network Protocols & HTTP (5%)', score: coreCsProgress, weight: '5%' }
      ]
    };
  } else {
    // 8. Default: Full Stack Engineer
    const dsaProgress = getDsaProgress(50, 6);

    recommendedRoadmapIds = ['fe-react', 'fe-nextjs', 'be-node'];
    recommendedRoadmapTitles = [
      'React.js & Modern UI Architecture',
      'Next.js 15 & Full-Stack Frontend',
      'Node.js & Express Architecture'
    ];

    const fsRoadmapScore = getRoadmapsProgress(recommendedRoadmapIds);
    finalScore = (fsRoadmapScore * 0.35) + (projectScore * 0.30) + (dsaProgress * 0.25) + (coreCsProgress * 0.10);

    nextActionItems = [
      { action: 'Complete Full-Stack React & Next.js production tracks', boost: '+15%', done: fsRoadmapScore >= 50 },
      { action: 'Build 2 deployed full-stack capstone projects with auth & DB', boost: '+15%', done: projects.length >= 2 },
      { action: 'Solve 30+ DSA questions across Trees, Graphs & DP', boost: '+15%', done: dsaProgress >= 50 }
    ];

    weightsExplanation = {
      roleCategory: 'Full Stack Engineer',
      breakdown: [
        { label: 'Compulsory Full-Stack Roadmaps (35%)', score: fsRoadmapScore, weight: '35%' },
        { label: 'Deployed Capstone Projects (30%)', score: projectScore, weight: '30%' },
        { label: 'DSA Problem Solving & Patterns (25%)', score: dsaProgress, weight: '25%' },
        { label: 'Core CS (DBMS & Networks) (10%)', score: coreCsProgress, weight: '10%' }
      ]
    };
  }

  // Predictive Placement Probability Tier
  const calculatedScore = Math.min(100, Math.max(0, Math.round(finalScore)));
  let placementTier = 'Foundation Stage';
  let tierColor = 'text-amber-400';
  if (calculatedScore >= 85) {
    placementTier = 'Tier-1 Industry Ready (High Offer Probability)';
    tierColor = 'text-emerald-400';
  } else if (calculatedScore >= 65) {
    placementTier = 'Advanced Competency (Competitive Candidate)';
    tierColor = 'text-cyan-400';
  } else if (calculatedScore >= 40) {
    placementTier = 'Core Foundations Building (Intermediate Milestone)';
    tierColor = 'text-amber-400';
  }

  return {
    score: calculatedScore,
    placementTier,
    tierColor,
    recommendedRoadmapIds,
    recommendedRoadmapTitles,
    nextActionItems,
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

    const [dsaProblems, notes, projects, dailyTasks, studyGoals] = await Promise.all([
      DsaProblem.find({ userId }),
      Note.find({ userId }),
      Project.find({ userId }),
      DailyTask.find({ userId }),
      StudyGoal.find({ userId })
    ]);

    // Role-based calculation
    const readinessInfo = calculateRoleBasedReadiness(
      user.targetRole,
      dsaProblems,
      user.completedTopics || [],
      projects,
      notes,
      user.enrolledRoadmaps || []
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

    const streakData = await calculateStreakStatus(user);

    return res.json({
      success: true,
      data: {
        readinessScore: readinessInfo.score,
        placementTier: readinessInfo.placementTier,
        tierColor: readinessInfo.tierColor,
        recommendedRoadmapIds: readinessInfo.recommendedRoadmapIds,
        recommendedRoadmapTitles: readinessInfo.recommendedRoadmapTitles,
        nextActionItems: readinessInfo.nextActionItems,
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
        pendingTasksCount: dailyTasks.filter(t => !t.taskStatus).length,
        totalGoalsCount: studyGoals.length,
        user: {
          name: user.name,
          streak: streakData.currentStreak,
          longestStreak: user.longestStreak || user.streak || 0,
          isActiveToday: streakData.isActiveToday,
          streakAtRisk: streakData.streakAtRisk,
          lastActiveDate: user.lastActiveDate || null,
          targetRole: user.targetRole,
          dreamCompany: user.dreamCompany,
          gradYear: user.gradYear,
          readinessScore: readinessInfo.score,
          enrolledRoadmaps: user.enrolledRoadmaps || []
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
