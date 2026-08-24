export const defaultDsaProblems = [
  // Arrays & Hashing
  {
    id: 'dsa-1',
    title: 'Two Sum',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/two-sum/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    notes: 'Use a Hash Map to store seen complements (target - num). One-pass lookup.',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-2',
    title: 'Best Time to Buy and Sell Stock',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Track minimum price so far and calculate maximum profit at each step.',
    revisionsCount: 1,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-3',
    title: 'Contains Duplicate',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/contains-duplicate/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    notes: 'Insert into a Hash Set and check if length matches or element exists.',
    revisionsCount: 1,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-4',
    title: 'Product of Array Except Self',
    topic: 'Arrays & Hashing',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/product-of-array-except-self/',
    status: 'Needs Revision',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Two-pass prefix product and postfix product without division.',
    revisionsCount: 3,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-5',
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    topic: 'Arrays & Hashing',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/maximum-subarray/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Kadane algorithm: currentMax = Math.max(num, currentMax + num).',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-6',
    title: '3Sum',
    topic: 'Two Pointers',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/3sum/',
    status: 'Attempted',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    notes: 'Sort array, fix one element, use two pointers for the remaining pair. Skip duplicates.',
    revisionsCount: 1,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-7',
    title: 'Trapping Rain Water',
    topic: 'Two Pointers',
    difficulty: 'Hard',
    url: 'https://leetcode.com/problems/trapping-rain-water/',
    status: 'Unsolved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Two pointers with leftMax and rightMax boundaries.',
    revisionsCount: 0,
    lastRevised: null
  },
  {
    id: 'dsa-8',
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Sliding Window',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n))',
    notes: 'Sliding window with map of last seen indices.',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-9',
    title: 'Reverse Linked List',
    topic: 'Linked List',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/reverse-linked-list/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Iterative with prev, curr, next pointers.',
    revisionsCount: 3,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-10',
    title: 'Lowest Common Ancestor of a BST',
    topic: 'Trees',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    status: 'Solved',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)',
    notes: 'If both p and q are greater than root, go right; if smaller, go left.',
    revisionsCount: 1,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-11',
    title: 'Number of Islands',
    topic: 'Graphs',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/number-of-islands/',
    status: 'Solved',
    timeComplexity: 'O(r * c)',
    spaceComplexity: 'O(r * c)',
    notes: 'DFS / BFS flood fill on grid when visiting land cell "1".',
    revisionsCount: 3,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-12',
    title: 'Coin Change',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/coin-change/',
    status: 'Solved',
    timeComplexity: 'O(amount * coins)',
    spaceComplexity: 'O(amount)',
    notes: 'Bottom-up 1D DP array initialized to Infinity.',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  }
];

// Software Developer Specific Curated Roadmaps (2-3 roadmaps per core domain)
export const defaultRoadmaps = [
  // 1. FRONTEND ENGINEERING (3 Roadmaps)
  {
    id: 'fe-react',
    categoryGroup: 'Frontend',
    category: 'React.js & Client Architecture',
    description: 'Master component architecture, state management, render cycles, and custom hooks.',
    icon: 'Layout',
    topics: [
      { id: 'fer-1', title: 'React 19 Core: Hooks (useState, useEffect, useMemo, useCallback)', completed: false, resources: 'react.dev' },
      { id: 'fer-2', title: 'Component Composition & Custom Hooks Design Patterns', completed: false, resources: 'React Patterns' },
      { id: 'fer-3', title: 'Client State Architecture: Zustand vs Redux Toolkit', completed: false, resources: 'Zustand Docs' },
      { id: 'fer-4', title: 'Server State & Caching: TanStack React Query', completed: false, resources: 'TanStack Docs' },
      { id: 'fer-5', title: 'Component Testing with Vitest & React Testing Library', completed: false, resources: 'Testing Library' }
    ]
  },
  {
    id: 'fe-nextjs',
    categoryGroup: 'Frontend',
    category: 'Next.js & Full-Stack Frontend',
    description: 'Server Components, SSR, SSG, Route Handlers, and Edge caching for production apps.',
    icon: 'Layout',
    topics: [
      { id: 'fen-1', title: 'Next.js 15 App Router Architecture & Server Components (RSC)', completed: false, resources: 'Next.js Handbook' },
      { id: 'fen-2', title: 'Data Fetching: SSR, Static Generation & Incremental ISR', completed: false, resources: 'Next.js Rendering' },
      { id: 'fen-3', title: 'Server Actions, Form Mutations & Zod Validation', completed: false, resources: 'Zod & Server Actions' },
      { id: 'fen-4', title: 'Edge Middleware, Cookie Auth & Route Interception', completed: false, resources: 'Next.js Middleware' },
      { id: 'fen-5', title: 'Core Web Vitals Optimization (LCP, CLS, INP)', completed: false, resources: 'web.dev Performance' }
    ]
  },
  {
    id: 'fe-typescript',
    categoryGroup: 'Frontend',
    category: 'TypeScript & Modern JavaScript',
    description: 'Deep dive into TypeScript type system, generics, ES6+ asynchronous runtimes, and DOM internals.',
    icon: 'Layout',
    topics: [
      { id: 'fet-1', title: 'JavaScript Event Loop, Microtasks, Closures & Prototypes', completed: false, resources: 'javascript.info' },
      { id: 'fet-2', title: 'TypeScript Generics, Utility Types, Keyof & Conditional Types', completed: false, resources: 'TypeScript Handbook' },
      { id: 'fet-3', title: 'Type Narrowing, Discriminated Unions & Type Guards', completed: false, resources: 'Total TypeScript' },
      { id: 'fet-4', title: 'Web APIs: WebSockets, Web Workers, IndexedDB & LocalStorage', completed: false, resources: 'MDN Web APIs' }
    ]
  },

  // 2. BACKEND ENGINEERING (3 Roadmaps)
  {
    id: 'be-node',
    categoryGroup: 'Backend',
    category: 'Node.js & Express Architecture',
    description: 'Build robust REST APIs, middleware pipelines, JWT auth, and database integrations.',
    icon: 'Server',
    topics: [
      { id: 'ben-1', title: 'Node.js Libuv, Event Loop, Non-blocking I/O & Streams', completed: false, resources: 'Node.js Internals' },
      { id: 'ben-2', title: 'Express.js & NestJS Controller/Service Architecture', completed: false, resources: 'NestJS Docs' },
      { id: 'ben-3', title: 'Authentication: JWT, Refresh Tokens, bcrypt & Role-Based Access', completed: false, resources: 'OWASP Auth' },
      { id: 'ben-4', title: 'Database Integration with Mongoose & Prisma ORM', completed: false, resources: 'Prisma Guide' },
      { id: 'ben-5', title: 'Error Handling, Winston Logging & Joi/Zod Request Validation', completed: false, resources: 'Express Best Practices' }
    ]
  },
  {
    id: 'be-spring',
    categoryGroup: 'Backend',
    category: 'Java Spring Boot Enterprise SDE',
    description: 'Enterprise backend development with Spring Boot, Spring Security, Hibernate JPA, and Microservices.',
    icon: 'Server',
    topics: [
      { id: 'bes-1', title: 'Core Java 21: OOPs, Multithreading, Generics & Streams API', completed: false, resources: 'Java Modern Guide' },
      { id: 'bes-2', title: 'Spring Boot Dependency Injection, Annotations & Auto-Configuration', completed: false, resources: 'Spring Official Guide' },
      { id: 'bes-3', title: 'Spring Data JPA, Hibernate, Connection Pooling & Transactions', completed: false, resources: 'Baeldung Spring JPA' },
      { id: 'bes-4', title: 'Spring Security with JWT & OAuth2 Resource Server', completed: false, resources: 'Spring Security 6' },
      { id: 'bes-5', title: 'Microservices with Eureka Discovery, Spring Cloud Gateway & Kafka', completed: false, resources: 'Spring Microservices' }
    ]
  },
  {
    id: 'be-python',
    categoryGroup: 'Backend',
    category: 'Python & FastAPI High-Performance Backend',
    description: 'Asynchronous backend systems, Pydantic data schemas, SQLAlchemy ORM, and Celery workers.',
    icon: 'Server',
    topics: [
      { id: 'bep-1', title: 'Python 3 Asyncio, Coroutines, Generators & Type Hints', completed: false, resources: 'Real Python' },
      { id: 'bep-2', title: 'FastAPI Dependency Injection, Path Operations & Swagger Docs', completed: false, resources: 'FastAPI Official' },
      { id: 'bep-3', title: 'SQLAlchemy 2.0 Async ORM & Alembic Database Migrations', completed: false, resources: 'SQLAlchemy Docs' },
      { id: 'bep-4', title: 'Background Tasks with Celery & Redis Message Broker', completed: false, resources: 'Celery Distributed Jobs' }
    ]
  },

  // 3. FULL-STACK SDE (2 Roadmaps)
  {
    id: 'fs-mern',
    categoryGroup: 'Full Stack',
    category: 'MERN Stack Production Track',
    description: 'Complete end-to-end web engineering covering MongoDB, Express, React, and Node.js with automated deployment.',
    icon: 'Layers',
    topics: [
      { id: 'fsm-1', title: 'Monorepo Architecture (npm workspaces, Vite client + Express server)', completed: false, resources: 'FullStack Guide' },
      { id: 'fsm-2', title: 'RESTful API Contracts, Axios Interceptors & JWT State Sync', completed: false, resources: 'MERN Placement SDE' },
      { id: 'fsm-3', title: 'Real-time Features with WebSockets (Socket.io) & Redis Pub/Sub', completed: false, resources: 'Socket.io Production' },
      { id: 'fsm-4', title: 'Production Security: Helmet, CORS, Rate Limiting & Input Sanitization', completed: false, resources: 'OWASP Web Security' },
      { id: 'fsm-5', title: 'Cloud CI/CD: Dockerize client & server, deploy on Vercel + Render', completed: false, resources: 'Deployment Handbook' }
    ]
  },
  {
    id: 'fs-postgres',
    categoryGroup: 'Full Stack',
    category: 'Next.js + PostgreSQL + Prisma Stack',
    description: 'Modern type-safe full-stack engineering with relational databases, server actions, and cloud infrastructure.',
    icon: 'Layers',
    topics: [
      { id: 'fsp-1', title: 'Next.js App Router Full-Stack Architecture with Tailwind CSS', completed: false, resources: 'Next.js FullStack' },
      { id: 'fsp-2', title: 'PostgreSQL Relational Schema Design & Prisma Client', completed: false, resources: 'Prisma Relational' },
      { id: 'fsp-3', title: 'NextAuth.js v5 / Auth.js (OAuth, Credentials, Session Strategy)', completed: false, resources: 'Auth.js Docs' },
      { id: 'fsp-4', title: 'Stripe Payment Gateway Integration & Webhook Handling', completed: false, resources: 'Stripe API Guide' }
    ]
  },

  // 4. DSA & ALGORITHMS (2 Roadmaps)
  {
    id: 'dsa-foundation',
    categoryGroup: 'DSA & Algorithms',
    category: 'Data Structures Foundation',
    description: 'Master core linear & hierarchical data structures with rigorous Time/Space complexity analysis.',
    icon: 'Code2',
    topics: [
      { id: 'dsaf-1', title: 'Arrays, Strings & Two Pointer Algorithms', completed: false, resources: 'LeetCode Explore' },
      { id: 'dsaf-2', title: 'Singly & Doubly Linked Lists, Fast/Slow Pointer Traversal', completed: false, resources: 'Striver SDE Sheet' },
      { id: 'dsaf-3', title: 'Stacks, Queues, Deque & Monotonic Stack Patterns', completed: false, resources: 'NeetCode 150' },
      { id: 'dsaf-4', title: 'Binary Trees, BSTs & Level-Order Traversal (BFS/DFS)', completed: false, resources: 'Tree Masterclass' },
      { id: 'dsaf-5', title: 'Hash Tables, Collision Resolution & Rolling Hash', completed: false, resources: 'Algorithmic Essentials' }
    ]
  },
  {
    id: 'dsa-advanced',
    categoryGroup: 'DSA & Algorithms',
    category: 'Advanced Algorithms & DP Masterclass',
    description: 'Graph algorithms, 2D Dynamic Programming, Greedy approaches, and Bit Manipulation for Tier-1 coding rounds.',
    icon: 'Code2',
    topics: [
      { id: 'dsaa-1', title: 'Graphs: BFS/DFS, Cycle Detection, Topological Sort (Kahn’s)', completed: false, resources: 'Graph Algorithms' },
      { id: 'dsaa-2', title: 'Shortest Path Algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall)', completed: false, resources: 'Advanced Graphs' },
      { id: 'dsaa-3', title: 'Dynamic Programming: 1D, 2D Grid, 0/1 Knapsack, LIS & LCS', completed: false, resources: 'DP for Placements' },
      { id: 'dsaa-4', title: 'Disjoint Set Union (DSU / Union-Find) & Kruskal’s MST', completed: false, resources: 'Disjoint Sets' },
      { id: 'dsaa-5', title: 'Binary Search on Answer Space & Monotonic Predicates', completed: false, resources: 'Binary Search Patterns' }
    ]
  },

  // 5. SYSTEM DESIGN & ARCHITECTURE (2 Roadmaps)
  {
    id: 'sys-lld',
    categoryGroup: 'System Design',
    category: 'Low-Level Design & Clean Architecture (LLD)',
    description: 'Object-Oriented Design, SOLID principles, Gang of Four Design Patterns, and Machine Coding.',
    icon: 'GitBranch',
    topics: [
      { id: 'sl-1', title: 'SOLID Design Principles with real refactoring examples', completed: false, resources: 'Clean Code' },
      { id: 'sl-2', title: 'Creational Patterns: Singleton, Factory, Abstract Factory, Builder', completed: false, resources: 'Refactoring Guru' },
      { id: 'sl-3', title: 'Structural & Behavioral Patterns: Strategy, Observer, Decorator, Adapter', completed: false, resources: 'Design Patterns GoF' },
      { id: 'sl-4', title: 'Machine Coding: Design Parking Lot & Elevators System', completed: false, resources: 'LLD Machine Coding' },
      { id: 'sl-5', title: 'Machine Coding: Design In-Memory Cache (LRU/LFU)', completed: false, resources: 'LRU Cache Design' }
    ]
  },
  {
    id: 'sys-hld',
    categoryGroup: 'System Design',
    category: 'High-Level Distributed Systems (HLD)',
    description: 'Scalability, Load Balancing, Database Sharding, Caching strategies, and CAP theorem for Tier-1 interviews.',
    icon: 'GitBranch',
    topics: [
      { id: 'sh-1', title: 'Vertical vs Horizontal Scaling, Load Balancers (Layer 4 vs Layer 7)', completed: false, resources: 'ByteByteGo' },
      { id: 'sh-2', title: 'Database Sharding, Master-Slave Replication & CAP / PACELC Theorem', completed: false, resources: 'System Design Primer' },
      { id: 'sh-3', title: 'Distributed Caching (Redis, Memcached, Cache-Aside, Write-Back)', completed: false, resources: 'Caching at Scale' },
      { id: 'sh-4', title: 'Message Queues (Kafka / RabbitMQ) & Event-Driven Architecture', completed: false, resources: 'Enterprise Queues' },
      { id: 'sh-5', title: 'Architectural Blueprint: Design URL Shortener (TinyURL) & Rate Limiter', completed: false, resources: 'HLD Case Studies' }
    ]
  },

  // 6. CORE CS FUNDAMENTALS (2 Roadmaps)
  {
    id: 'cs-os-dbms',
    categoryGroup: 'Core CS',
    category: 'Operating Systems & DBMS Fundamentals',
    description: 'Mandatory computer science subjects tested in every software engineering placement interview.',
    icon: 'BookOpen',
    topics: [
      { id: 'cod-1', title: 'OS: Processes vs Threads, CPU Scheduling & Context Switching', completed: false, resources: 'Silberschatz OS' },
      { id: 'cod-2', title: 'OS: Deadlocks (4 Coffman conditions), Mutex, Semaphores & Paging', completed: false, resources: 'OS Concurrency' },
      { id: 'cod-3', title: 'DBMS: Relational Schema, SQL Joins & Normalization (1NF - BCNF)', completed: false, resources: 'Database Concepts' },
      { id: 'cod-4', title: 'DBMS: ACID Properties, Transaction Isolation Levels & B+ Tree Indexes', completed: false, resources: 'Transaction Internals' }
    ]
  },
  {
    id: 'cs-networks',
    categoryGroup: 'Core CS',
    category: 'Computer Networks & Web Protocols',
    description: 'OSI & TCP/IP models, HTTP/HTTPS lifecycle, DNS, SSL/TLS, and WebSocket protocols.',
    icon: 'BookOpen',
    topics: [
      { id: 'cn-1', title: 'OSI 7 Layers vs TCP/IP Stack & Packet Encapsulation', completed: false, resources: 'Forouzan Networking' },
      { id: 'cn-2', title: 'TCP 3-Way Handshake, Flow Control, Congestion Control vs UDP', completed: false, resources: 'TCP/IP Illustrated' },
      { id: 'cn-3', title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC) & RESTful Semantics', completed: false, resources: 'High Performance Browser' },
      { id: 'cn-4', title: 'DNS Resolution Lifecycle & SSL/TLS Cryptographic Handshake', completed: false, resources: 'Web Security Protocols' }
    ]
  },

  // 7. DEVOPS & CLOUD ARCHITECTURE (2 Roadmaps)
  {
    id: 'do-docker-k8s',
    categoryGroup: 'DevOps',
    category: 'Docker & Kubernetes Orchestration',
    description: 'Container packaging, multi-stage Dockerfiles, Kubernetes pods, deployments, and cluster networking.',
    icon: 'Cpu',
    topics: [
      { id: 'ddk-1', title: 'Docker Architecture, Container Isolation, Images & Multi-stage Builds', completed: false, resources: 'Docker Handbook' },
      { id: 'ddk-2', title: 'Docker Compose for Multi-container Development Environments', completed: false, resources: 'Docker Compose Guide' },
      { id: 'ddk-3', title: 'Kubernetes Core: Pods, Services (ClusterIP/NodePort), Deployments', completed: false, resources: 'Kubernetes Official' },
      { id: 'ddk-4', title: 'ConfigMaps, Secrets, Ingress Controllers & Persistent Volumes', completed: false, resources: 'K8s in Action' }
    ]
  },
  {
    id: 'do-cicd-cloud',
    categoryGroup: 'DevOps',
    category: 'CI/CD Pipelines & AWS Cloud Deployment',
    description: 'Automated test & release pipelines with GitHub Actions, AWS EC2, S3, RDS, and serverless hosting.',
    icon: 'Cpu',
    topics: [
      { id: 'dcc-1', title: 'Git Workflows: Branching Strategies, Pull Requests & Rebase Workflows', completed: false, resources: 'Pro Git' },
      { id: 'dcc-2', title: 'GitHub Actions: CI Workflows, Automated Testing & Docker Image Publish', completed: false, resources: 'GitHub Actions Docs' },
      { id: 'dcc-3', title: 'AWS Core Services: EC2 Instances, S3 Storage, RDS Databases & IAM', completed: false, resources: 'AWS SDE Fundamentals' },
      { id: 'dcc-4', title: 'Serverless Functions (AWS Lambda) & CDN Distribution (CloudFront)', completed: false, resources: 'Serverless Architecture' }
    ]
  }
];

export const defaultProjects = [
  {
    id: 'proj-1',
    title: 'NextOffer - Placement Preparation Platform',
    description: 'A comprehensive full-stack placement command center with DSA tracking, roadmap enrollment, revision scheduling, and performance telemetry.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Hardik-Bhochiya/nextoffer',
    liveUrl: 'https://nextoffer.dev',
    status: 'In Progress',
    milestones: [
      { title: 'Setup MERN project architecture & authentication', completed: true },
      { title: 'Implement DSA Tracker & Topic Filters', completed: true },
      { title: 'Integrate Roadmap tracks with per-user progress', completed: true },
      { title: 'Deploy on Vercel & Render', completed: false }
    ]
  },
  {
    id: 'proj-2',
    title: 'DevCollab - Real-Time Code Collaboration',
    description: 'Browser-based code editor supporting real-time syntax highlighting, multiple cursor tracking, and WebRTC audio chat.',
    techStack: ['React', 'Socket.io', 'Monaco Editor', 'Node.js', 'WebRTC'],
    githubUrl: 'https://github.com/Hardik-Bhochiya/devcollab',
    liveUrl: 'https://devcollab-live.vercel.app',
    status: 'Completed',
    milestones: [
      { title: 'Monaco Editor setup with multi-language syntax', completed: true },
      { title: 'Socket.io OT algorithm for cursor sync', completed: true },
      { title: 'PeerJS WebRTC voice rooms', completed: true }
    ]
  }
];

export const defaultNotes = [
  {
    id: 'note-1',
    title: 'Core Java & OOPs 4 Pillars Cheatsheet',
    tags: ['OOPs', 'Java', 'InterviewPrep'],
    content: `# Object Oriented Programming (OOP) Pillars
1. Encapsulation: Bundling data and methods that operate on that data within a single unit (class).
2. Abstraction: Hiding implementation details and showing only functionality to the user.
3. Inheritance: Mechanism where a new class inherits properties from an existing class.
4. Polymorphism: Ability of a message or method to be displayed in more than one form (Overloading & Overriding).`
  },
  {
    id: 'note-2',
    title: 'DBMS ACID Properties & Normalization',
    tags: ['DBMS', 'SQL', 'Database'],
    content: `# ACID Properties in DBMS
- **Atomicity**: Entire transaction completes or none of it takes effect.
- **Consistency**: Database must remain in a consistent state before and after the transaction.
- **Isolation**: Concurrent transactions execute independently without interference.
- **Durability**: Changes made by committed transactions are permanently stored.`
  },
  {
    id: 'note-3',
    title: 'Operating Systems - Deadlocks & Memory Management',
    tags: ['OS', 'Concurrency', 'InterviewPrep'],
    content: `# Deadlock 4 Coffman Conditions
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait

# Virtual Memory
Paging solves external fragmentation by dividing physical memory into fixed-size frames and virtual memory into pages.`
  }
];
