export const allRoles = [
  {
    id: 'sde',
    title: 'Software Development Engineer (SDE / Core DSA)',
    shortLabel: 'SDE / Algorithms',
    category: 'Core Engineering',
    color: 'from-indigo-600 to-blue-600',
    borderColor: 'border-indigo-500/30',
    bgBadge: 'bg-indigo-950 text-indigo-300 border-indigo-800/40',
    desc: 'Heavy algorithmic problem solving, time/space complexity optimization, data structures mastery, and low-level system design.',
    focusArea: 'DSA Mastery (40%) • LLD Design (30%) • Core CS (20%) • Projects (10%)',
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Trees', 'Graphs', 'Dynamic Programming', 'Sliding Window'],
    recommendedRoadmapIds: ['dsa-foundation', 'dsa-advanced', 'sys-lld', 'cs-os-dbms'],
    recommendedRoadmapTitles: [
      'Data Structures Foundation',
      'Advanced Algorithms & DP Masterclass',
      'Low-Level Design & Clean Architecture (LLD)',
      'Operating Systems & DBMS Fundamentals'
    ],
    primarySkills: ['Data Structures', 'C++ / Java / Python', 'Algorithms', 'LLD Design Patterns', 'Complexity Analysis']
  },
  {
    id: 'fullstack',
    title: 'Full Stack Engineer (MERN / Next.js / Cloud)',
    shortLabel: 'Full Stack',
    category: 'Application Engineering',
    color: 'from-cyan-600 to-indigo-600',
    borderColor: 'border-cyan-500/30',
    bgBadge: 'bg-cyan-950 text-cyan-300 border-cyan-800/40',
    desc: 'Complete end-to-end web engineering covering modern React/Next.js frontends, Node.js/Express APIs, PostgreSQL/MongoDB, and cloud deployments.',
    focusArea: 'Full-Stack Tracks (35%) • DSA Mastery (35%) • Capstone Projects (20%) • Core CS (10%)',
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Trees', 'Linked List'],
    recommendedRoadmapIds: ['fs-mern', 'fs-postgres', 'dsa-foundation', 'sys-lld'],
    recommendedRoadmapTitles: [
      'MERN Stack Production Track',
      'Next.js + PostgreSQL + Prisma Stack',
      'Data Structures Foundation',
      'Low-Level Design & Clean Architecture'
    ],
    primarySkills: ['React / Next.js', 'Node.js & Express', 'PostgreSQL / MongoDB', 'REST & GraphQL', 'Tailwind CSS']
  },
  {
    id: 'frontend',
    title: 'Frontend Engineer (React / Next.js / UI Architecture)',
    shortLabel: 'Frontend',
    category: 'Client Engineering',
    color: 'from-teal-600 to-cyan-600',
    borderColor: 'border-teal-500/30',
    bgBadge: 'bg-teal-950 text-teal-300 border-teal-800/40',
    desc: 'Deep React 19 architecture, Server Components, client state management, Core Web Vitals performance, and micro-frontend design systems.',
    focusArea: 'Frontend Roadmaps (40%) • UI Projects (35%) • DSA Problem Solving (25%)',
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Linked List'],
    recommendedRoadmapIds: ['fe-react', 'fe-nextjs', 'fe-typescript', 'dsa-foundation'],
    recommendedRoadmapTitles: [
      'React.js & Client Architecture',
      'Next.js & Full-Stack Frontend',
      'TypeScript & Modern JavaScript',
      'Data Structures Foundation'
    ],
    primarySkills: ['React 19 / RSC', 'TypeScript', 'Next.js App Router', 'Tailwind CSS', 'Browser Performance']
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
    recommendedDsaTopics: ['Trees', 'Graphs', 'Arrays & Hashing', 'Dynamic Programming'],
    recommendedRoadmapIds: ['be-node', 'be-spring', 'sys-lld', 'cs-os-dbms'],
    recommendedRoadmapTitles: [
      'Node.js & Express Architecture',
      'Java Spring Boot Enterprise SDE',
      'Low-Level Design & Clean Architecture',
      'Operating Systems & DBMS Fundamentals'
    ],
    primarySkills: ['Node.js / Spring Boot', 'PostgreSQL / MongoDB', 'Redis Caching', 'Kafka Queues', 'Docker']
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
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Linked List'],
    recommendedRoadmapIds: ['do-docker-k8s', 'do-cicd-cloud', 'cs-networks'],
    recommendedRoadmapTitles: [
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Computer Networks & Web Protocols'
    ],
    primarySkills: ['Docker & Kubernetes', 'GitHub Actions CI/CD', 'Linux Shell Scripting', 'Terraform', 'Monitoring']
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
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Graphs'],
    recommendedRoadmapIds: ['do-cicd-cloud', 'do-docker-k8s', 'cs-networks', 'sys-hld'],
    recommendedRoadmapTitles: [
      'CI/CD Pipelines & AWS Cloud Deployment',
      'Docker & Kubernetes Orchestration',
      'Computer Networks & Web Protocols',
      'High-Level Distributed Systems (HLD)'
    ],
    primarySkills: ['AWS EC2/S3/Lambda', 'Cloud Networking (VPC/DNS)', 'IAM Security', 'Docker', 'Terraform']
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
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Dynamic Programming', 'Graphs'],
    recommendedRoadmapIds: ['be-python', 'dsa-foundation', 'dsa-advanced', 'cs-os-dbms'],
    recommendedRoadmapTitles: [
      'Python & FastAPI High-Performance Backend',
      'Data Structures Foundation',
      'Advanced Algorithms & DP Masterclass',
      'Operating Systems & DBMS Fundamentals'
    ],
    primarySkills: ['Python & PyTorch', 'Transformers & HuggingFace', 'RAG Pipelines & LangChain', 'Vector DBs', 'FastAPI']
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
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Strings', 'Linked List'],
    recommendedRoadmapIds: ['fe-typescript', 'be-node', 'dsa-foundation', 'do-cicd-cloud'],
    recommendedRoadmapTitles: [
      'TypeScript & Modern JavaScript',
      'Node.js & Express Architecture',
      'Data Structures Foundation',
      'CI/CD Pipelines & AWS Cloud Deployment'
    ],
    primarySkills: ['Playwright / Cypress', 'Jest / Mocha', 'API Automation', 'CI/CD Pipelines', 'Performance Testing']
  }
];

export const getRoleConfig = (roleTitle) => {
  if (!roleTitle) return allRoles[0];
  const query = roleTitle.toLowerCase();
  if (query.includes('frontend') || query.includes('react') || query.includes('ui')) {
    return allRoles.find(r => r.id === 'frontend');
  }
  if (query.includes('backend') || query.includes('node') || query.includes('java') || query.includes('spring')) {
    return allRoles.find(r => r.id === 'backend');
  }
  if (query.includes('devops') || query.includes('docker') || query.includes('k8s') || query.includes('kubernetes')) {
    return allRoles.find(r => r.id === 'devops');
  }
  if (query.includes('cloud') || query.includes('aws') || query.includes('infra') || query.includes('azure')) {
    return allRoles.find(r => r.id === 'cloud');
  }
  if (query.includes('ai') || query.includes('ml') || query.includes('machine learning') || query.includes('data science')) {
    return allRoles.find(r => r.id === 'ai-ml');
  }
  if (query.includes('sdet') || query.includes('test') || query.includes('qa')) {
    return allRoles.find(r => r.id === 'sdet');
  }
  if (query.includes('sde') || query.includes('algorithm') || query.includes('competitive')) {
    return allRoles.find(r => r.id === 'sde');
  }
  return allRoles.find(r => r.id === 'fullstack') || allRoles[0];
};
