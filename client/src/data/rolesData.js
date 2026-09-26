export const universalCoreCsIds = ['cs-os', 'cs-dbms', 'cs-networks', 'cs-oop-lld'];

export const allRoles = [
  {
    id: 'sde',
    title: 'Software Development Engineer (SDE / Core DSA)',
    shortLabel: 'SDE / Algorithms',
    category: 'Core Engineering',
    color: 'from-indigo-600 to-blue-600',
    borderColor: 'border-indigo-500/30',
    bgBadge: 'bg-indigo-950 text-indigo-300 border-indigo-800/40',
    desc: 'Heavy algorithmic problem solving, time/space complexity optimization, data structures mastery, and high-level system design (HLD).',
    focusArea: 'DSA Mastery (40%) • Compulsory Roadmaps (30%) • Capstone Projects (20%) • Core CS (10%)',
    formulaDesc: 'Score = (0.40 × DSA) + (0.30 × Compulsory Roadmaps) + (0.20 × Projects) + (0.10 × Core CS)',
    weights: { dsa: 0.40, roadmaps: 0.30, projects: 0.20, notes: 0.10 },
    weightsList: [
      { label: 'DSA Problem Solving & Patterns', weight: 40, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Compulsory Domain Roadmaps', weight: 30, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'System Implementations & Projects', weight: 20, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: '4 Universal Core CS Subjects', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Trees', 'Graphs', 'Dynamic Programming', 'Sliding Window'],
    compulsoryRoadmapIds: ['dsa-foundation', 'dsa-advanced', 'sys-hld'],
    compulsoryRoadmapTitles: [
      'Data Structures Foundation',
      'Advanced Algorithms & Graph Mastery',
      'High-Level Distributed Systems (HLD)'
    ],
    recommendedRoadmapIds: ['dsa-foundation', 'dsa-advanced', 'sys-hld', 'cs-os', 'cs-dbms', 'cs-networks', 'cs-oop-lld'],
    recommendedRoadmapTitles: [
      'Data Structures Foundation',
      'Advanced Algorithms & Graph Mastery',
      'High-Level Distributed Systems (HLD)',
      'Operating Systems & Concurrency',
      'DBMS, SQL & Relational Architecture',
      'Computer Networks & Web Protocols',
      'Object-Oriented Programming & Clean LLD Design'
    ],
    primarySkills: ['Data Structures', 'C++ / Java / Python', 'Graph Algorithms', 'Dynamic Programming', 'System Design (HLD)'],
    targetBenchmarks: { minSolvedDsa: 25, minProjects: 2, minRoadmapPills: 5 }
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
    focusArea: 'Compulsory Roadmaps (35%) • DSA Mastery (35%) • Capstone Projects (20%) • Core CS (10%)',
    formulaDesc: 'Score = (0.35 × Compulsory Roadmaps) + (0.35 × DSA) + (0.20 × Projects) + (0.10 × Core CS)',
    weights: { dsa: 0.35, roadmaps: 0.35, projects: 0.20, notes: 0.10 },
    weightsList: [
      { label: 'Compulsory Full-Stack Roadmaps', weight: 35, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'DSA Mastery & Problem Patterns', weight: 35, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Deployed Portfolio Projects', weight: 20, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: '4 Universal Core CS Subjects', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Trees', 'Linked List'],
    compulsoryRoadmapIds: ['fe-react', 'fe-nextjs', 'be-node'],
    compulsoryRoadmapTitles: [
      'React.js & Modern UI Architecture',
      'Next.js 15 & Full-Stack Frontend',
      'Node.js & Express Architecture'
    ],
    recommendedRoadmapIds: ['fe-react', 'fe-nextjs', 'be-node', 'cs-os', 'cs-dbms', 'cs-networks', 'cs-oop-lld'],
    recommendedRoadmapTitles: [
      'React.js & Modern UI Architecture',
      'Next.js 15 & Full-Stack Frontend',
      'Node.js & Express Architecture',
      'Operating Systems & Concurrency',
      'DBMS, SQL & Relational Architecture',
      'Computer Networks & Web Protocols',
      'Object-Oriented Programming & Clean LLD Design'
    ],
    primarySkills: ['React / Next.js', 'Node.js & Express', 'PostgreSQL / MongoDB', 'REST APIs', 'Tailwind CSS'],
    targetBenchmarks: { minSolvedDsa: 20, minProjects: 2, minRoadmapPills: 5 }
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
      { label: 'Compulsory Frontend Roadmaps', weight: 40, color: 'text-teal-400', barColor: 'bg-teal-500' },
      { label: 'UI Capstone Applications', weight: 35, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'DSA & Algorithmic Patterns', weight: 25, color: 'text-indigo-400', barColor: 'bg-indigo-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Linked List'],
    compulsoryRoadmapIds: ['fe-react', 'fe-nextjs', 'fe-typescript'],
    compulsoryRoadmapTitles: [
      'React.js & Modern UI Architecture',
      'Next.js 15 & Full-Stack Frontend',
      'TypeScript & Modern JavaScript Internals'
    ],
    recommendedRoadmapIds: ['fe-react', 'fe-nextjs', 'fe-typescript', 'fe-css-performance', 'cs-networks'],
    recommendedRoadmapTitles: [
      'React.js & Modern UI Architecture',
      'Next.js 15 & Full-Stack Frontend',
      'TypeScript & Modern JavaScript Internals',
      'Modern CSS, Tailwind & UI Engineering',
      'Computer Networks & Web Protocols'
    ],
    primarySkills: ['React 19 / RSC', 'TypeScript', 'Next.js App Router', 'Tailwind CSS', 'Browser Performance (CWV)'],
    targetBenchmarks: { minSolvedDsa: 15, minProjects: 2, minRoadmapPills: 4 }
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
    focusArea: 'Backend Roadmaps (40%) • DSA & Graph Algos (35%) • Backend Projects (25%)',
    formulaDesc: 'Score = (0.40 × Backend Tracks) + (0.35 × DSA) + (0.25 × Backend Projects)',
    weights: { dsa: 0.35, roadmaps: 0.40, projects: 0.25, notes: 0.0 },
    weightsList: [
      { label: 'Compulsory Backend & System Design', weight: 40, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: 'DSA & Non-Linear Algorithms', weight: 35, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Scalable API Projects', weight: 25, color: 'text-cyan-400', barColor: 'bg-cyan-500' }
    ],
    recommendedDsaTopics: ['Trees', 'Graphs', 'Arrays & Hashing', 'Dynamic Programming'],
    compulsoryRoadmapIds: ['be-node', 'be-spring', 'sys-hld'],
    compulsoryRoadmapTitles: [
      'Node.js & Express Architecture',
      'Java Spring Boot Enterprise SDE',
      'High-Level Distributed Systems (HLD)'
    ],
    recommendedRoadmapIds: ['be-node', 'be-spring', 'sys-hld', 'cs-os', 'cs-dbms', 'cs-networks', 'cs-oop-lld'],
    recommendedRoadmapTitles: [
      'Node.js & Express Architecture',
      'Java Spring Boot Enterprise SDE',
      'High-Level Distributed Systems (HLD)',
      'Operating Systems & Concurrency',
      'DBMS, SQL & Relational Architecture',
      'Computer Networks & Web Protocols',
      'Object-Oriented Programming & Clean LLD Design'
    ],
    primarySkills: ['Node.js / Spring Boot', 'PostgreSQL / MongoDB', 'Redis Caching', 'Kafka Queues', 'Docker'],
    targetBenchmarks: { minSolvedDsa: 20, minProjects: 2, minRoadmapPills: 5 }
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
    compulsoryRoadmapIds: ['do-docker-k8s', 'do-cicd-cloud', 'do-monitoring-linux'],
    compulsoryRoadmapTitles: [
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Linux Administration & Observability'
    ],
    recommendedRoadmapIds: ['do-docker-k8s', 'do-cicd-cloud', 'do-monitoring-linux', 'cs-os', 'cs-networks'],
    recommendedRoadmapTitles: [
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Linux Administration & Observability',
      'Operating Systems & Concurrency',
      'Computer Networks & Web Protocols'
    ],
    primarySkills: ['Docker & Kubernetes', 'GitHub Actions CI/CD', 'Linux Shell Scripting', 'Terraform', 'Prometheus & Grafana'],
    targetBenchmarks: { minSolvedDsa: 12, minProjects: 2, minRoadmapPills: 4 }
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
    compulsoryRoadmapIds: ['do-cicd-cloud', 'do-docker-k8s', 'sys-hld'],
    compulsoryRoadmapTitles: [
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Docker & Kubernetes Orchestration',
      'High-Level Distributed Systems (HLD)'
    ],
    recommendedRoadmapIds: ['do-cicd-cloud', 'do-docker-k8s', 'sys-hld', 'cs-networks', 'cs-os'],
    recommendedRoadmapTitles: [
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Docker & Kubernetes Orchestration',
      'High-Level Distributed Systems (HLD)',
      'Computer Networks & Web Protocols',
      'Operating Systems & Concurrency'
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
    compulsoryRoadmapIds: ['ai-ml-python', 'ai-genai-llm', 'be-python'],
    compulsoryRoadmapTitles: [
      'Applied Machine Learning & PyTorch',
      'Generative AI, LLMs & RAG Systems',
      'Python & FastAPI High-Performance Backend'
    ],
    recommendedRoadmapIds: ['ai-ml-python', 'ai-genai-llm', 'be-python', 'cs-os', 'cs-dbms', 'dsa-foundation'],
    recommendedRoadmapTitles: [
      'Applied Machine Learning & PyTorch',
      'Generative AI, LLMs & RAG Systems',
      'Python & FastAPI High-Performance Backend',
      'Operating Systems & Concurrency',
      'DBMS, SQL & Relational Architecture',
      'Data Structures Foundation'
    ],
    primarySkills: ['Python & PyTorch', 'Transformers & HuggingFace', 'RAG Pipelines & LangChain', 'Vector DBs', 'FastAPI'],
    targetBenchmarks: { minSolvedDsa: 18, minProjects: 2, minRoadmapPills: 5 }
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
      { label: 'Test Automation & Core Tracks', weight: 40, color: 'text-rose-400', barColor: 'bg-rose-500' },
      { label: 'Automated E2E Test Suites', weight: 35, color: 'text-amber-400', barColor: 'bg-amber-500' },
      { label: 'String, Array & Core DSA', weight: 25, color: 'text-indigo-400', barColor: 'bg-indigo-500' }
    ],
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Strings', 'Linked List'],
    compulsoryRoadmapIds: ['sdet-automation', 'fe-typescript', 'be-node'],
    compulsoryRoadmapTitles: [
      'Automated Testing & SDET Architecture',
      'TypeScript & Modern JavaScript Internals',
      'Node.js & Express Architecture'
    ],
    recommendedRoadmapIds: ['sdet-automation', 'fe-typescript', 'be-node', 'cs-os', 'cs-dbms', 'cs-networks', 'cs-oop-lld'],
    recommendedRoadmapTitles: [
      'Automated Testing & SDET Architecture',
      'TypeScript & Modern JavaScript Internals',
      'Node.js & Express Architecture',
      'Operating Systems & Concurrency',
      'DBMS, SQL & Relational Architecture',
      'Computer Networks & Web Protocols',
      'Object-Oriented Programming & Clean LLD Design'
    ],
    primarySkills: ['Playwright / Cypress', 'Jest / Mocha', 'API Automation', 'k6 Load Testing', 'CI/CD Pipelines'],
    targetBenchmarks: { minSolvedDsa: 15, minProjects: 2, minRoadmapPills: 5 }
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
