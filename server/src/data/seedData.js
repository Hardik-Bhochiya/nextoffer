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

// Software Developer Curated Roadmaps & 4 Core CS Fundamentals
export { defaultRoadmaps } from './roadmapsData.js';

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
    topic: 'OOPs',
    tags: ['OOPs'],
    importance: 'High',
    content: `# Object Oriented Programming (OOP) Pillars
1. **Encapsulation**: Bundling data and methods that operate on that data within a single unit (class).
2. **Abstraction**: Hiding implementation details and showing only essential functionality to the user.
3. **Inheritance**: Mechanism where a new class inherits properties and behaviors from an existing class.
4. **Polymorphism**: Ability of a method or message to be displayed in multiple forms (Compile-time Overloading & Runtime Overriding).`
  },
  {
    id: 'note-2',
    title: 'DBMS ACID Properties & Normalization',
    topic: 'DBMS',
    tags: ['DBMS'],
    importance: 'High',
    content: `# ACID Properties in DBMS
- **Atomicity**: Entire transaction completes or none of it takes effect.
- **Consistency**: Database must remain in a valid consistent state.
- **Isolation**: Concurrent transactions execute independently without interference.
- **Durability**: Changes made by committed transactions are permanently stored.`
  },
  {
    id: 'note-3',
    title: 'Operating Systems - Deadlocks & Memory Management',
    topic: 'Operating Systems',
    tags: ['Operating Systems'],
    importance: 'High',
    content: `# Deadlock 4 Coffman Conditions
1. **Mutual Exclusion**: Non-shareable resource holding.
2. **Hold and Wait**: Process holding resource while requesting another.
3. **No Preemption**: Resources cannot be forcibly seized.
4. **Circular Wait**: Closed chain of processes each waiting for resource held by next.

## Virtual Memory
Paging eliminates external fragmentation by dividing physical memory into fixed-size frames.`
  },
  {
    id: 'note-4',
    title: 'Computer Networks - TCP vs UDP & OSI 7 Layer Model',
    topic: 'Computer Networks',
    tags: ['Computer Networks'],
    importance: 'High',
    content: `# Computer Networks - OSI Model & Transport Layer
## 1. The 7 OSI Layers
1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application.

## 2. TCP vs UDP
- **TCP**: 3-way handshake, connection-oriented, reliable, ordered.
- **UDP**: Connectionless, low latency, no handshake, best-effort delivery.`
  },
  {
    id: 'note-5',
    title: 'System Design - Horizontal vs Vertical Scaling & CAP Theorem',
    topic: 'System Design',
    tags: ['System Design'],
    importance: 'High',
    content: `# System Design Fundamentals
## 1. Scaling Strategies
- **Vertical**: Upgrading server hardware (CPU/RAM).
- **Horizontal**: Adding commodity server nodes behind a load balancer.

## 2. CAP Theorem
Guarantees at most 2 of 3: Consistency, Availability, Partition Tolerance.`
  },
  {
    id: 'note-6',
    title: 'DSA Interview - Two Pointers & Sliding Window Patterns',
    topic: 'DSA: Coding Interview',
    tags: ['DSA', 'Coding Interview'],
    importance: 'High',
    content: `# Core Algorithmic Patterns
## 1. Two Pointers Pattern
Used on sorted arrays or strings for search in O(n) time and O(1) space.

## 2. Sliding Window Pattern
Used for contiguous subarray problems (maximum sum subarray, longest substring).`
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
