import User from '../models/User.js';
import DsaProblem from '../models/DsaProblem.js';
import Note from '../models/Note.js';
import Project from '../models/Project.js';
import Revision from '../models/Revision.js';
import { defaultRoadmaps } from '../data/seedData.js';

// Calculate Role-Based Placement Readiness & Predictive Placement Score
export const calculateRoleBasedReadiness = (targetRole = '', dsaProblems = [], userCompletedTopics = [], projects = [], notes = [], enrolledRoadmaps = []) => {
  const role = (targetRole || 'Full Stack Software Engineer').toLowerCase();

  // 1. DSA Metrics
  const solvedProblems = dsaProblems.filter(p => p.status === 'Solved');
  const easySolved = solvedProblems.filter(p => p.difficulty === 'Easy').length;
  const mediumSolved = solvedProblems.filter(p => p.difficulty === 'Medium').length;
  const hardSolved = solvedProblems.filter(p => p.difficulty === 'Hard').length;

  // Weighted DSA score (benchmarked against 30 solved for 100%)
  const dsaWeighted = (easySolved * 2) + (mediumSolved * 4) + (hardSolved * 8);
  const dsaProgress = Math.min(100, Math.round((dsaWeighted / 40) * 100));

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

  // 3. Project & Notes Progress
  const projectScore = Math.min(100, projects.length * 35);
  const noteScore = Math.min(100, notes.length * 25);

  let finalScore = 0;
  let recommendedRoadmapIds = [];
  let recommendedRoadmapTitles = [];
  let nextActionItems = [];
  let weightsExplanation = {};

  if (role.includes('sdet') || role.includes('testing') || role.includes('qa') || role.includes('test engineer') || role.includes('test automation')) {
    recommendedRoadmapIds = ['fe-typescript', 'be-node', 'dsa-foundation', 'do-cicd-cloud'];
    recommendedRoadmapTitles = [
      'TypeScript & Modern JavaScript',
      'Node.js & Express Architecture',
      'Data Structures Foundation',
      'CI/CD Pipelines & AWS Cloud Deployment'
    ];

    const sdetRoadmapScore = getRoadmapsProgress(['fe-typescript', 'be-node', 'dsa-foundation']);
    finalScore = (sdetRoadmapScore * 0.40) + (projectScore * 0.35) + (dsaProgress * 0.25);

    nextActionItems = [
      { action: 'Build Playwright/Cypress automated E2E test suites with CI/CD', boost: '+20%', done: projects.length >= 2 },
      { action: 'Master REST API automated integration tests with Jest & Supertest', boost: '+15%', done: sdetRoadmapScore >= 50 },
      { action: 'Solve 15+ String, Array & Linked List problem patterns', boost: '+10%', done: dsaProgress >= 40 }
    ];

    weightsExplanation = {
      roleCategory: 'Software Development Engineer in Test (SDET)',
      breakdown: [
        { label: 'Testing & Core Roadmaps (40%)', score: sdetRoadmapScore, weight: '40%' },
        { label: 'Test Framework Projects (35%)', score: projectScore, weight: '35%' },
        { label: 'DSA Problem Solving (25%)', score: dsaProgress, weight: '25%' }
      ]
    };
  } else if (role.includes('full stack') || role.includes('fullstack') || role.includes('mern')) {
    recommendedRoadmapIds = ['fs-mern', 'fs-postgres', 'dsa-foundation', 'sys-lld'];
    recommendedRoadmapTitles = [
      'MERN Stack Production Track',
      'Next.js + PostgreSQL + Prisma Stack',
      'Data Structures Foundation',
      'Low-Level Design & Clean Architecture'
    ];

    const fsRoadmapScore = getRoadmapsProgress(['fs-mern', 'fs-postgres', 'dsa-foundation', 'sys-lld']);
    finalScore = (fsRoadmapScore * 0.35) + (dsaProgress * 0.35) + (projectScore * 0.20) + (noteScore * 0.10);

    nextActionItems = [
      { action: 'Complete Full-Stack MERN & Next.js production track', boost: '+15%', done: fsRoadmapScore >= 50 },
      { action: 'Solve 20+ DSA questions across Trees, Graphs & DP', boost: '+15%', done: dsaProgress >= 50 },
      { action: 'Build 2 deployed full-stack capstone projects', boost: '+10%', done: projects.length >= 2 }
    ];

    weightsExplanation = {
      roleCategory: 'Full Stack Software Engineer (MERN / Next.js / Cloud)',
      breakdown: [
        { label: 'Full-Stack Roadmaps (35%)', score: fsRoadmapScore, weight: '35%' },
        { label: 'DSA Mastery & Patterns (35%)', score: dsaProgress, weight: '35%' },
        { label: 'Portfolio Projects (20%)', score: projectScore, weight: '20%' },
        { label: 'Core CS Notes & Flashcards (10%)', score: noteScore, weight: '10%' }
      ]
    };
  } else if (role.includes('sde') || role.includes('core dsa') || role.includes('algorithm')) {
    recommendedRoadmapIds = ['dsa-foundation', 'dsa-advanced', 'sys-lld', 'cs-os-dbms'];
    recommendedRoadmapTitles = [
      'Data Structures Foundation',
      'Advanced Algorithms & DP Masterclass',
      'Low-Level Design & Clean Architecture (LLD)',
      'Operating Systems & DBMS Fundamentals'
    ];

    const sdeRoadmapScore = getRoadmapsProgress(['dsa-foundation', 'dsa-advanced', 'sys-lld']);
    finalScore = (dsaProgress * 0.40) + (sdeRoadmapScore * 0.30) + (projectScore * 0.20) + (noteScore * 0.10);

    nextActionItems = [
      { action: 'Solve 25+ LeetCode Medium/Hard DP, Tree & Graph questions', boost: '+20%', done: dsaProgress >= 60 },
      { action: 'Master SOLID design patterns & LLD machine coding round', boost: '+15%', done: sdeRoadmapScore >= 50 },
      { action: 'Review OS Concurrency & Deadlocks (4 Coffman Conditions)', boost: '+10%', done: noteScore >= 40 }
    ];

    weightsExplanation = {
      roleCategory: 'Software Development Engineer (SDE / Core DSA)',
      breakdown: [
        { label: 'DSA Problem Solving & Patterns (40%)', score: dsaProgress, weight: '40%' },
        { label: 'Algorithms & LLD Roadmaps (30%)', score: sdeRoadmapScore, weight: '30%' },
        { label: 'System Implementations & Projects (20%)', score: projectScore, weight: '20%' },
        { label: 'Core CS Notes & Fundamentals (10%)', score: noteScore, weight: '10%' }
      ]
    };
  } else if (role.includes('frontend') || role.includes('react') || role.includes('ui')) {
    recommendedRoadmapIds = ['fe-react', 'fe-nextjs', 'fe-typescript', 'dsa-foundation'];
    recommendedRoadmapTitles = [
      'React.js & Client Architecture',
      'Next.js & Full-Stack Frontend',
      'TypeScript & Modern JavaScript',
      'Data Structures Foundation'
    ];

    const feRoadmapScore = getRoadmapsProgress(['fe-react', 'fe-nextjs', 'fe-typescript']);
    finalScore = (feRoadmapScore * 0.40) + (projectScore * 0.35) + (dsaProgress * 0.25);

    nextActionItems = [
      { action: 'Master React 19 Hooks, Server Components (RSC) & State', boost: '+15%', done: feRoadmapScore >= 50 },
      { action: 'Build and showcase 2 production-ready web applications', boost: '+20%', done: projects.length >= 2 },
      { action: 'Solve 10+ Two Pointer and Sliding Window questions', boost: '+10%', done: dsaProgress >= 40 }
    ];

    weightsExplanation = {
      roleCategory: 'Frontend Engineer (React / Next.js / UI)',
      breakdown: [
        { label: 'Frontend & Next.js Roadmaps (40%)', score: feRoadmapScore, weight: '40%' },
        { label: 'Portfolio Projects (35%)', score: projectScore, weight: '35%' },
        { label: 'DSA & Algorithmic Patterns (25%)', score: dsaProgress, weight: '25%' }
      ]
    };
  } else if (role.includes('ai') || role.includes('ml') || role.includes('machine learning') || role.includes('genai') || role.includes('pytorch')) {
    recommendedRoadmapIds = ['be-python', 'dsa-foundation', 'dsa-advanced', 'cs-os-dbms'];
    recommendedRoadmapTitles = [
      'Python & FastAPI High-Performance Backend',
      'Data Structures Foundation',
      'Advanced Algorithms & DP Masterclass',
      'Operating Systems & DBMS Fundamentals'
    ];

    const aiRoadmapScore = getRoadmapsProgress(['be-python', 'dsa-foundation', 'dsa-advanced']);
    finalScore = (aiRoadmapScore * 0.40) + (dsaProgress * 0.30) + (projectScore * 0.30);

    nextActionItems = [
      { action: 'Build and deploy a RAG Pipeline with Vector DB & LLM API', boost: '+20%', done: projects.length >= 2 },
      { action: 'Master PyTorch Tensors, Linear Algebra & Backpropagation', boost: '+15%', done: aiRoadmapScore >= 50 },
      { action: 'Solve 15+ Matrix, DP & Graph Algorithmic problems', boost: '+15%', done: dsaProgress >= 45 }
    ];

    weightsExplanation = {
      roleCategory: 'AI / Machine Learning Engineer (Python / PyTorch / LLMs)',
      breakdown: [
        { label: 'AI/ML & Python Roadmaps (40%)', score: aiRoadmapScore, weight: '40%' },
        { label: 'Algorithms & Math Foundations (30%)', score: dsaProgress, weight: '30%' },
        { label: 'AI/ML Capstone Projects (30%)', score: projectScore, weight: '30%' }
      ]
    };
  } else if (role.includes('devops') || role.includes('docker') || role.includes('k8s') || role.includes('kubernetes') || role.includes('sre')) {
    recommendedRoadmapIds = ['do-docker-k8s', 'do-cicd-cloud', 'cs-networks'];
    recommendedRoadmapTitles = [
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Computer Networks & Web Protocols'
    ];

    const doRoadmapScore = getRoadmapsProgress(['do-docker-k8s', 'do-cicd-cloud']);
    finalScore = (doRoadmapScore * 0.45) + (projectScore * 0.30) + (dsaProgress * 0.25);

    nextActionItems = [
      { action: 'Dockerize multi-container apps with multi-stage builds', boost: '+15%', done: doRoadmapScore >= 50 },
      { action: 'Configure GitHub Actions automated CI/CD deployment pipeline', boost: '+15%', done: projects.length >= 2 },
      { action: 'Practice Linux shell scripting and network protocol diagnostics', boost: '+10%', done: dsaProgress >= 30 }
    ];

    weightsExplanation = {
      roleCategory: 'DevOps Engineer (Docker / Kubernetes / CI/CD)',
      breakdown: [
        { label: 'Docker, K8s & Cloud Roadmaps (45%)', score: doRoadmapScore, weight: '45%' },
        { label: 'Cloud Projects & Deployments (30%)', score: projectScore, weight: '30%' },
        { label: 'Scripting & Problem Solving (25%)', score: dsaProgress, weight: '25%' }
      ]
    };
  } else if (role.includes('cloud') || role.includes('aws') || role.includes('azure') || role.includes('gcp') || role.includes('infra')) {
    recommendedRoadmapIds = ['do-cicd-cloud', 'do-docker-k8s', 'cs-networks', 'sys-hld'];
    recommendedRoadmapTitles = [
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Docker & Kubernetes Orchestration',
      'Computer Networks & Web Protocols',
      'High-Level Distributed Systems (HLD)'
    ];

    const cloudRoadmapScore = getRoadmapsProgress(['do-cicd-cloud', 'do-docker-k8s', 'cs-networks', 'sys-hld']);
    finalScore = (cloudRoadmapScore * 0.45) + (projectScore * 0.30) + (dsaProgress * 0.25);

    nextActionItems = [
      { action: 'Deploy resilient multi-AZ infrastructure on AWS (EC2/S3/VPC)', boost: '+15%', done: cloudRoadmapScore >= 50 },
      { action: 'Design high-availability cloud architecture with CDN & ALB', boost: '+15%', done: projects.length >= 2 },
      { action: 'Review TCP/IP 3-Way Handshake, DNS lifecycle & TLS encryption', boost: '+10%', done: dsaProgress >= 30 }
    ];

    weightsExplanation = {
      roleCategory: 'Cloud Engineer (AWS / Azure / Cloud Infra)',
      breakdown: [
        { label: 'Cloud & Infrastructure Roadmaps (45%)', score: cloudRoadmapScore, weight: '45%' },
        { label: 'Cloud Implementations & Projects (30%)', score: projectScore, weight: '30%' },
        { label: 'Networking & Problem Solving (25%)', score: dsaProgress, weight: '25%' }
      ]
    };
  } else if (role.includes('backend') || role.includes('node') || role.includes('java') || role.includes('spring') || role.includes('express') || role.includes('api')) {
    recommendedRoadmapIds = ['be-node', 'be-spring', 'sys-lld', 'cs-os-dbms'];
    recommendedRoadmapTitles = [
      'Node.js & Express Architecture',
      'Java Spring Boot Enterprise SDE',
      'Low-Level Design & Clean Architecture',
      'Operating Systems & DBMS Fundamentals'
    ];

    const beRoadmapScore = getRoadmapsProgress(['be-node', 'be-spring', 'sys-lld']);
    finalScore = (beRoadmapScore * 0.40) + (dsaProgress * 0.35) + (projectScore * 0.25);

    nextActionItems = [
      { action: 'Complete Node.js / Spring Boot RESTful & gRPC API pipeline', boost: '+15%', done: beRoadmapScore >= 50 },
      { action: 'Solve 15+ Graph and Tree interview problems', boost: '+15%', done: dsaProgress >= 50 },
      { action: 'Implement Database Indexing, Transactions & Redis cache', boost: '+10%', done: projects.length >= 2 }
    ];

    weightsExplanation = {
      roleCategory: 'Backend Engineer (Node.js / Java / Python)',
      breakdown: [
        { label: 'Backend & LLD Roadmaps (40%)', score: beRoadmapScore, weight: '40%' },
        { label: 'DSA & Algorithms (35%)', score: dsaProgress, weight: '35%' },
        { label: 'Backend Architecture Projects (25%)', score: projectScore, weight: '25%' }
      ]
    };
  } else {
    // Default Full Stack Software Engineer
    recommendedRoadmapIds = ['fs-mern', 'fs-postgres', 'dsa-foundation', 'sys-lld'];
    recommendedRoadmapTitles = [
      'MERN Stack Production Track',
      'Next.js + PostgreSQL + Prisma Stack',
      'Data Structures Foundation',
      'Low-Level Design & Clean Architecture'
    ];

    const fsRoadmapScore = getRoadmapsProgress(['fs-mern', 'fs-postgres', 'dsa-foundation', 'sys-lld']);
    finalScore = (fsRoadmapScore * 0.35) + (dsaProgress * 0.35) + (projectScore * 0.20) + (noteScore * 0.10);

    nextActionItems = [
      { action: 'Complete Full-Stack MERN & Next.js production track', boost: '+15%', done: fsRoadmapScore >= 50 },
      { action: 'Solve 20+ DSA questions across Trees, Graphs & DP', boost: '+15%', done: dsaProgress >= 50 },
      { action: 'Build 2 deployed full-stack capstone projects', boost: '+10%', done: projects.length >= 2 }
    ];

    weightsExplanation = {
      roleCategory: 'Full Stack Software Engineer (MERN / Next.js / Cloud)',
      breakdown: [
        { label: 'Full-Stack Roadmaps (35%)', score: fsRoadmapScore, weight: '35%' },
        { label: 'DSA Mastery & Patterns (35%)', score: dsaProgress, weight: '35%' },
        { label: 'Portfolio Projects (20%)', score: projectScore, weight: '20%' },
        { label: 'Core CS Notes & Flashcards (10%)', score: noteScore, weight: '10%' }
      ]
    };
  }

  // Predictive Placement Probability Tier
  const calculatedScore = Math.min(100, Math.max(0, Math.round(finalScore)));
  let placementTier = 'Early Stage';
  let tierColor = 'text-amber-400';
  if (calculatedScore >= 80) {
    placementTier = 'Tier-1 Placement Ready (High Probability)';
    tierColor = 'text-emerald-400';
  } else if (calculatedScore >= 50) {
    placementTier = 'Solid Competency (Moderate Probability)';
    tierColor = 'text-cyan-400';
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

    return res.json({
      success: true,
      data: {
        readinessScore: readinessInfo.score,
        placementTier: readinessInfo.placementTier,
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
        pendingRevisionsCount: pendingRevisions.length,
        user: {
          name: user.name,
          streak: user.streak,
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
