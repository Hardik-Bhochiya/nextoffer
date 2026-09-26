export const universalCoreCsIds = ['cs-os', 'cs-dbms', 'cs-networks', 'cs-oop-lld'];

export const allRoles = [
  {
    id: 'sde',
    title: 'Software Development Engineer (SDE - Core Algorithms & Systems)',
    shortLabel: 'Software Engineer (SDE)',
    fullName: 'Software Development Engineer (SDE)',
    roleFullForm: 'SDE (Software Development Engineer) — Core Algorithms, Data Structures, High-Level Distributed Architecture & Low-Level Design',
    category: 'Core Engineering',
    color: 'from-indigo-600 to-blue-600',
    borderColor: 'border-indigo-500/30',
    bgBadge: 'bg-indigo-950 text-indigo-300 border-indigo-800/40',
    desc: 'Heavy algorithmic problem solving (DP, Graphs, Trees), time/space complexity optimization, data structures mastery, and high-level system design (HLD).',
    focusArea: 'DSA Mastery (40%) • Compulsory Roadmaps (25%) • Capstone Projects (20%) • Core CS (15%)',
    formulaDesc: 'Score = (0.40 × DSA Patterns) + (0.25 × Compulsory Roadmaps) + (0.20 × Projects) + (0.15 × 4 Core CS)',
    weights: { dsa: 0.40, roadmaps: 0.25, projects: 0.20, coreCs: 0.15 },
    weightsList: [
      { label: 'DSA Problem Solving & Patterns', weight: 40, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Compulsory Algorithms & HLD Tracks', weight: 25, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'System Implementations & Projects', weight: 20, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: '4 Universal Core CS Subjects', weight: 15, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    knowledgeRequired: {
      overview: 'Focuses on writing ultra-efficient, scalable, and memory-optimized code. SDE candidates are tested heavily on algorithmic rigor and computer science fundamentals.',
      coreCompetencies: [
        'Data Structures: Arrays, Trees, BST, Graphs, Heaps, HashMaps, Disjoint Sets',
        'Algorithms: Dynamic Programming, BFS/DFS, Binary Search, Two Pointers, Greedy',
        'System Design: High-Level Architecture (HLD), Caching, Load Balancing, Microservices',
        'Core CS: OS Concurrency, Deadlocks, DBMS ACID, SQL Indexing, Computer Networks (TCP/UDP, HTTP/3)'
      ],
      requiredLanguages: ['C++', 'Java', 'Python', 'Go', 'SQL'],
      interviewFormat: [
        'Round 1: Online Coding Assessment (2-3 DSA Questions on Graphs/DP)',
        'Round 2 & 3: Technical Problem Solving & Live Coding',
        'Round 4: System Design (HLD/LLD) & CS Fundamentals',
        'Round 5: Hiring Manager & Behavioral'
      ],
      industryExpectations: 'Targeted by Google, Amazon, Microsoft, Meta, Uber, and high-growth product companies for core backend, systems, and product teams.'
    },
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Trees', 'Graphs', 'Dynamic Programming', 'Sliding Window', 'Heap & Priority Queue', 'Binary Search'],
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
    primarySkills: ['Data Structures', 'C++ / Java / Python', 'Graph Algorithms', 'Dynamic Programming', 'System Design (HLD)', 'OS & DBMS'],
    targetBenchmarks: { minSolvedDsa: 75, minProjects: 2, minRoadmapPills: 6, requiredTopicsCount: 8 }
  },
  {
    id: 'fullstack',
    title: 'Full Stack Engineer (MERN / Next.js / Cloud APIs)',
    shortLabel: 'Full Stack Engineer',
    fullName: 'Full Stack Software Engineer (Frontend + Backend + Cloud)',
    roleFullForm: 'Full Stack Engineer — Modern Client UI (React/Next.js), Server APIs (Node.js/Express/FastAPI), Databases (PostgreSQL/MongoDB) & Cloud Deployment',
    category: 'Application Engineering',
    color: 'from-cyan-600 to-indigo-600',
    borderColor: 'border-cyan-500/30',
    bgBadge: 'bg-cyan-950 text-cyan-300 border-cyan-800/40',
    desc: 'Complete end-to-end web engineering covering modern React 19 / Next.js frontends, Node.js/Express APIs, PostgreSQL/MongoDB, and cloud deployments.',
    focusArea: 'Full-Stack Roadmaps (35%) • Deployed Projects (30%) • DSA Problem Solving (25%) • Core CS (10%)',
    formulaDesc: 'Score = (0.35 × Full-Stack Roadmaps) + (0.30 × Deployed Projects) + (0.25 × DSA) + (0.10 × Core CS)',
    weights: { dsa: 0.25, roadmaps: 0.35, projects: 0.30, coreCs: 0.10 },
    weightsList: [
      { label: 'Compulsory Full-Stack Roadmaps', weight: 35, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'Deployed Capstone Projects', weight: 30, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: 'DSA & Problem Solving Patterns', weight: 25, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Core CS (DBMS & Networks)', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    knowledgeRequired: {
      overview: 'Owns product features from UI interaction to persistent database storage and deployment. Strong knowledge of asynchronous programming, state, and API security.',
      coreCompetencies: [
        'Frontend: React 19, Next.js App Router, Server Components (RSC), Tailwind CSS, State Management',
        'Backend: RESTful & GraphQL APIs, Node.js/Express, JWT/OAuth2 Authentication, WebSockets',
        'Databases: PostgreSQL, Prisma/Mongoose ORM, MongoDB, Redis Caching, Connection Pooling',
        'DevOps: Docker containerization, CI/CD with GitHub Actions, Vercel / AWS deployment'
      ],
      requiredLanguages: ['TypeScript', 'JavaScript', 'Node.js', 'SQL', 'HTML5/CSS3'],
      interviewFormat: [
        'Round 1: DSA Screening (Medium Array/String/Tree Problems)',
        'Round 2: Machine Coding / Full Stack Take-Home Project Defense',
        'Round 3: Frontend Architecture & Backend API Design',
        'Round 4: Database Schema Design & Core Web Protocols'
      ],
      industryExpectations: 'In high demand across product startups, SaaS companies, and tier-1 tech enterprises.'
    },
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Trees', 'Linked List', 'Stack & Queue'],
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
    primarySkills: ['React 19 / Next.js', 'Node.js & Express', 'PostgreSQL / MongoDB', 'REST & GraphQL APIs', 'Tailwind CSS'],
    targetBenchmarks: { minSolvedDsa: 50, minProjects: 2, minRoadmapPills: 5, requiredTopicsCount: 6 }
  },
  {
    id: 'backend',
    title: 'Backend & Distributed Systems Engineer (Node.js / Java / Scalable APIs)',
    shortLabel: 'Backend Engineer',
    fullName: 'Backend & Distributed Systems Engineer',
    roleFullForm: 'Backend Engineer — High-Throughput APIs, Distributed Transactions, Message Queues (Kafka/RabbitMQ), Database Scaling & Microservices',
    category: 'Server Engineering',
    color: 'from-emerald-600 to-teal-600',
    borderColor: 'border-emerald-500/30',
    bgBadge: 'bg-emerald-950 text-emerald-300 border-emerald-800/40',
    desc: 'High-throughput RESTful & gRPC APIs, database indexing, distributed transactions, Redis caching, message queues (Kafka), and clean architecture.',
    focusArea: 'Backend & HLD Roadmaps (35%) • Backend Projects (30%) • DSA & Graph Algos (25%) • Core CS (10%)',
    formulaDesc: 'Score = (0.35 × Backend & HLD Roadmaps) + (0.30 × Backend Projects) + (0.25 × DSA & Graphs) + (0.10 × Core CS)',
    weights: { dsa: 0.25, roadmaps: 0.35, projects: 0.30, coreCs: 0.10 },
    weightsList: [
      { label: 'Compulsory Backend & System Design', weight: 35, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
      { label: 'Scalable Architecture Projects', weight: 30, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'DSA & Non-Linear Algorithms', weight: 25, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'OS Concurrency & DBMS Indexing', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    knowledgeRequired: {
      overview: 'Specializes in high-scale server performance, reliable data storage, rate limiting, distributed caching, and zero-downtime microservices.',
      coreCompetencies: [
        'API Design: REST, gRPC, GraphQL, WebSockets, Idempotency, Rate Limiting',
        'Distributed Systems: Kafka/RabbitMQ Message Brokers, Redis In-Memory Caching, CDN',
        'Database Mastery: Indexing (B-Trees), Sharding, Replication, Query Optimization, ACID vs BASE',
        'Concurrency & Systems: Multithreading, Thread Pools, Event Loops, Memory Leaks'
      ],
      requiredLanguages: ['Java (Spring Boot)', 'Node.js', 'Go', 'Python', 'SQL'],
      interviewFormat: [
        'Round 1: DSA Problem Solving (Trees, Graphs, DP, HashMaps)',
        'Round 2: Low-Level Design (LLD) & Object-Oriented Patterns',
        'Round 3: High-Level System Design (HLD) & Scale Bottlenecks',
        'Round 4: Database Internals & OS Fundamentals'
      ],
      industryExpectations: 'Crucial for fintech, streaming platforms, e-commerce engines, and high-concurrency cloud applications.'
    },
    recommendedDsaTopics: ['Trees', 'Graphs', 'Arrays & Hashing', 'Dynamic Programming', 'Two Pointers', 'Stack & Queue'],
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
    primarySkills: ['Node.js / Spring Boot', 'PostgreSQL & Indexing', 'Redis Caching', 'Kafka Queues', 'Docker & Microservices'],
    targetBenchmarks: { minSolvedDsa: 50, minProjects: 2, minRoadmapPills: 5, requiredTopicsCount: 6 }
  },
  {
    id: 'frontend',
    title: 'Frontend & UI Architecture Engineer (React / Next.js / Web Performance)',
    shortLabel: 'Frontend Engineer',
    fullName: 'Frontend & UI Architecture Engineer',
    roleFullForm: 'Frontend Engineer — Modern UI/UX Architecture, React 19, Next.js, Core Web Vitals, Responsive Layouts, Accessibility & Browser Internals',
    category: 'Client Engineering',
    color: 'from-teal-600 to-cyan-600',
    borderColor: 'border-teal-500/30',
    bgBadge: 'bg-teal-950 text-teal-300 border-teal-800/40',
    desc: 'Deep React 19 architecture, Server Components (RSC), client state management, Core Web Vitals performance, and modern design systems.',
    focusArea: 'Frontend Roadmaps (40%) • UI Capstone Projects (35%) • DSA Problem Solving (15%) • Web & Core CS (10%)',
    formulaDesc: 'Score = (0.40 × Frontend Tracks) + (0.35 × UI Projects) + (0.15 × DSA) + (0.10 × Web & Core CS)',
    weights: { dsa: 0.15, roadmaps: 0.40, projects: 0.35, coreCs: 0.10 },
    weightsList: [
      { label: 'Compulsory Frontend Roadmaps', weight: 40, color: 'text-teal-400', barColor: 'bg-teal-500' },
      { label: 'UI Capstone Applications', weight: 35, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'DSA & Algorithmic Patterns', weight: 15, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Browser Networks & Performance', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    knowledgeRequired: {
      overview: 'Focuses on creating fluid, accessible, high-performance web applications with clean component architecture and pixel-perfect design fidelity.',
      coreCompetencies: [
        'React Architecture: Hooks, Context, RSC (React Server Components), Suspense, Custom Hooks',
        'Performance: Core Web Vitals (LCP, INP, CLS), Bundle Optimization, Code Splitting, Memoization',
        'UI Engineering: CSS Architecture, Tailwind CSS, Responsive Design, CSS Grid/Flexbox, ARIA a11y',
        'Browser Internals: Event Loop, DOM Rendering Engine, HTTP/2 & HTTP/3, Web Workers'
      ],
      requiredLanguages: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'Modern CSS'],
      interviewFormat: [
        'Round 1: JavaScript & DOM Manipulation Live Coding',
        'Round 2: React Component Architecture & State Design (UI Machine Coding)',
        'Round 3: Web Performance, Network Optimization & Accessibility',
        'Round 4: Light DSA / Algorithmic Problem Solving (Arrays, Strings, Two Pointers)'
      ],
      industryExpectations: 'Targeted by high-growth product companies demanding exceptional user experiences and responsive applications.'
    },
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Linked List', 'Strings'],
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
    targetBenchmarks: { minSolvedDsa: 35, minProjects: 2, minRoadmapPills: 4, requiredTopicsCount: 4 }
  },
  {
    id: 'devops',
    title: 'DevOps & Site Reliability Engineer (Docker / Kubernetes / CI/CD / Linux)',
    shortLabel: 'DevOps & SRE',
    fullName: 'DevOps & Site Reliability Engineer (SRE)',
    roleFullForm: 'DevOps & SRE — Containerization (Docker), Orchestration (Kubernetes), Infrastructure as Code (Terraform), CI/CD Automation & Observability',
    category: 'Platform & Infrastructure',
    color: 'from-amber-600 to-orange-600',
    borderColor: 'border-amber-500/30',
    bgBadge: 'bg-amber-950 text-amber-300 border-amber-800/40',
    desc: 'Container packaging, Kubernetes cluster orchestration, GitHub Actions automated CI/CD pipelines, Linux administration, and infrastructure as code.',
    focusArea: 'DevOps & K8s Roadmaps (40%) • Infrastructure Projects (35%) • Systems Scripting & DSA (15%) • Core CS (10%)',
    formulaDesc: 'Score = (0.40 × DevOps Tracks) + (0.35 × Pipeline Projects) + (0.15 × Systems & DSA) + (0.10 × Core CS)',
    weights: { dsa: 0.15, roadmaps: 0.40, projects: 0.35, coreCs: 0.10 },
    weightsList: [
      { label: 'Docker, K8s & CI/CD Tracks', weight: 40, color: 'text-amber-400', barColor: 'bg-amber-500' },
      { label: 'Automated Pipeline Deployments', weight: 35, color: 'text-orange-400', barColor: 'bg-orange-500' },
      { label: 'Systems & Shell Problem Solving', weight: 15, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'OS Process Isolation & Networks', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    knowledgeRequired: {
      overview: 'Ensures systems run with high uptime, automated deployments, robust monitoring, and scalable infrastructure provisioning.',
      coreCompetencies: [
        'Containers & Orchestration: Docker Multi-Stage Builds, Kubernetes Pods/Services/Ingress/Helm',
        'CI/CD: GitHub Actions, GitLab CI, Automated Testing Gates, Blue-Green & Canary Deployments',
        'Infrastructure as Code: Terraform, CloudFormation, Ansible, Secret Management (Vault)',
        'Observability & Linux: Prometheus, Grafana, ELK Stack, Linux Syscalls, Bash Scripting'
      ],
      requiredLanguages: ['Bash / Shell Scripting', 'Python / Go', 'YAML', 'HCL (Terraform)'],
      interviewFormat: [
        'Round 1: Linux Administration, Bash Scripting & Networking Fundamentals',
        'Round 2: Docker & Kubernetes Architecture Troubleshooting',
        'Round 3: CI/CD Pipeline Automation & Production Incident Post-Mortem',
        'Round 4: Systems Problem Solving & Core Cloud Architecture'
      ],
      industryExpectations: 'Critical for cloud-native enterprises and SaaS platforms managing high-traffic distributed deployments.'
    },
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Linked List', 'Strings'],
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
    targetBenchmarks: { minSolvedDsa: 30, minProjects: 2, minRoadmapPills: 4, requiredTopicsCount: 4 }
  },
  {
    id: 'cloud',
    title: 'Cloud Platform Engineer (AWS / Multi-Cloud / Terraform / Security)',
    shortLabel: 'Cloud Platform',
    fullName: 'Cloud Platform & Infrastructure Engineer',
    roleFullForm: 'Cloud Engineer — AWS / GCP / Azure Infrastructure, VPC Networking, Serverless Compute, IAM Security Governance & Terraform IaC',
    category: 'Cloud Engineering',
    color: 'from-blue-600 to-indigo-600',
    borderColor: 'border-blue-500/30',
    bgBadge: 'bg-blue-950 text-blue-300 border-blue-800/40',
    desc: 'Multi-region cloud architecture, VPC networking, serverless compute, IAM security, cloud storage, database management, and Terraform IaC.',
    focusArea: 'Cloud Roadmaps (40%) • Infrastructure Projects (35%) • Networking & DSA (15%) • Core CS (10%)',
    formulaDesc: 'Score = (0.40 × Cloud Tracks) + (0.35 × Cloud Projects) + (0.15 × Networking & DSA) + (0.10 × Core CS)',
    weights: { dsa: 0.15, roadmaps: 0.40, projects: 0.35, coreCs: 0.10 },
    weightsList: [
      { label: 'AWS & Cloud Infrastructure Tracks', weight: 40, color: 'text-blue-400', barColor: 'bg-blue-500' },
      { label: 'Infrastructure as Code Projects', weight: 35, color: 'text-cyan-400', barColor: 'bg-cyan-500' },
      { label: 'Networking & Problem Solving', weight: 15, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Network Protocols & OS Storage', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    knowledgeRequired: {
      overview: 'Designs secure, scalable, fault-tolerant cloud environments across multi-region architectures.',
      coreCompetencies: [
        'Cloud Services: AWS EC2, S3, Lambda Serverless, ECS/EKS, RDS, DynamoDB, CloudFront CDN',
        'Cloud Networking: VPC Peering, Subnets, Route Tables, NAT Gateways, DNS (Route53), VPNs',
        'Security & Compliance: AWS IAM Roles/Policies, KMS Encryption, Least Privilege Architecture',
        'Infrastructure as Code: Terraform Modules, State Management, Drift Detection'
      ],
      requiredLanguages: ['Python', 'Bash', 'HCL (Terraform)', 'Go', 'SQL'],
      interviewFormat: [
        'Round 1: Cloud Architecture Design & Multi-Region Resiliency',
        'Round 2: VPC Networking, CIDR Blocks & Security Governance',
        'Round 3: Terraform Machine Coding & Infrastructure Provisioning',
        'Round 4: Systems Problem Solving & Core Networking Protocols'
      ],
      industryExpectations: 'In demand across enterprises migrating workloads to AWS, Azure, and Google Cloud Platform.'
    },
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Graphs', 'Strings'],
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
    targetBenchmarks: { minSolvedDsa: 30, minProjects: 2, minRoadmapPills: 4, requiredTopicsCount: 4 }
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning Engineer (PyTorch / LLMs / GenAI / Python)',
    shortLabel: 'AI / ML Engineer',
    fullName: 'AI & Machine Learning Engineer (Applied GenAI / ML)',
    roleFullForm: 'AI & ML Engineer — Generative AI, Large Language Models (LLMs), RAG Retrieval Systems, PyTorch Deep Learning, Vector Databases & Inference APIs',
    category: 'Artificial Intelligence',
    color: 'from-purple-600 to-pink-600',
    borderColor: 'border-purple-500/30',
    bgBadge: 'bg-purple-950 text-purple-300 border-purple-800/40',
    desc: 'Deep learning foundations, neural networks, PyTorch, LLM fine-tuning, RAG retrieval architectures, Vector DBs, and model inference pipelines.',
    focusArea: 'AI/ML Roadmaps (40%) • GenAI/ML Projects (30%) • Math & Algorithms (20%) • Data & Core CS (10%)',
    formulaDesc: 'Score = (0.40 × AI/ML Tracks) + (0.30 × ML Projects) + (0.20 × Math & Algorithms) + (0.10 × Core CS)',
    weights: { dsa: 0.20, roadmaps: 0.40, projects: 0.30, coreCs: 0.10 },
    weightsList: [
      { label: 'Python & ML Backend Tracks', weight: 40, color: 'text-purple-400', barColor: 'bg-purple-500' },
      { label: 'Deployed GenAI / RAG Projects', weight: 30, color: 'text-pink-400', barColor: 'bg-pink-500' },
      { label: 'Algorithms & Computational Math', weight: 20, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Vector DB & System Fundamentals', weight: 10, color: 'text-amber-400', barColor: 'bg-amber-500' }
    ],
    knowledgeRequired: {
      overview: 'Builds intelligent systems leveraging neural networks, LLMs, embeddings, fine-tuning, and scalable production AI inference.',
      coreCompetencies: [
        'GenAI & LLMs: RAG (Retrieval Augmented Generation), LangChain, LlamaIndex, Prompt Engineering',
        'Deep Learning: PyTorch, HuggingFace Transformers, Fine-Tuning (LoRA / QLoRA), Embeddings',
        'Vector Search: Pinecone, Qdrant, ChromaDB, Cosine Similarity, Hybrid Keyword+Semantic Search',
        'Production ML: FastAPI inference endpoints, Model quantization (GGUF/vLLM), Latency optimization'
      ],
      requiredLanguages: ['Python', 'SQL', 'C++ (Optional for CUDA)', 'Bash'],
      interviewFormat: [
        'Round 1: Python & Algorithmic Problem Solving (Matrix, Graphs, Math)',
        'Round 2: Machine Learning Foundations & PyTorch Model Architecture',
        'Round 3: GenAI System Design (RAG Pipelines, Chunking, Context Windows)',
        'Round 4: Production ML Deployment & Scalability'
      ],
      industryExpectations: 'Rapidly growing field across top AI labs, enterprise software, and innovative AI product startups.'
    },
    recommendedDsaTopics: ['Arrays & Hashing', 'Two Pointers', 'Dynamic Programming', 'Graphs', 'Trees', 'Matrix & 2D Grid'],
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
    targetBenchmarks: { minSolvedDsa: 40, minProjects: 2, minRoadmapPills: 5, requiredTopicsCount: 5 }
  },
  {
    id: 'sdet',
    title: 'Software Development Engineer in Test (SDET / Automation Frameworks)',
    shortLabel: 'SDET / Automation',
    fullName: 'Software Development Engineer in Test (SDET)',
    roleFullForm: 'SDET (Software Development Engineer in Test) — Automated E2E Frameworks (Playwright/Cypress), API Testing, Performance Benchmarking & CI Quality Gates',
    category: 'Quality Engineering',
    color: 'from-rose-600 to-amber-600',
    borderColor: 'border-rose-500/30',
    bgBadge: 'bg-rose-950 text-rose-300 border-rose-800/40',
    desc: 'End-to-end test automation frameworks, Playwright/Cypress suites, API testing, performance load benchmarking (k6), and CI test pipeline integration.',
    focusArea: 'Test Automation Roadmaps (40%) • Automation Projects (35%) • Core DSA (20%) • Core CS (5%)',
    formulaDesc: 'Score = (0.40 × Testing Tracks) + (0.35 × Test Projects) + (0.20 × DSA) + (0.05 × Core CS)',
    weights: { dsa: 0.20, roadmaps: 0.40, projects: 0.35, coreCs: 0.05 },
    weightsList: [
      { label: 'Test Automation & Core Tracks', weight: 40, color: 'text-rose-400', barColor: 'bg-rose-500' },
      { label: 'Automated E2E Test Suites', weight: 35, color: 'text-amber-400', barColor: 'bg-amber-500' },
      { label: 'String, Array & Core DSA', weight: 20, color: 'text-indigo-400', barColor: 'bg-indigo-500' },
      { label: 'Network Protocols & HTTP', weight: 5, color: 'text-cyan-400', barColor: 'bg-cyan-500' }
    ],
    knowledgeRequired: {
      overview: 'Develops robust automated testing software, load testing suites, and CI pipelines ensuring zero defect regressions in production.',
      coreCompetencies: [
        'E2E Automation: Playwright, Cypress, Selenium WebDriver, Page Object Model (POM)',
        'API Automation: Supertest, REST Assured, Postman Newman, Mocking Services',
        'Performance Testing: k6, Locust, JMeter, Concurrency and Latency Benchmarks',
        'CI/CD Integration: Parallel Test Runners, GitHub Actions Test Matrices, Allure Reporting'
      ],
      requiredLanguages: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'],
      interviewFormat: [
        'Round 1: Problem Solving & Core DSA (Arrays, Strings, HashMaps, Two Pointers)',
        'Round 2: Test Automation Framework Design & Live Coding (Playwright/Cypress)',
        'Round 3: API Testing, Mocking & Boundary Value Analysis',
        'Round 4: CI/CD Quality Gates & Production Reliability'
      ],
      industryExpectations: 'In demand across Amazon, Microsoft, fintech firms, and enterprise companies emphasizing continuous delivery quality.'
    },
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
    primarySkills: ['Playwright / Cypress', 'Jest / Supertest', 'API Automation', 'k6 Load Testing', 'CI/CD Pipelines'],
    targetBenchmarks: { minSolvedDsa: 35, minProjects: 2, minRoadmapPills: 5, requiredTopicsCount: 4 }
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
  if (query.includes('sdet') || query.includes('test') || query.includes('qa') || query.includes('quality') || query.includes('automation')) {
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
  if (query.includes('sde') || query.includes('core dsa') || query.includes('algorithm') || query.includes('competitive') || query.includes('software engineer')) {
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

/**
 * Universal Client-Side Readiness Evaluation Function
 * Evaluates candidate readiness score based on realistic role benchmarks and topic diversity.
 */
export const calculateCandidateReadiness = (targetRole, data = {}) => {
  const roleConfig = getRoleConfig(targetRole);
  const { dsaProblems = [], roadmaps = [], projects = [], notes = [] } = data;

  // 1. Realistic DSA Component: Weighted by difficulty + Topic Diversity Multiplier
  const solvedDsa = dsaProblems.filter(p => p.status === 'Solved' || p.status === 'Completed');
  const easyCount = solvedDsa.filter(p => p.difficulty === 'Easy').length;
  const medCount = solvedDsa.filter(p => p.difficulty === 'Medium').length;
  const hardCount = solvedDsa.filter(p => p.difficulty === 'Hard').length;

  // Find distinct topics practiced
  const distinctTopics = new Set();
  solvedDsa.forEach(p => {
    if (Array.isArray(p.topics)) {
      p.topics.forEach(t => distinctTopics.add(t));
    } else if (p.topic) {
      distinctTopics.add(p.topic);
    }
  });

  const benchmarkPoints = roleConfig.targetBenchmarks?.minSolvedDsa || 50;
  const requiredTopics = roleConfig.targetBenchmarks?.requiredTopicsCount || 6;

  // Easy = 1, Medium = 2.5, Hard = 4.5
  const dsaWeightedScore = (easyCount * 1) + (medCount * 2.5) + (hardCount * 4.5);
  const rawVolumeScore = Math.min(100, Math.round((dsaWeightedScore / benchmarkPoints) * 100));

  // Diversity multiplier: solving across multiple patterns is mandatory for real readiness
  const diversityRatio = Math.min(1.0, 0.4 + (0.6 * (distinctTopics.size / Math.max(1, requiredTopics))));
  const dsaProgress = Math.min(100, Math.round(rawVolumeScore * diversityRatio));

  // 2. Compulsory Domain Roadmaps Component
  const compulsoryRoadmaps = roadmaps.filter(r => roleConfig.compulsoryRoadmapIds.includes(r.id));
  const compTotalTopics = compulsoryRoadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
  const compCompletedTopics = compulsoryRoadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.completed).length || 0), 0);
  const roadmapsProgress = compTotalTopics > 0 ? Math.min(100, Math.round((compCompletedTopics / compTotalTopics) * 100)) : 0;

  // 3. Projects Component (min 2 deep architecture projects)
  const minProjects = roleConfig.targetBenchmarks?.minProjects || 2;
  const projectsProgress = Math.min(100, Math.round((projects.length / minProjects) * 100));

  // 4. Universal Core CS Component (OS, DBMS, Networks, OOP/LLD)
  const coreCsRoadmaps = roadmaps.filter(r => universalCoreCsIds.includes(r.id));
  const coreTotalTopics = coreCsRoadmaps.reduce((acc, r) => acc + (r.topics?.length || 0), 0);
  const coreCompletedTopics = coreCsRoadmaps.reduce((acc, r) => acc + (r.topics?.filter(t => t.completed).length || 0), 0);
  const coreCsProgress = coreTotalTopics > 0 ? Math.min(100, Math.round((coreCompletedTopics / coreTotalTopics) * 100)) : 0;

  // Weighted Final Score
  const weights = roleConfig.weights;
  const finalScore = Math.min(100, Math.round(
    (dsaProgress * weights.dsa) +
    (roadmapsProgress * weights.roadmaps) +
    (projectsProgress * weights.projects) +
    (coreCsProgress * (weights.coreCs || 0))
  ));

  return {
    score: finalScore,
    roleConfig,
    tier: getReadinessTier(finalScore),
    dimensions: {
      dsa: {
        score: dsaProgress,
        rawVolume: rawVolumeScore,
        diversityRatio: Math.round(diversityRatio * 100),
        distinctTopicsCount: distinctTopics.size,
        requiredTopics,
        weight: weights.dsa * 100,
        solvedCount: solvedDsa.length,
        easy: easyCount,
        medium: medCount,
        hard: hardCount
      },
      roadmaps: { score: roadmapsProgress, weight: weights.roadmaps * 100, completedPills: compCompletedTopics, totalPills: compTotalTopics },
      projects: { score: projectsProgress, weight: weights.projects * 100, count: projects.length, targetCount: minProjects },
      coreCs: { score: coreCsProgress, weight: (weights.coreCs || 0) * 100, completedPills: coreCompletedTopics, totalPills: coreTotalTopics }
    }
  };
};
