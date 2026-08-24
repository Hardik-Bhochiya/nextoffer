export const companyArchivesData = [
  {
    id: 'comp-google',
    name: 'Google',
    badge: 'Tier-1 Tech',
    logoColor: 'text-rose-400 bg-rose-950/60 border-rose-800/50',
    hiringRounds: '4 Technical Rounds (2 DSA + 1 System Design + 1 Googleyness & Leadership)',
    interviewFocus: 'Optimal Time/Space Complexity, Scalable Architecture, Edge Case Analysis',
    questions: [
      { id: 'g-1', title: 'Snapshot Array (Binary Search & Hash Map)', topic: 'Arrays & Binary Search', difficulty: 'Medium', frequency: 'Very High', complexity: 'Time: O(log n), Space: O(n)' },
      { id: 'g-2', title: 'Word Ladder II (BFS & Backtracking)', topic: 'Graphs & BFS', difficulty: 'Hard', frequency: 'High', complexity: 'Time: O(V + E), Space: O(V)' },
      { id: 'g-3', title: 'Longest String Chain (DP & Hash Map)', topic: 'Dynamic Programming', difficulty: 'Medium', frequency: 'High', complexity: 'Time: O(n log n), Space: O(n)' },
      { id: 'g-4', title: 'Design Google Docs Collaborative Engine', topic: 'System Design', difficulty: 'Hard', frequency: 'High', complexity: 'Operational Transformation (OT) / CRDT' }
    ]
  },
  {
    id: 'comp-amazon',
    name: 'Amazon',
    badge: 'FAANG',
    logoColor: 'text-amber-400 bg-amber-950/60 border-amber-800/50',
    hiringRounds: '1 Online Assessment + 3 Technical Rounds (DSA + Low Level Design + LP Focus)',
    interviewFocus: '16 Leadership Principles (Customer Obsession, Ownership), Clean Code, Trees & Graphs',
    questions: [
      { id: 'amz-1', title: 'Reorganize String (Max Heap & Greedy)', topic: 'Heaps & Greedy', difficulty: 'Medium', frequency: 'Very High', complexity: 'Time: O(n log k), Space: O(k)' },
      { id: 'amz-2', title: 'Rotting Oranges (Multi-source BFS)', topic: 'Graphs & BFS', difficulty: 'Medium', frequency: 'Very High', complexity: 'Time: O(R * C), Space: O(R * C)' },
      { id: 'amz-3', title: 'Course Schedule II (Topological Sort)', topic: 'Graphs (Kahn’s Algo)', difficulty: 'Medium', frequency: 'High', complexity: 'Time: O(V + E), Space: O(V)' },
      { id: 'amz-4', title: 'Design Amazon Locker Delivery System', topic: 'Object Oriented Design (LLD)', difficulty: 'Medium', frequency: 'High', complexity: 'Design Patterns: Factory & Strategy' }
    ]
  },
  {
    id: 'comp-microsoft',
    name: 'Microsoft',
    badge: 'Tier-1 Tech',
    logoColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50',
    hiringRounds: '3-4 Technical Rounds (DSA + Core OOPs + DBMS/OS Fundamentals)',
    interviewFocus: 'Binary Trees, Linked Lists, Clean Code Refactoring, Concurrency & Deadlocks',
    questions: [
      { id: 'msft-1', title: 'Serialize and Deserialize Binary Tree', topic: 'Binary Trees', difficulty: 'Hard', frequency: 'Very High', complexity: 'Time: O(n), Space: O(n)' },
      { id: 'msft-2', title: 'LRU Cache Implementation', topic: 'Design & Doubly Linked List', difficulty: 'Medium', frequency: 'Very High', complexity: 'Time: O(1) Get/Put, Space: O(capacity)' },
      { id: 'msft-3', title: 'Letter Combinations of a Phone Number', topic: 'Backtracking', difficulty: 'Medium', frequency: 'High', complexity: 'Time: O(4^n), Space: O(n)' },
      { id: 'msft-4', title: 'Design Distributed File Storage (OneDrive)', topic: 'System Design', difficulty: 'Hard', frequency: 'High', complexity: 'Chunking, Deduplication & S3' }
    ]
  },
  {
    id: 'comp-uber',
    name: 'Uber',
    badge: 'High CTC Unicorn',
    logoColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/50',
    hiringRounds: '3 Technical Coding Rounds + 1 High Scale System Design',
    interviewFocus: 'High-Concurrency Systems, Geospatial Indexing (H3/QuadTree), Graph Routing',
    questions: [
      { id: 'ub-1', title: 'Design Ride Matching Dispatcher', topic: 'System Design & Geo-spatial', difficulty: 'Hard', frequency: 'Very High', complexity: 'QuadTree / Redis Geo / WebSocket' },
      { id: 'ub-2', title: 'Bus Routes (Shortest Path BFS)', topic: 'Graphs & BFS', difficulty: 'Hard', frequency: 'High', complexity: 'Time: O(N^2), Space: O(N^2)' },
      { id: 'ub-3', title: 'Evaluate Reverse Polish Notation', topic: 'Stacks', difficulty: 'Medium', frequency: 'High', complexity: 'Time: O(n), Space: O(n)' }
    ]
  },
  {
    id: 'comp-atlassian',
    name: 'Atlassian',
    badge: 'High CTC Product',
    logoColor: 'text-sky-400 bg-sky-950/60 border-sky-800/50',
    hiringRounds: 'Pair Programming Machine Coding (2 hrs) + Architecture & Values',
    interviewFocus: 'Production-ready clean code, unit testing, SOLID principles, Extensibility',
    questions: [
      { id: 'atl-1', title: 'Rate Limiting Middleware with Sliding Window', topic: 'Concurrency & Design', difficulty: 'Medium', frequency: 'Very High', complexity: 'Atomic Redis Lua Script' },
      { id: 'atl-2', title: 'Snake Game Design in Memory', topic: 'Data Structures & LLD', difficulty: 'Medium', frequency: 'High', complexity: 'Deque & Hash Set O(1)' },
      { id: 'atl-3', title: 'Find Median from Data Stream', topic: 'Two Heaps (Min/Max Heap)', difficulty: 'Hard', frequency: 'High', complexity: 'Time: O(log n), Space: O(n)' }
    ]
  }
];

export const getCompanyArchives = async (req, res) => {
  try {
    return res.json({ success: true, data: companyArchivesData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
