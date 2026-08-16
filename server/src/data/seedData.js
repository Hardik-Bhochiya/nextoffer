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
  // Sliding Window
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
    title: 'Minimum Window Substring',
    topic: 'Sliding Window',
    difficulty: 'Hard',
    url: 'https://leetcode.com/problems/minimum-window-substring/',
    status: 'Unsolved',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    notes: 'Expand right pointer until valid, shrink left pointer to find minimum.',
    revisionsCount: 0,
    lastRevised: null
  },
  // Linked List
  {
    id: 'dsa-10',
    title: 'Reverse Linked List',
    topic: 'Linked List',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/reverse-linked-list/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Iterative with prev, curr, next pointers or recursion.',
    revisionsCount: 3,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-11',
    title: 'Merge Two Sorted Lists',
    topic: 'Linked List',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    status: 'Solved',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    notes: 'Dummy head node and two pointers advancing through both lists.',
    revisionsCount: 1,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-12',
    title: 'Linked List Cycle',
    topic: 'Linked List',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/linked-list-cycle/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Floyd’s Tortoise and Hare (slow & fast pointer).',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-13',
    title: 'LRU Cache',
    topic: 'Linked List',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/lru-cache/',
    status: 'Needs Revision',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(capacity)',
    notes: 'Doubly Linked List + Hash Map for O(1) get and put.',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  // Trees & BST
  {
    id: 'dsa-14',
    title: 'Maximum Depth of Binary Tree',
    topic: 'Trees',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    notes: 'DFS recursion: 1 + max(depth(left), depth(right)).',
    revisionsCount: 1,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-15',
    title: 'Validate Binary Search Tree',
    topic: 'Trees',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/validate-binary-search-tree/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    notes: 'Inorder traversal check or pass valid min/max ranges down recursion.',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-16',
    title: 'Lowest Common Ancestor of a BST',
    topic: 'Trees',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    status: 'Solved',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)',
    notes: 'If both p and q are greater than root, go right. If both smaller, go left. Else root is LCA.',
    revisionsCount: 1,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-17',
    title: 'Binary Tree Level Order Traversal',
    topic: 'Trees',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    notes: 'BFS with a queue, processing all elements at the current queue level.',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  // Graphs
  {
    id: 'dsa-18',
    title: 'Number of Islands',
    topic: 'Graphs',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/number-of-islands/',
    status: 'Solved',
    timeComplexity: 'O(r * c)',
    spaceComplexity: 'O(r * c)',
    notes: 'DFS / BFS flood fill on grid when visiting land cell "1", sink to "0".',
    revisionsCount: 3,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-19',
    title: 'Clone Graph',
    topic: 'Graphs',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/clone-graph/',
    status: 'Attempted',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    notes: 'DFS with Hash Map mapping old node -> new cloned node.',
    revisionsCount: 1,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-20',
    title: 'Course Schedule (Cycle Detection)',
    topic: 'Graphs',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/course-schedule/',
    status: 'Needs Revision',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    notes: 'Topological Sort (Kahn’s In-degree BFS) or DFS with 3-state coloring (unvisited, visiting, visited).',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  // Dynamic Programming
  {
    id: 'dsa-21',
    title: 'Climbing Stairs',
    topic: 'Dynamic Programming',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/climbing-stairs/',
    status: 'Solved',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    notes: 'Fibonacci sequence: dp[i] = dp[i-1] + dp[i-2].',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-22',
    title: 'Coin Change',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/coin-change/',
    status: 'Solved',
    timeComplexity: 'O(amount * coins)',
    spaceComplexity: 'O(amount)',
    notes: 'Bottom-up 1D DP array initialized to Infinity; dp[a] = min(dp[a], 1 + dp[a - c]).',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-23',
    title: 'Longest Increasing Subsequence (LIS)',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    status: 'Needs Revision',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    notes: 'Binary search with patience sorting or O(n^2) DP.',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  },
  {
    id: 'dsa-24',
    title: '0/1 Knapsack Problem',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    url: 'https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0927/1',
    status: 'Solved',
    timeComplexity: 'O(N * W)',
    spaceComplexity: 'O(W)',
    notes: 'Standard choice diagram: include item if weight permits vs exclude item.',
    revisionsCount: 2,
    lastRevised: new Date().toISOString()
  }
];

export const defaultRoadmaps = [
  {
    id: 'frontend',
    category: 'Frontend Development',
    description: 'Master modern frontend development from HTML/CSS to advanced React patterns.',
    icon: 'Layout',
    topics: [
      { id: 'fe-1', title: 'HTML5 Semantic & SEO Tags', completed: true, resources: 'MDN Web Docs' },
      { id: 'fe-2', title: 'Modern CSS (Flexbox, Grid, Responsive Design)', completed: true, resources: 'CSS-Tricks' },
      { id: 'fe-3', title: 'JavaScript ES6+ (Async/Await, Promises, Closures, Event Loop)', completed: true, resources: 'javascript.info' },
      { id: 'fe-4', title: 'React Core (Hooks, Props, State, Component Lifecycle)', completed: true, resources: 'react.dev' },
      { id: 'fe-5', title: 'State Management (Redux Toolkit / Zustand / Context API)', completed: true, resources: 'Redux Essentials' },
      { id: 'fe-6', title: 'Routing & Navigation (React Router DOM v6)', completed: true, resources: 'React Router Docs' },
      { id: 'fe-7', title: 'API Integration, Axios Interceptors & React Query', completed: false, resources: 'TanStack Query' },
      { id: 'fe-8', title: 'Performance Optimization (LCP, INP, Memoization, Code Splitting)', completed: false, resources: 'web.dev CWV' }
    ]
  },
  {
    id: 'backend',
    category: 'Backend Development',
    description: 'Build scalable APIs, secure authentication, and microservices.',
    icon: 'Server',
    topics: [
      { id: 'be-1', title: 'Node.js Runtime & Event Loop Architecture', completed: true, resources: 'Node.js Docs' },
      { id: 'be-2', title: 'Express.js Routing, Middleware & Error Handling', completed: true, resources: 'Express.js Guide' },
      { id: 'be-3', title: 'RESTful API Design Best Practices & Status Codes', completed: true, resources: 'RESTful API Guidelines' },
      { id: 'be-4', title: 'Authentication & Security (JWT, bcrypt, CORS, Rate Limiting)', completed: true, resources: 'OWASP Top 10' },
      { id: 'be-5', title: 'Database ORM/ODM (Mongoose, Prisma)', completed: true, resources: 'Mongoose Docs' },
      { id: 'be-6', title: 'File Uploads & Media Storage (Multer, Cloudinary, AWS S3)', completed: false, resources: 'Cloudinary API' },
      { id: 'be-7', title: 'WebSockets & Real-Time Communication (Socket.io)', completed: false, resources: 'Socket.io Guide' },
      { id: 'be-8', title: 'Caching with Redis & Message Queues (BullMQ / RabbitMQ)', completed: false, resources: 'Redis University' }
    ]
  },
  {
    id: 'database',
    category: 'Database & System Design',
    description: 'Relational vs NoSQL, Indexing, Schema Design, and High-Level System Architecture.',
    icon: 'Database',
    topics: [
      { id: 'db-1', title: 'Relational Databases (PostgreSQL / MySQL) & Normalization', completed: true, resources: 'Postgres Guide' },
      { id: 'db-2', title: 'NoSQL Databases (MongoDB) & Document Modeling', completed: true, resources: 'MongoDB University' },
      { id: 'db-3', title: 'Indexing, Query Optimization & Aggregation Pipelines', completed: true, resources: 'Database Indexing Explained' },
      { id: 'db-4', title: 'ACID Properties vs BASE & CAP Theorem', completed: true, resources: 'System Design Primer' },
      { id: 'db-5', title: 'Load Balancing, Horizontal Scaling & CDN Caching', completed: false, resources: 'ByteByteGo' },
      { id: 'db-6', title: 'Database Sharding, Replication & Master-Slave Setup', completed: false, resources: 'High Scalability' }
    ]
  },
  {
    id: 'devops',
    category: 'DevOps & Deployment',
    description: 'Containerization, CI/CD pipelines, and cloud hosting.',
    icon: 'Cpu',
    topics: [
      { id: 'do-1', title: 'Git & GitHub Workflow (Branching, PRs, Merge Conflicts)', completed: true, resources: 'Pro Git' },
      { id: 'do-2', title: 'Docker Basics (Dockerfile, Images, Docker Compose)', completed: true, resources: 'Docker Handbook' },
      { id: 'do-3', title: 'CI/CD Automation with GitHub Actions', completed: false, resources: 'GitHub Docs' },
      { id: 'do-4', title: 'Cloud Deployments (Vercel, Render, AWS EC2 / S3)', completed: false, resources: 'Vercel Deployment Guide' }
    ]
  }
];

export const defaultProjects = [
  {
    id: 'proj-1',
    title: 'NextOffer - AI Placement Platform',
    description: 'A centralized AI-assisted placement preparation hub with DSA tracker, roadmaps, revision planner, and AI mentor.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Gemini AI'],
    githubUrl: 'https://github.com/Hardik-Bhochiya/nextoffer',
    liveUrl: 'https://nextoffer.dev',
    status: 'In Progress',
    milestones: [
      { title: 'Setup MERN project architecture & authentication', completed: true },
      { title: 'Implement DSA Tracker & Topic Filters', completed: true },
      { title: 'Integrate AI Mentor & Weakness Analyzer', completed: true },
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

### 1. Encapsulation
- Bundling data (variables) and methods operating on that data within a single unit.
- Access specifiers: \`private\`, \`protected\`, \`public\`.
- Getter and setter methods protect internal state.

### 2. Abstraction
- Hiding internal implementation details and showing only relevant functionality to users.
- Implemented via \`abstract class\` and \`interfaces\`.

### 3. Inheritance
- Mechanism where one class acquires properties and behaviors of a parent class.
- Promotes code reusability (\`extends\` / \`implements\`).

### 4. Polymorphism
- Ability of a message or method to be displayed in more than one form.
- **Compile-time**: Method Overloading (same name, different signature).
- **Run-time**: Method Overriding (\`@Override\` in child class with dynamic dispatch).`,
    pinned: true,
    isFavorite: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'note-2',
    title: 'DBMS ACID Properties & Normalization Quick Reference',
    tags: ['DBMS', 'SQL', 'PlacementCore'],
    content: `# DBMS Placement Quick Notes

## ACID Properties
- **Atomicity**: Entire transaction succeeds or completely rolls back ("All or Nothing").
- **Consistency**: Database transitions from one valid state to another, upholding all constraints.
- **Isolation**: Concurrent transactions execute as if they were running sequentially.
- **Durability**: Once committed, changes survive even in case of power failure or crash.

## Normal Forms Summary
- **1NF**: Atomic values in each column; no repeating groups.
- **2NF**: In 1NF + No Partial Dependency (every non-key attribute fully dependent on primary key).
- **3NF**: In 2NF + No Transitive Dependency (non-key attribute dependent on another non-key attribute).
- **BCNF**: Every functional dependency \(X \rightarrow Y\) requires \(X\) to be a Super Key.`,
    pinned: true,
    isFavorite: false,
    updatedAt: new Date().toISOString()
  }
];

export const defaultRevisions = [
  {
    id: 'rev-1',
    topic: 'LRU Cache implementation using Doubly Linked List & HashMap',
    category: 'DSA',
    priority: 'High',
    scheduledDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    notes: 'Remember node removal from tail and insertion to head on access.'
  },
  {
    id: 'rev-2',
    topic: 'Course Schedule - Topological Sort (Kahn’s Algorithm)',
    category: 'DSA',
    priority: 'High',
    scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    completed: false,
    notes: 'Compute in-degrees, push zero in-degrees into BFS queue.'
  },
  {
    id: 'rev-3',
    topic: 'Operating Systems: Deadlock Conditions & Bankers Algorithm',
    category: 'Core Subjects',
    priority: 'Medium',
    scheduledDate: new Date().toISOString().split('T')[0],
    completed: false,
    notes: 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.'
  }
];
