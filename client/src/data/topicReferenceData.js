// Rich conceptual interview notes, key questions, and official documentation links for Roadmap milestones
export const topicReferenceData = {
  default: {
    overview: 'Key engineering concept required for high-performing technical interviews and production applications.',
    interviewQuestions: [
      'Explain the fundamental architecture and lifecycle of this technology.',
      'What are the primary performance bottlenecks and how do you optimize them?',
      'Discuss common failure modes and edge cases encountered in production.'
    ],
    docLinks: [
      { label: 'Official Documentation', url: 'https://devdocs.io', tag: 'Docs' },
      { label: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', tag: 'Reference' }
    ]
  },
  'html & css modern semantic layouts': {
    overview: 'Semantic HTML5 structures paired with modern CSS Flexbox, Grid, container queries, and accessibility (a11y) standards.',
    interviewQuestions: [
      'What is the difference between block, inline, and inline-block display modes?',
      'How does the CSS Box Model calculate element width with box-sizing: border-box?',
      'Explain CSS specificity calculation and cascade layering (@layer).'
    ],
    docLinks: [
      { label: 'MDN CSS Layout Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout', tag: 'MDN' },
      { label: 'Web.dev Accessibility Guide', url: 'https://web.dev/learn/accessibility', tag: 'Google' }
    ]
  },
  'javascript es6+, closures, event loop': {
    overview: 'Asynchronous JavaScript execution engine, call stack, microtask queue (Promises), macrotask queue, and lexical closures.',
    interviewQuestions: [
      'Explain how the JavaScript Event Loop prioritizes microtasks over macrotasks.',
      'How do closures retain memory references, and how can they cause memory leaks?',
      'What is the difference between prototypical inheritance and ES6 classes?'
    ],
    docLinks: [
      { label: 'MDN Event Loop Deep Dive', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop', tag: 'MDN' },
      { label: 'JavaScript.info Core Engine', url: 'https://javascript.info', tag: 'Reference' }
    ]
  },
  'react hooks, virtual dom, state management': {
    overview: 'React 18 Fiber reconciliation architecture, synthetic events, batching, custom hooks, and state immutability patterns.',
    interviewQuestions: [
      'How does React Fiber break down rendering work into incremental units?',
      'What causes infinite re-render loops in useEffect and how do dependencies prevent it?',
      'Compare Context API + useReducer vs Zustand/Redux Toolkit for enterprise state.'
    ],
    docLinks: [
      { label: 'Official React 18 Docs', url: 'https://react.dev', tag: 'React' },
      { label: 'React Fiber Architecture', url: 'https://github.com/acdlite/react-fiber-architecture', tag: 'GitHub' }
    ]
  },
  'node.js runtime, event loop, streams': {
    overview: 'Node.js libuv thread pool, non-blocking I/O, backpressure in streams, Buffers, and cluster multi-processing.',
    interviewQuestions: [
      'How does libuv execute file system operations asynchronously on Windows and Linux?',
      'What is stream backpressure and how do pipe() and readable streams handle it?',
      'When should you use worker_threads vs cluster module in high-throughput services?'
    ],
    docLinks: [
      { label: 'Node.js Official Documentation', url: 'https://nodejs.org/en/docs', tag: 'Node.js' },
      { label: 'Libuv Architecture Docs', url: 'https://docs.libuv.org', tag: 'C/Libuv' }
    ]
  },
  'rest api design, auth (jwt/oauth), middleware': {
    overview: 'Stateless REST architectural constraints, idempotency, rate limiting, JWT token rotation, and OAuth 2.0 PKCE flow.',
    interviewQuestions: [
      'Which HTTP methods are idempotent (GET, PUT, DELETE) and which are not (POST)?',
      'How do you prevent XSS and CSRF when storing JWT tokens in cookies vs local storage?',
      'Design a rate limiter middleware using Redis token-bucket algorithm.'
    ],
    docLinks: [
      { label: 'RESTful API Guidelines', url: 'https://github.com/zalando/restful-api-guidelines', tag: 'Best Practices' },
      { label: 'OAuth 2.0 Framework RFC', url: 'https://oauth.net/2/', tag: 'RFC' }
    ]
  },
  'relational (postgresql) & nosql (mongodb)': {
    overview: 'Relational ACID transactions vs NoSQL BASE consistency, B-Tree vs LSM-Tree indexes, indexing strategies, and sharding.',
    interviewQuestions: [
      'Explain B-Tree indexing and how composite indexes require leftmost prefix match.',
      'What are the 4 ACID properties and how does write-ahead logging (WAL) ensure durability?',
      'When would you choose MongoDB document embedding over normalized PostgreSQL tables?'
    ],
    docLinks: [
      { label: 'PostgreSQL Manual & Indexing', url: 'https://www.postgresql.org/docs', tag: 'PostgreSQL' },
      { label: 'MongoDB Architecture Guide', url: 'https://www.mongodb.com/docs', tag: 'MongoDB' }
    ]
  },
  'horizontal scaling, load balancing, caching (redis)': {
    overview: 'Distributed systems scalability, consistent hashing, cache-aside vs write-through patterns, and CDN edge caching.',
    interviewQuestions: [
      'How does consistent hashing prevent massive cache misses when scaling web servers?',
      'Explain the Cache Stampede / Thundering Herd problem and how mutex locks resolve it.',
      'Compare L4 (TCP/UDP) vs L7 (HTTP/gRPC) load balancing algorithms.'
    ],
    docLinks: [
      { label: 'System Design Primer Scalability', url: 'https://github.com/donnemartin/system-design-primer', tag: 'GitHub' },
      { label: 'Redis Enterprise Caching Patterns', url: 'https://redis.io/docs', tag: 'Redis' }
    ]
  },
  'docker containerization & ci/cd pipelines': {
    overview: 'Container namespaces and cgroups, multi-stage Docker builds, GitHub Actions CI/CD workflows, and automated rollouts.',
    interviewQuestions: [
      'How do Linux cgroups and namespaces enforce container isolation from host processes?',
      'Why are multi-stage Dockerfiles essential for slimming production production image size?',
      'Design a zero-downtime blue-green deployment workflow using GitHub Actions.'
    ],
    docLinks: [
      { label: 'Docker Documentation & Best Practices', url: 'https://docs.docker.com', tag: 'Docker' },
      { label: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', tag: 'GitHub' }
    ]
  }
};

export const getTopicReference = (topicTitle) => {
  if (!topicTitle) return topicReferenceData.default;
  const key = Object.keys(topicReferenceData).find(k =>
    topicTitle.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(topicTitle.toLowerCase())
  );
  return topicReferenceData[key] || topicReferenceData.default;
};
