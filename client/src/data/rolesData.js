export const allRoles = [
  {
    id: 'sde',
    title: 'Software Development Engineer (SDE / Core DSA)',
    shortLabel: 'SDE / Algorithms',
    category: 'Core Engineering',
    color: 'from-indigo-600 to-blue-600',
    borderColor: 'border-indigo-500/30',
    bgBadge: 'bg-indigo-950 text-indigo-300 border-indigo-800/40',
    desc: 'Heavy algorithmic problem solving, time/space complexity optimization, data structures mastery, and low-level system design (LLD).',
    focusArea: 'DSA Mastery (40%) • LLD Design (30%) • Capstone Projects (20%) • Core CS (10%)',
    formulaDesc: 'Score = (0.40 × DSA) + (0.30 × Roadmaps) + (0.20 × Projects) + (0.10 × Core CS)',
    weights: { dsa: 0.40, roadmaps: 0.30, projects: 0.20, notes: 0.10 },
    weightsList: [
      { label: 'DSA Problem Solving & Patterns', weight: 40, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Algorithms & LLD Roadmaps', weight: 30, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'System Implementations & Projects', weight: 20, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: 'Core CS Notes & Fundamentals', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Trees', 'Graphs', 'Dynamic Programming', 'Sliding Window'],
    recommendedRoadmapIds: ['dsa-foundation', 'dsa-advanced', 'sys-lld', 'cs-os-dbms'],
    recommendedRoadmapTitles: [
      'Data Structures Foundation',
      'Advanced Algorithms & DP Masterclass',
      'Low-Level Design & Clean Architecture (LLD)',
      'Operating Systems & DBMS Fundamentals'
    ],
    primarySkills: ['Data Structures', 'C++ / Java / Python', 'Algorithms', 'LLD Design Patterns', 'Complexity Analysis'],
    targetBenchmarks: { minSolvedDsa: 25, minProjects: 2, minRoadmapPills: 4 }
  },
  {
    id: 'fullstack',
    title: 'Full Stack Engineer (MERN / Next.js / APIs)',
    shortLabel: 'Full Stack',
    category: 'Application Engineering',
    color: 'from-cyan-600 to-indigo-600',
    borderColor: 'border-cyan-500/30',
    bgBadge: 'bg-cyan-950 text-cyan-300 border-cyan-800/40',
    desc: 'Complete end-to-end web engineering covering modern React/Next.js frontends, Node.js/Express APIs, PostgreSQL/MongoDB, and cloud deployments.',
    focusArea: 'Full-Stack Tracks (35%) • DSA Mastery (35%) • Capstone Projects (20%) • Core CS (10%)',
    formulaDesc: 'Score = (0.35 × Roadmaps) + (0.35 × DSA) + (0.20 × Projects) + (0.10 × Core CS)',
    weights: { dsa: 0.35, roadmaps: 0.35, projects: 0.20, notes: 0.10 },
    weightsList: [
      { label: 'Full-Stack Roadmaps (MERN/Next.js)', weight: 35, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'DSA Mastery & Problem Patterns', weight: 35, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Deployed Portfolio Projects', weight: 20, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: 'Core CS Notes & Architecture', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Trees', 'Linked List'],
    recommendedRoadmapIds: ['fs-mern', 'fs-postgres', 'dsa-foundation', 'sys-lld'],
    recommendedRoadmapTitles: [
      'MERN Stack Production Track',
      'Next.js + PostgreSQL + Prisma Stack',
      'Data Structures Foundation',
      'Low-Level Design & Clean Architecture'
    ],
    primarySkills: ['React / Next.js', 'Node.js & Express', 'PostgreSQL / MongoDB', 'REST & GraphQL', 'Tailwind CSS'],
    targetBenchmarks: { minSolvedDsa: 20, minProjects: 2, minRoadmapPills: 4 }
  },
  {
    id: 'frontend',
    title: 'Frontend Engineer (React / Next.js / UI Architecture)',
    shortLabel: 'Frontend',
    category: 'Client Engineering',
    color: 'from-teal-600 to-cyan-600',
    borderColor: 'border-teal-500/30',
    bgBadge: 'bg-teal-950 text-teal-300 border-teal-800/40',
    desc: 'Deep React 19 architecture, Server Components (RSC), client state management, Core Web Vitals performance, and modern design systems.',
    focusArea: 'Frontend Roadmaps (40%) • UI Projects (35%) • DSA Problem Solving (25%)',
    formulaDesc: 'Score = (0.40 × Frontend Tracks) + (0.35 × UI Projects) + (0.25 × DSA)',
    weights: { dsa: 0.25, roadmaps: 0.40, projects: 0.35, notes: 0.0 },
    weightsList: [
      { label: 'Frontend & Next.js Roadmaps', weight: 40, color: 'text-teal-400', barColor: 'bg-teal-500' },
      { label: 'UI Capstone Applications', weight: 35, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'DSA & Algorithmic Patterns', weight: 25, color: 'text-indigo-400', barColor: 'bg-indigo-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Linked List'],
    recommendedRoadmapIds: ['fe-react', 'fe-nextjs', 'fe-typescript', 'dsa-foundation'],
    recommendedRoadmapTitles: [
      'React.js & Client Architecture',
      'Next.js & Full-Stack Frontend',
      'TypeScript & Modern JavaScript',
      'Data Structures Foundation'
    ],
    primarySkills: ['React 19 / RSC', 'TypeScript', 'Next.js App Router', 'Tailwind CSS', 'Browser Performance'],
    targetBenchmarks: { minSolvedDsa: 15, minProjects: 2, minRoadmapPills: 3 }
  },
  {
    id: 'backend',
    title: 'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
    shortLabel: 'Backend',
    category: 'Server Engineering',
    color: 'from-emerald-600 to-teal-600',
    borderColor: 'border-emerald-500/30',
    bgBadge: 'bg-emerald-950 text-emerald-300 border-emerald-800/40',
    desc: 'Scalable RESTful & gRPC APIs, database indexing, transactions, Redis distributed caching, message queues (Kafka), and clean architecture.',
    focusArea: 'Backend & LLD Roadmaps (40%) • DSA & Graph Algos (35%) • Backend Projects (25%)',
    formulaDesc: 'Score = (0.40 × Backend Tracks) + (0.35 × DSA) + (0.25 × Backend Projects)',
    weights: { dsa: 0.35, roadmaps: 0.40, projects: 0.25, notes: 0.0 },
    weightsList: [
      { label: 'Backend & System Architecture', weight: 40, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: 'DSA & Non-Linear Algorithms', weight: 35, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Scalable API Projects', weight: 25, color: 'text-cyan-400', barColor: 'bg-cyan-500' }
    ],
    recommendedDsaTopics: ['Trees', 'Graphs', 'Arrays & Hashing', 'Dynamic Programming'],
    recommendedRoadmapIds: ['be-node', 'be-spring', 'sys-lld', 'cs-os-dbms'],
    recommendedRoadmapTitles: [
      'Node.js & Express Architecture',
      'Java Spring Boot Enterprise SDE',
      'Low-Level Design & Clean Architecture',
      'Operating Systems & DBMS Fundamentals'
    ],
    primarySkills: ['Node.js / Spring Boot', 'PostgreSQL / MongoDB', 'Redis Caching', 'Kafka Queues', 'Docker'],
    targetBenchmarks: { minSolvedDsa: 20, minProjects: 2, minRoadmapPills: 4 }
  },
  {
    id: 'devops',
    title: 'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
    shortLabel: 'DevOps',
    category: 'Platform & Infrastructure',
    color: 'from-amber-600 to-orange-600',
    borderColor: 'border-amber-500/30',
    bgBadge: 'bg-amber-950 text-amber-300 border-amber-800/40',
    desc: 'Container packaging, Kubernetes cluster orchestration, GitHub Actions automated CI/CD pipelines, and infrastructure as code.',
    focusArea: 'DevOps & K8s Roadmaps (45%) • Cloud Deployments (30%) • Scripting & DSA (25%)',
    formulaDesc: 'Score = (0.45 × DevOps Tracks) + (0.30 × Cloud Projects) + (0.25 × Scripting & DSA)',
    weights: { dsa: 0.25, roadmaps: 0.45, projects: 0.30, notes: 0.0 },
    weightsList: [
      { label: 'Docker, K8s & CI/CD Tracks', weight: 45, color: 'text-amber-400', barColor: 'bg-amber-500' },
      { label: 'Automated Pipeline Deployments', weight: 30, color: 'text-orange-400', barColor: 'bg-orange-500' },
      { label: 'Systems & Problem Solving', weight: 25, color: 'text-indigo-400', barColor: 'bg-indigo-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Linked List'],
    recommendedRoadmapIds: ['do-docker-k8s', 'do-cicd-cloud', 'cs-networks'],
    recommendedRoadmapTitles: [
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Computer Networks & Web Protocols'
    ],
    primarySkills: ['Docker & Kubernetes', 'GitHub Actions CI/CD', 'Linux Shell Scripting', 'Terraform', 'Monitoring'],
    targetBenchmarks: { minSolvedDsa: 12, minProjects: 2, minRoadmapPills: 3 }
  },
  {
    id: 'cloud',
    title: 'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
    shortLabel: 'Cloud Infra',
    category: 'Cloud Engineering',
    color: 'from-blue-600 to-indigo-600',
    borderColor: 'border-blue-500/30',
    bgBadge: 'bg-blue-950 text-blue-300 border-blue-800/40',
    desc: 'Multi-region cloud architecture, VPC networking, serverless compute, IAM security, cloud storage, and database management.',
    focusArea: 'Cloud Roadmaps (45%) • Infrastructure Projects (30%) • Networking & DSA (25%)',
    formulaDesc: 'Score = (0.45 × Cloud Tracks) + (0.30 × Cloud Projects) + (0.25 × Networking & DSA)',
    weights: { dsa: 0.25, roadmaps: 0.45, projects: 0.30, notes: 0.0 },
    weightsList: [
      { label: 'AWS & Cloud Infrastructure Tracks', weight: 45, color: 'text-blue-400', barColor: 'bg-blue-500' },
      { label: 'Infrastructure as Code Projects', weight: 30, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'Networking & Problem Solving', weight: 25, color: 'text-indigo-400', barColor: 'bg-indigo-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Graphs'],
    recommendedRoadmapIds: ['do-cicd-cloud', 'do-docker-k8s', 'cs-networks', 'sys-hld'],
    recommendedRoadmapTitles: [
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Docker & Kubernetes Orchestration',
      'Computer Networks & Web Protocols',
      'High-Level Distributed Systems (HLD)'
    ],
    primarySkills: ['AWS EC2/S3/Lambda', 'Cloud Networking (VPC/DNS)', 'IAM Security', 'Docker', 'Terraform'],
    targetBenchmarks: { minSolvedDsa: 15, minProjects: 2, minRoadmapPills: 4 }
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)',
    shortLabel: 'AI / ML',
    category: 'Artificial Intelligence',
    color: 'from-purple-600 to-pink-600',
    borderColor: 'border-purple-500/30',
    bgBadge: 'bg-purple-950 text-purple-300 border-purple-800/40',
    desc: 'Deep learning foundations, neural networks, PyTorch, LLM fine-tuning, RAG retrieval architectures, and model inference pipelines.',
    focusArea: 'AI/ML Roadmaps (40%) • Math & Algorithms (30%) • AI Capstone Projects (30%)',
    formulaDesc: 'Score = (0.40 × AI/ML Tracks) + (0.30 × Algorithms & Math) + (0.30 × ML Projects)',
    weights: { dsa: 0.30, roadmaps: 0.40, projects: 0.30, notes: 0.0 },
    weightsList: [
      { label: 'Python & ML Backend Tracks', weight: 40, color: 'text-purple-400', barColor: 'bg-purple-500' },
      { label: 'Algorithms & Computational Math', weight: 30, color: 'text-pink-400', barColor: 'bg-pink-500' },
      { label: 'Deployed GenAI / RAG Projects', weight: 30, color: 'text-indigo-400', barColor: 'bg-indigo-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Dynamic Programming', 'Graphs'],
    recommendedRoadmapIds: ['be-python', 'dsa-foundation', 'dsa-advanced', 'cs-os-dbms'],
    recommendedRoadmapTitles: [
      'Python & FastAPI High-Performance Backend',
      'Data Structures Foundation',
      'Advanced Algorithms & DP Masterclass',
      'Operating Systems & DBMS Fundamentals'
    ],
    primarySkills: ['Python & PyTorch', 'Transformers & HuggingFace', 'RAG Pipelines & LangChain', 'Vector DBs', 'FastAPI'],
    targetBenchmarks: { minSolvedDsa: 18, minProjects: 2, minRoadmapPills: 4 }
  },
  {
    id: 'sdet',
    title: 'Software Development Engineer in Test (SDET / Automation)',
    shortLabel: 'SDET / QA',
    category: 'Quality Engineering',
    color: 'from-rose-600 to-amber-600',
    borderColor: 'border-rose-500/30',
    bgBadge: 'bg-rose-950 text-rose-300 border-rose-800/40',
    desc: 'End-to-end test automation frameworks, API testing, performance load benchmarking, and CI test pipeline integration.',
    focusArea: 'Testing & Core Roadmaps (40%) • Automation Projects (35%) • DSA Problem Solving (25%)',
    formulaDesc: 'Score = (0.40 × Testing Tracks) + (0.35 × Test Automation Projects) + (0.25 × DSA)',
    weights: { dsa: 0.25, roadmaps: 0.40, projects: 0.35, notes: 0.0 },
    weightsList: [
      { label: 'TypeScript & Test Automation Tracks', weight: 40, color: 'text-rose-400', barColor: 'bg-rose-500' },
      { label: 'Automated E2E Test Suites', weight: 35, color: 'text-amber-400', barColor: 'bg-amber-500' },
      { label: 'String, Array & Core DSA', weight: 25, color: 'text-indigo-400', barColor: 'bg-indigo-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Strings', 'Linked List'],
    recommendedRoadmapIds: ['fe-typescript', 'be-node', 'dsa-foundation', 'do-cicd-cloud'],
    recommendedRoadmapTitles: [
      'TypeScript & Modern JavaScript',
      'Node.js & Express Architecture',
      'Data Structures Foundation',
      'CI/CD Pipelines & AWS Cloud Deployment'
    ],
    primarySkills: ['Playwright / Cypress', 'Jest / Mocha', 'API Automation', 'CI/CD Pipelines', 'Performance Testing'],
    targetBenchmarks: { minSolvedDsa: 15, minProjects: 2, minRoadmapPills: 4 }
  }
];

export const getRoleConfig = (roleTitle) => {
  if (!roleTitle) return allRoles[1]; // default to Full Stack
  
  // 1. Direct exact ID or exact title match
  const exactMatch = allRoles.find(
    r => r.id === roleTitle || r.title === roleTitle || r.title.toLowerCase() === roleTitle.toLowerCase() || r.shortLabel.toLowerCase() === roleTitle.toLowerCase()
  );
  if (exactMatch) return exactMatch;

  const query = roleTitle.toLowerCase();

  // 2. Specific multi-word keywords first
  if (query.includes('full stack') || query.includes('fullstack') || query.includes('mern')) {
    return allRoles.find(r => r.id === 'fullstack');
  }
  if (query.includes('sdet') || query.includes('test') || query.includes('qa') || query.includes('quality')) {
    return allRoles.find(r => r.id === 'sdet');
  }
  if (query.includes('devops') || query.includes('docker') || query.includes('k8s') || query.includes('kubernetes') || query.includes('sre')) {
    return allRoles.find(r => r.id === 'devops');
  }
  if (query.includes('ai') || query.includes('ml') || query.includes('machine learning') || query.includes('data science') || query.includes('genai') || query.includes('pytorch')) {
    return allRoles.find(r => r.id === 'ai-ml');
  }
  if (query.includes('cloud') || query.includes('aws') || query.includes('azure') || query.includes('gcp') || query.includes('infra')) {
    return allRoles.find(r => r.id === 'cloud');
  }
  if (query.includes('frontend') || query.includes('react') || query.includes('ui architecture')) {
    return allRoles.find(r => r.id === 'frontend');
  }
  if (query.includes('backend') || query.includes('node') || query.includes('java') || query.includes('spring') || query.includes('express')) {
    return allRoles.find(r => r.id === 'backend');
  }
  if (query.includes('sde') || query.includes('core dsa') || query.includes('algorithm') || query.includes('competitive')) {
    return allRoles.find(r => r.id === 'sde');
  }

  return allRoles.find(r => r.id === 'fullstack') || allRoles[1];
};

export const getReadinessTier = (score) => {
  if (score >= 85) {
    return {
      tier: 'Tier-1 Industry Ready',
      label: 'High Offer Probability',
      badgeClass: 'bg-emerald-950 text-emerald-400 border-emerald-800/50',
      dotClass: 'bg-emerald-400',
      description: 'Your profile and milestone coverage exceed benchmark expectations for top-tier tech engineering screenings.'
    };
  }
  if (score >= 65) {
    return {
      tier: 'Advanced Competency',
      label: 'Competitive Candidate',
      badgeClass: 'bg-cyan-950 text-cyan-400 border-cyan-800/50',
      dotClass: 'bg-cyan-400',
      description: 'Solid foundations across algorithmic practice and roadmap completion. Ready for product-firm technical rounds.'
    };
  }
  if (score >= 40) {
    return {
      tier: 'Core Foundations Building',
      label: 'Intermediate Milestone',
      badgeClass: 'bg-amber-950 text-amber-400 border-amber-800/50',
      dotClass: 'bg-amber-400',
      description: 'Actively solving intermediate DSA patterns and completing initial roadmap milestones.'
    };
  }
  return {
    tier: 'Foundation Stage',
    label: 'Early Preparation',
    badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
    dotClass: 'bg-slate-400',
    description: 'Initial curriculum phase. Focus on solving core array/string problems and starting your primary roadmap.'
  };
};
