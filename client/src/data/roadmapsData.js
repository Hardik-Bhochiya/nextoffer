// Comprehensive Curated Engineering Learning Paths (23 Total Roadmaps)
// Includes 4 Universal Core CS Subjects (Common to All Roles) + Role-Specific Compulsory Roadmaps
// All external links point to verified, stable official documentation and trusted platforms.

export const defaultRoadmaps = [
  // ============================================================
  // 1. UNIVERSAL CORE CS FUNDAMENTALS (4 Essential Subjects for All Roles)
  // ============================================================
  {
    id: 'cs-os',
    categoryGroup: 'Core CS',
    category: 'Operating Systems & Concurrency',
    description: 'Processes, threads, CPU scheduling, synchronization, deadlocks, virtual memory, and Linux internals.',
    icon: 'BookOpen',
    isCoreCS: true,
    applicableRoles: [
      'Software Development Engineer (SDE / Core DSA)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Frontend Engineer (React / Next.js / UI Architecture)',
      'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)',
      'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
      'Software Development Engineer in Test (SDET / Automation)'
    ],
    topics: [
      {
        id: 'os-1',
        title: '1. OS Architecture, Dual-Mode (User/Kernel) & System Calls',
        completed: false,
        overview: 'Understand how the Operating System abstracts hardware, enforces memory protection via dual-mode CPU rings, and processes traps/system calls.',
        keyTakeaways: [
          'User Mode (Ring 3) restricts dangerous instructions; Kernel Mode (Ring 0) has raw hardware access',
          'System calls trigger software interrupts to transition from user mode to kernel mode',
          'Standard POSIX system calls: fork(), exec(), read(), write(), open(), close()'
        ],
        learningLinks: [
          { label: 'OSTEP - Virtualization & Syscalls', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', tag: 'Book' },
          { label: 'GeeksforGeeks - Operating Systems Hub', url: 'https://www.geeksforgeeks.org/operating-systems/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'What happens under the hood when a user program makes a read() system call?',
          'Why is dual-mode operation essential for operating system security and fault isolation?',
          'What is the difference between a software trap and a hardware interrupt?'
        ]
      },
      {
        id: 'os-2',
        title: '2. Processes, Threads, Context Switching & Fork Lifecycle',
        completed: false,
        overview: 'Process Control Blocks (PCB), process memory layout (Stack, Heap, Data, Text), lightweight threads, and context switch costs.',
        keyTakeaways: [
          'A Process has its own isolated virtual address space; Threads in the same process share heap, code, and global data',
          'Context switching saves CPU registers/program counter to PCB and flushes TLB cache (costly)',
          'fork() clones a process using Copy-On-Write (COW) optimization; execvp() replaces memory with new program binary'
        ],
        learningLinks: [
          { label: 'OSTEP - CPU Virtualization', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', tag: 'Book' },
          { label: 'GeeksforGeeks - Process vs Thread', url: 'https://www.geeksforgeeks.org/difference-between-process-and-thread/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'What data is shared between threads of the same process and what is private to each thread?',
          'Explain Copy-on-Write (COW) and how it makes fork() efficient in Linux.',
          'What overhead occurs during a CPU context switch between two processes?'
        ]
      },
      {
        id: 'os-3',
        title: '3. CPU Scheduling Algorithms & Multi-Level Feedback Queues',
        completed: false,
        overview: 'Preemptive vs non-preemptive CPU scheduling policies, turnaround time, waiting time, and starvation prevention.',
        keyTakeaways: [
          'FCFS (First Come First Serve) suffers from convoy effect; SJF (Shortest Job First) is optimal but requires knowing burst time',
          'Round Robin (RR) assigns fixed time quantum; quantum too small -> high context switch overhead, too large -> degrades to FCFS',
          'Multi-Level Feedback Queue (MLFQ) dynamically adjusts process priority based on I/O vs CPU-bound behavior'
        ],
        learningLinks: [
          { label: 'OSTEP - CPU Scheduling', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', tag: 'Book' },
          { label: 'GeeksforGeeks - CPU Scheduling Algorithms', url: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'How does Round Robin scheduling prevent process starvation?',
          'Explain how Multi-Level Feedback Queue (MLFQ) favors interactive I/O-bound jobs over long compute-bound jobs.',
          'What is the convoy effect and which scheduling algorithm causes it?'
        ]
      },
      {
        id: 'os-4',
        title: '4. Concurrency, Critical Section, Mutex Locks & Semaphores',
        completed: false,
        overview: 'Synchronization primitives, race conditions, atomic operations, binary vs counting semaphores, and classic concurrency problems.',
        keyTakeaways: [
          'Critical Section requires 3 conditions: Mutual Exclusion, Progress, and Bounded Waiting',
          'Mutex is a locking mechanism with ownership (only locker can unlock); Semaphore is a signaling mechanism',
          'Counting Semaphore manages access to a finite pool of N identical resources; Binary Semaphore acts as a flag'
        ],
        learningLinks: [
          { label: 'OSTEP - Concurrency & Locks', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', tag: 'Book' },
          { label: 'GeeksforGeeks - Mutex vs Semaphore', url: 'https://www.geeksforgeeks.org/mutex-vs-semaphore/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'What is a race condition and how do atomic test-and-set instructions prevent it?',
          'What is the fundamental difference between a Mutex and a Binary Semaphore?',
          'How do you solve the Producer-Consumer problem using counting semaphores and mutexes?'
        ]
      },
      {
        id: 'os-5',
        title: '5. Deadlocks: 4 Coffman Conditions & Banker’s Algorithm',
        completed: false,
        overview: 'Understand deadlock conditions, Resource Allocation Graphs (RAG), deadlock prevention, avoidance, and recovery strategies.',
        keyTakeaways: [
          '4 Coffman Conditions required for Deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
          'Breaking Circular Wait (e.g. strict lock acquisition hierarchy) is the most common prevention strategy',
          'Banker’s Algorithm verifies safe state before granting resource requests to avoid unsafe deadlocks'
        ],
        learningLinks: [
          { label: 'GeeksforGeeks - Operating Systems & Deadlocks', url: 'https://www.geeksforgeeks.org/operating-systems/', tag: 'Guide' },
          { label: 'OSTEP - Deadlock Theory', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', tag: 'Book' }
        ],
        interviewQuestions: [
          'Name and explain the 4 Coffman conditions necessary for a deadlock to occur.',
          'How can you prevent deadlocks by enforcing strict resource ordering in application code?',
          'What is the difference between deadlock prevention and deadlock avoidance (Banker’s algorithm)?'
        ]
      },
      {
        id: 'os-6',
        title: '6. Memory Management: Paging, Page Tables, TLB & Segmentation',
        completed: false,
        overview: 'Virtual memory address translation, page tables, multi-level paging, Translation Lookaside Buffer (TLB), and memory protection.',
        keyTakeaways: [
          'Virtual Address is split into Page Number (VPN) and Offset; MMU translates VPN to Physical Frame Number (PFN)',
          'TLB is a high-speed hardware cache for page table translations; TLB Hit eliminates memory lookup penalty',
          'Multi-level Page Tables reduce memory footprint of sparse process address spaces'
        ],
        learningLinks: [
          { label: 'OSTEP - Paging & Translation', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', tag: 'Book' },
          { label: 'GeeksforGeeks - Memory Management', url: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'How does the Memory Management Unit (MMU) translate a virtual address to a physical address?',
          'What is a TLB (Translation Lookaside Buffer) and why is TLB miss expensive?',
          'What is internal fragmentation in paging vs external fragmentation in segmentation?'
        ]
      },
      {
        id: 'os-7',
        title: '7. Virtual Memory, Demand Paging, Thrashing & Page Replacement',
        completed: false,
        overview: 'Page fault handling, swap space, thrashing detection, working set model, and replacement algorithms (LRU, FIFO, Clock).',
        keyTakeaways: [
          'Demand Paging loads pages into physical RAM only when referenced; unmapped page triggers Page Fault interrupt',
          'LRU (Least Recently Used) approximates optimal Belady replacement without future knowledge',
          'Thrashing occurs when processes spend more CPU time swapping pages in/out than executing instructions'
        ],
        learningLinks: [
          { label: 'OSTEP - Page Replacement', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', tag: 'Book' },
          { label: 'GeeksforGeeks - Virtual Memory & Page Replacement', url: 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'Walk through the step-by-step lifecycle of a Page Fault interrupt.',
          'What causes Thrashing in an operating system and how does the Working Set Model resolve it?',
          'Explain Belady’s Anomaly and which page replacement algorithms suffer from it.'
        ]
      },
      {
        id: 'os-8',
        title: '8. Linux File Systems: Inodes, File Descriptors & Core Shell CLI',
        completed: false,
        overview: 'Linux Virtual File System (VFS), Inode data structure, hard links vs soft links, file permissions, and process redirection.',
        keyTakeaways: [
          'Inode stores file metadata (size, permissions, timestamps, data block pointers), NOT the filename',
          'File Descriptors (0: stdin, 1: stdout, 2: stderr) map process table entries to system open file table',
          'Hard link points directly to the Inode (shares data blocks); Soft link points to path string'
        ],
        learningLinks: [
          { label: 'Linux Journey - File System & CLI', url: 'https://linuxjourney.com/', tag: 'Interactive' },
          { label: 'OSTEP - File Systems & Inodes', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', tag: 'Book' }
        ],
        interviewQuestions: [
          'What is an Inode in Linux and what information does it store?',
          'What happens to a file if you delete it with rm while another process still has an open file descriptor to it?',
          'Explain the difference between Hard Links and Soft (Symbolic) Links in Linux.'
        ]
      }
    ]
  },

  {
    id: 'cs-dbms',
    categoryGroup: 'Core CS',
    category: 'DBMS, SQL & Relational Architecture',
    description: 'Relational schema design, normalization (1NF-BCNF), indexing internals (B+ Trees), transactions, and ACID isolation.',
    icon: 'BookOpen',
    isCoreCS: true,
    applicableRoles: [
      'Software Development Engineer (SDE / Core DSA)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Frontend Engineer (React / Next.js / UI Architecture)',
      'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)',
      'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
      'Software Development Engineer in Test (SDET / Automation)'
    ],
    topics: [
      {
        id: 'dbms-1',
        title: '1. Relational Model, ER Diagrams & Schema Constraints',
        completed: false,
        overview: 'Entity-Relationship (ER) modeling, relational schemas, primary/foreign keys, cardinality, and referential integrity.',
        keyTakeaways: [
          'Entities represent tables; attributes represent columns; relations map cardinalities (1:1, 1:N, N:M)',
          'Candidate Key is a minimal superkey; Primary Key is chosen from candidate keys; Foreign Key enforces referential integrity',
          'ON DELETE CASCADE vs ON DELETE SET NULL vs ON DELETE RESTRICT behavior'
        ],
        learningLinks: [
          { label: 'PostgreSQL Tutorial - Relational Basics', url: 'https://www.postgresqltutorial.com/', tag: 'Tutorial' },
          { label: 'GeeksforGeeks - DBMS Hub', url: 'https://www.geeksforgeeks.org/dbms/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'What is the difference between a Super Key, Candidate Key, and Primary Key?',
          'How do you convert an N:M (Many-to-Many) relationship in an ER diagram into relational tables?',
          'Explain referential integrity and what happens during cascading deletes.'
        ]
      },
      {
        id: 'dbms-2',
        title: '2. SQL Joins, Aggregations & Group By Mastery',
        completed: false,
        overview: 'Master inner joins, outer joins, cross joins, self joins, HAVING filters, and multi-table aggregation queries.',
        keyTakeaways: [
          'INNER JOIN matches rows in both tables; LEFT JOIN preserves all rows from left table filling right with NULL',
          'WHERE filters rows BEFORE aggregation; HAVING filters grouped results AFTER aggregation',
          'Self Joins compare rows within the same table (e.g., employee manager hierarchy)'
        ],
        learningLinks: [
          { label: 'SQLBolt - Interactive SQL Lessons', url: 'https://sqlbolt.com/', tag: 'Interactive' },
          { label: 'PostgreSQL Tutorial - SQL Joins', url: 'https://www.postgresqltutorial.com/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'Explain the difference between WHERE clause and HAVING clause in SQL.',
          'Write a query to find the second highest salary in an Employee table without using LIMIT/OFFSET.',
          'What is a Cross Join (Cartesian Product) and when is it legitimately used?'
        ]
      },
      {
        id: 'dbms-3',
        title: '3. Advanced SQL: Subqueries, CTEs & Window Functions',
        completed: false,
        overview: 'Common Table Expressions (WITH clause), correlated subqueries, and window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD).',
        keyTakeaways: [
          'Window Functions perform calculations across row partitions without collapsing individual rows like GROUP BY does',
          'RANK() skips ranks after ties (1, 2, 2, 4); DENSE_RANK() does not skip ranks (1, 2, 2, 3)',
          'CTEs (Common Table Expressions) improve readability and enable recursive hierarchical queries'
        ],
        learningLinks: [
          { label: 'PostgreSQL Official - Window Functions', url: 'https://www.postgresql.org/docs/current/tutorial-window.html', tag: 'Official Docs' },
          { label: 'PostgreSQL Tutorial - CTEs', url: 'https://www.postgresqltutorial.com/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER() in SQL?',
          'How do LAG() and LEAD() window functions allow comparing data from adjacent rows?',
          'What is a correlated subquery and why can it be inefficient for large datasets?'
        ]
      },
      {
        id: 'dbms-4',
        title: '4. Database Normalization: 1NF, 2NF, 3NF & BCNF',
        completed: false,
        overview: 'Eliminate insertion, update, and deletion anomalies using Functional Dependencies and Normal Forms.',
        keyTakeaways: [
          '1NF: Atomic column values (no multi-valued attributes or repeating groups)',
          '2NF: 1NF + No Partial Dependency (every non-prime attribute depends on full candidate key)',
          '3NF: 2NF + No Transitive Dependency (non-prime attributes depend only on candidate keys)',
          'BCNF (Boyce-Codd): For every functional dependency X -> Y, X must be a superkey'
        ],
        learningLinks: [
          { label: 'PostgreSQL Tutorial - Database Design & Normalization', url: 'https://www.postgresqltutorial.com/', tag: 'Interactive' }
        ],
        interviewQuestions: [
          'What are insertion, deletion, and update anomalies in unnormalized databases?',
          'Explain the difference between 3NF and BCNF with a concrete example.',
          'When is intentional denormalization appropriate in high-throughput read systems?'
        ]
      },
      {
        id: 'dbms-5',
        title: '5. Indexing Internals: B+ Trees, Clustered vs Non-Clustered Indexes',
        completed: false,
        overview: 'Understand how B+ Tree data structures reduce disk I/O from O(N) to O(log N), composite indexes, and index selectivity.',
        keyTakeaways: [
          'B+ Tree stores all data pointers in leaf nodes (linked together for O(1) sequential range scans); internal nodes store routing keys',
          'Clustered Index determines the physical order of data on disk (only 1 per table); Non-Clustered Index creates a separate lookup tree',
          'Composite Index requires Leftmost Prefix Matching to be utilized by the query planner'
        ],
        learningLinks: [
          { label: 'Use The Index, Luke! - Database Indexing', url: 'https://use-the-index-luke.com/', tag: 'Guide' },
          { label: 'PostgreSQL - Index Types Docs', url: 'https://www.postgresql.org/docs/current/indexes-types.html', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Why do relational databases use B+ Trees for indexing instead of Binary Search Trees or Hash Tables?',
          'What is the difference between a Clustered Index and a Non-Clustered (Secondary) Index?',
          'Explain Leftmost Prefix Rule in composite indexes and why query order matters.'
        ]
      },
      {
        id: 'dbms-6',
        title: '6. Transactions & ACID Properties: Atomicity to Durability',
        completed: false,
        overview: 'Learn how database engines guarantee all-or-nothing execution, data integrity, and crash resilience.',
        keyTakeaways: [
          'Atomicity: All operations in transaction succeed or entire transaction is rolled back',
          'Consistency: Database transitions strictly from one valid state to another satisfying all schema constraints',
          'Isolation: Concurrent transactions execute without interfering with one another',
          'Durability: Committed data survives system crashes via Write-Ahead Logging (WAL)'
        ],
        learningLinks: [
          { label: 'PostgreSQL - Transaction Control', url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html', tag: 'Official Docs' },
          { label: 'GeeksforGeeks - ACID Properties', url: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'Define the 4 ACID properties in detail and give an example of how each is violated.',
          'How does the database Write-Ahead Log (WAL) ensure the Durability guarantee after power failure?',
          'What is the difference between a database transaction commit and a savepoint rollback?'
        ]
      },
      {
        id: 'dbms-7',
        title: '7. Concurrency Control, Read Phenomena & Isolation Levels',
        completed: false,
        overview: 'Dirty reads, non-repeatable reads, phantom reads, and SQL standard isolation levels (Read Uncommitted to Serializable).',
        keyTakeaways: [
          'Read Uncommitted allows Dirty Reads (reading uncommitted data of other transactions)',
          'Read Committed prevents Dirty Reads; allows Non-Repeatable Reads',
          'Repeatable Read prevents Non-Repeatable Reads via MVCC (Multi-Version Concurrency Control); allows Phantoms in some DBs',
          'Serializable provides strict sequential execution equivalence (highest isolation, highest lock contention)'
        ],
        learningLinks: [
          { label: 'PostgreSQL - Transaction Isolation', url: 'https://www.postgresql.org/docs/current/transaction-iso.html', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain Dirty Read, Non-Repeatable Read, and Phantom Read phenomena.',
          'How does Multi-Version Concurrency Control (MVCC) in PostgreSQL enable non-blocking reads during writes?',
          'What is the performance trade-off of using Serializable isolation level in production?'
        ]
      },
      {
        id: 'dbms-8',
        title: '8. Database Recovery, Write-Ahead Logging (WAL) & NoSQL Trade-offs',
        completed: false,
        overview: 'Log-based recovery, checkpointing, undo/redo logs, and architectural trade-offs between SQL vs NoSQL document stores.',
        keyTakeaways: [
          'WAL logs changes to disk sequentially before modifying actual table pages in memory buffers',
          'Checkpoints periodically flush dirty memory buffers to disk to bound crash recovery time',
          'Relational databases prioritize ACID consistency & complex joins; NoSQL databases prioritize horizontal partitioning & flexible schemas'
        ],
        learningLinks: [
          { label: 'System Design Primer - SQL vs NoSQL', url: 'https://github.com/donnemartin/system-design-primer', tag: 'GitHub' },
          { label: 'PostgreSQL - Write-Ahead Logging (WAL)', url: 'https://www.postgresql.org/docs/current/wal-intro.html', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does checkpointing shorten database recovery time following an unexpected crash?',
          'When would you choose a Document store (MongoDB) or Key-Value store (Redis) over a Relational database (PostgreSQL)?',
          'Explain the CAP Theorem and how PACELC theorem extends it for database latency trade-offs.'
        ]
      }
    ]
  },

  {
    id: 'cs-networks',
    categoryGroup: 'Core CS',
    category: 'Computer Networks & Web Protocols',
    description: 'OSI 7 layers, TCP/IP stack, TCP 3-way handshake, DNS, HTTP/1.1-HTTP/3, SSL/TLS, and WebSocket protocols.',
    icon: 'BookOpen',
    isCoreCS: true,
    applicableRoles: [
      'Software Development Engineer (SDE / Core DSA)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Frontend Engineer (React / Next.js / UI Architecture)',
      'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
      'Software Development Engineer in Test (SDET / Automation)'
    ],
    topics: [
      {
        id: 'cn-1',
        title: '1. OSI 7-Layer Reference Model vs TCP/IP Protocol Stack',
        completed: false,
        overview: 'Understand layered network abstractions, data encapsulation/decapsulation, PDU units, and device layer boundaries.',
        keyTakeaways: [
          'OSI 7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application',
          'TCP/IP 4 Layers: Network Interface, Internet, Transport, Application',
          'Data Encapsulation: Data -> Segment (Transport) -> Packet (Network) -> Frame (Data Link) -> Bits (Physical)'
        ],
        learningLinks: [
          { label: 'MDN - How the Internet Works', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work', tag: 'MDN' },
          { label: 'GeeksforGeeks - Computer Networks Hub', url: 'https://www.geeksforgeeks.org/computer-network-tutorials/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'Name all 7 layers of the OSI model and state the primary Protocol Data Unit (PDU) at each layer.',
          'At which OSI layer do Routers, Switches, and Hubs operate, and why?',
          'What is encapsulation and decapsulation as data travels down and up the network stack?'
        ]
      },
      {
        id: 'cn-2',
        title: '2. Network Layer: IPv4/IPv6, Subnetting (CIDR) & Routing Protocols',
        completed: false,
        overview: 'IP addressing, subnet masks, CIDR notation, private vs public IP ranges, NAT, and routing algorithms (OSPF, BGP).',
        keyTakeaways: [
          'IPv4 is 32-bit (4.3 billion addresses); IPv6 is 128-bit hexadecimal addressing',
          'CIDR notation (`/24`) defines network prefix bits vs host bits (`/24` leaves 8 bits -> 254 usable hosts)',
          'NAT (Network Address Translation) maps multiple private IPs behind a single public IP using port translation (PAT)'
        ],
        learningLinks: [
          { label: 'MDN - Network Protocols & IP Addressing', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work', tag: 'MDN' }
        ],
        interviewQuestions: [
          'Calculate how many usable host IP addresses are available in a 192.168.1.0/26 subnet.',
          'How does Network Address Translation (NAT) solve IPv4 address exhaustion and provide basic security?',
          'What is the difference between intra-domain routing (OSPF) and inter-domain routing (BGP)?'
        ]
      },
      {
        id: 'cn-3',
        title: '3. Transport Layer: TCP vs UDP & Socket Communication',
        completed: false,
        overview: 'Connection-oriented reliable byte streams (TCP) vs connectionless datagrams (UDP), port numbers, and socket abstractions.',
        keyTakeaways: [
          'TCP guarantees ordered, error-checked, reliable delivery with retransmissions; UDP provides low-latency, best-effort delivery',
          'TCP uses 20-byte minimum header; UDP uses lightweight 8-byte header',
          'UDP is preferred for real-time video streaming, online gaming, DNS queries, and VoIP'
        ],
        learningLinks: [
          { label: 'High Performance Browser Networking - TCP & UDP', url: 'https://hpbn.co/', tag: 'Book' },
          { label: 'MDN - WebSockets Protocol', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', tag: 'MDN' }
        ],
        interviewQuestions: [
          'Why does live audio/video streaming prefer UDP over TCP despite packet loss?',
          'What is a network Socket (IP address + Port number) and how do servers listen for multiple client connections?',
          'How does UDP handle packet corruption if it does not have retransmission mechanisms?'
        ]
      },
      {
        id: 'cn-4',
        title: '4. TCP Internals: 3-Way Handshake, Flow & Congestion Control',
        completed: false,
        overview: 'Deep dive into SYN/ACK handshake, FIN teardown, TIME_WAIT state, sliding window flow control, and AIMD congestion control.',
        keyTakeaways: [
          '3-Way Handshake: SYN -> SYN-ACK -> ACK establishes sequence numbers and window size',
          'Flow Control prevents sender from overwhelming receiver (Receiver Window advertising buffer space)',
          'Congestion Control prevents sender from overwhelming network (Slow Start, Congestion Avoidance, Fast Retransmit/Recovery)'
        ],
        learningLinks: [
          { label: 'High Performance Browser Networking - Building Blocks of TCP', url: 'https://hpbn.co/', tag: 'Book' }
        ],
        interviewQuestions: [
          'Draw and explain the TCP 3-Way Handshake sequence numbers and ACK numbers.',
          'What is the purpose of the TIME_WAIT state in TCP connection termination?',
          'Explain the difference between TCP Flow Control (Sliding Window) and TCP Congestion Control (Slow Start/AIMD).'
        ]
      },
      {
        id: 'cn-5',
        title: '5. Application Layer: DNS Resolution Lifecycle & DHCP',
        completed: false,
        overview: 'Recursive and iterative DNS queries, root nameservers, TLD nameservers, authoritative nameservers, and DNS record types (A, AAAA, CNAME, MX).',
        keyTakeaways: [
          'Browser checks: Browser Cache -> OS Hosts Cache -> Router Cache -> Recursive Resolver (ISP)',
          'Resolver hierarchy: Root Server (.) -> TLD Server (.com) -> Authoritative Server (example.com)',
          'A Record maps domain to IPv4; CNAME maps domain alias to another domain; TTL controls caching duration'
        ],
        learningLinks: [
          { label: 'MDN - What is a Domain Name & DNS', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name', tag: 'MDN' }
        ],
        interviewQuestions: [
          'Walk through the complete step-by-step lifecycle of what happens when you type https://google.com into your browser.',
          'What is the difference between an A Record and a CNAME Record in DNS?',
          'What is DNS TTL (Time To Live) and how does it affect domain migration downtime?'
        ]
      },
      {
        id: 'cn-6',
        title: '6. Web Protocols: HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)',
        completed: false,
        overview: 'Evolution of web transport: HTTP/1.1 pipelining limitations, HTTP/2 binary framing & multiplexing, and HTTP/3 UDP-based QUIC.',
        keyTakeaways: [
          'HTTP/1.1 suffers from Head-of-Line (HoL) blocking at application level (1 request per TCP socket at a time)',
          'HTTP/2 introduces Binary Framing, Multiplexing multiple streams over 1 TCP connection, and Header Compression (HPACK)',
          'HTTP/3 runs over QUIC (UDP) to eliminate TCP-level packet loss HoL blocking and 0-RTT handshakes'
        ],
        learningLinks: [
          { label: 'MDN - Overview of HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', tag: 'MDN' },
          { label: 'High Performance Browser Networking - HTTP/2', url: 'https://hpbn.co/', tag: 'Book' }
        ],
        interviewQuestions: [
          'What is Head-of-Line (HoL) blocking and how does HTTP/2 multiplexing resolve it?',
          'Why did HTTP/3 switch from TCP to UDP (QUIC)?',
          'What is HTTP Server Push in HTTP/2 and why did modern browsers eventually deprecate it?'
        ]
      },
      {
        id: 'cn-7',
        title: '7. Network Security: SSL/TLS Handshake, HTTPS & Public-Key Crypto',
        completed: false,
        overview: 'Asymmetric vs symmetric encryption, Certificate Authorities (CA), TLS 1.3 cryptographic handshake, and Perfect Forward Secrecy.',
        keyTakeaways: [
          'Asymmetric encryption (RSA/ECC) securely exchanges symmetric session key; Symmetric encryption (AES-GCM) encrypts payload data',
          'TLS Certificate contains public key signed by trusted Certificate Authority (CA) root chain',
          'TLS 1.3 reduces handshake to 1 Round Trip Time (1-RTT) and eliminates insecure cipher suites'
        ],
        learningLinks: [
          { label: 'MDN - HTTPS Overview & Security', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS', tag: 'MDN' },
          { label: 'MDN - Transport Layer Security (TLS)', url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security', tag: 'MDN' }
        ],
        interviewQuestions: [
          'Explain how asymmetric encryption and symmetric encryption work together during a TLS/HTTPS connection.',
          'How does a browser verify that an SSL certificate presented by a website is genuine and untampered with?',
          'What is Perfect Forward Secrecy (PFS) in TLS 1.3 and why is it important?'
        ]
      }
    ]
  },

  {
    id: 'cs-oop-lld',
    categoryGroup: 'Core CS',
    category: 'Object-Oriented Programming & Clean LLD Design',
    description: '4 OOP pillars, SOLID principles, Gang-of-Four design patterns, UML class diagrams, and machine coding design.',
    icon: 'BookOpen',
    isCoreCS: true,
    applicableRoles: [
      'Software Development Engineer (SDE / Core DSA)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Software Development Engineer in Test (SDET / Automation)'
    ],
    topics: [
      {
        id: 'oop-1',
        title: '1. The 4 Pillars of OOP: Encapsulation, Abstraction, Inheritance, Polymorphism',
        completed: false,
        overview: 'Master object-oriented abstractions, access specifiers, abstract classes vs interfaces, method overloading vs overriding, and virtual method tables.',
        keyTakeaways: [
          'Encapsulation bundles data and methods while hiding internal state via private variables and public getters/setters',
          'Abstraction exposes essential interface contracts while hiding implementation complexity',
          'Compile-Time Polymorphism: Method Overloading; Run-Time Polymorphism: Method Overriding via Virtual Function Table (vtable)'
        ],
        learningLinks: [
          { label: 'Refactoring Guru - OOP Concepts', url: 'https://refactoring.guru/design-patterns', tag: 'Interactive' },
          { label: 'GeeksforGeeks - 4 Pillars of OOPs', url: 'https://www.geeksforgeeks.org/four-main-object-oriented-programming-concepts-of-java/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'What is the difference between an Abstract Class and an Interface, and when should you choose one over the other?',
          'How does Run-Time Polymorphism work under the hood (vtable and vptr in C++/Java)?',
          'What is the Diamond Problem in multiple inheritance and how do languages like Java or C++ resolve it?'
        ]
      },
      {
        id: 'oop-2',
        title: '2. Object Relationships & UML Class Diagram Modeling',
        completed: false,
        overview: 'Understand Association, Aggregation (HAS-A weak), Composition (HAS-A strong ownership), and Inheritance (IS-A) relationships.',
        keyTakeaways: [
          'Aggregation: Child can exist independently of Parent (e.g. Department and Professor)',
          'Composition: Child cannot exist without Parent; destroying parent destroys children (e.g. House and Room)',
          'Favor Composition over Inheritance to avoid fragile base class hierarchies'
        ],
        learningLinks: [
          { label: 'GeeksforGeeks - Association, Composition & Aggregation', url: 'https://www.geeksforgeeks.org/association-composition-aggregation-java/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'Explain the difference between Aggregation and Composition with real-world code examples.',
          'Why is "Favor Composition Over Inheritance" a fundamental software engineering principle?',
          'How do you model a Many-to-Many relationship in a UML class diagram?'
        ]
      },
      {
        id: 'oop-3',
        title: '3. SOLID Design Principles with Practical Refactoring',
        completed: false,
        overview: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles in real code.',
        keyTakeaways: [
          'S - Single Responsibility: A class should have one, and only one, reason to change',
          'O - Open/Closed: Software entities should be open for extension, but closed for modification',
          'L - Liskov Substitution: Derived classes must be substitutable for their base classes without breaking correctness',
          'I - Interface Segregation: Clients should not be forced to depend on interfaces they do not use',
          'D - Dependency Inversion: High-level modules should depend on abstractions, not concrete implementations'
        ],
        learningLinks: [
          { label: 'Refactoring Guru - SOLID Principles', url: 'https://refactoring.guru/design-patterns', tag: 'Guide' }
        ],
        interviewQuestions: [
          'Give a real-world code violation of the Liskov Substitution Principle (e.g. Rectangle/Square problem) and how to fix it.',
          'How does Dependency Injection (DI) implement the Dependency Inversion Principle?',
          'Explain how the Open/Closed Principle prevents regression bugs when adding new features.'
        ]
      },
      {
        id: 'oop-4',
        title: '4. Creational Design Patterns: Singleton, Factory, Abstract Factory, Builder',
        completed: false,
        overview: 'Design patterns for object instantiation mechanisms: thread-safe Singletons, Factory Method, Abstract Factory, and Builder with fluent APIs.',
        keyTakeaways: [
          'Thread-Safe Singleton: Double-Checked Locking with `volatile` prevents partial object publication',
          'Factory Method delegates instantiation logic to subclasses based on runtime parameters',
          'Builder pattern constructs complex composite objects step-by-step without telescoping constructor anti-patterns'
        ],
        learningLinks: [
          { label: 'Refactoring Guru - Creational Design Patterns', url: 'https://refactoring.guru/design-patterns/creational-patterns', tag: 'Interactive' }
        ],
        interviewQuestions: [
          'Write a thread-safe Singleton in Java or C++ using double-checked locking and explain why `volatile` is needed.',
          'When should you use the Builder Pattern instead of multiple overloaded constructors?',
          'Compare Factory Method vs Abstract Factory Pattern with a concrete UI theme example.'
        ]
      },
      {
        id: 'oop-5',
        title: '5. Structural Patterns: Adapter, Decorator, Facade, Proxy',
        completed: false,
        overview: 'Patterns for composing classes and interfaces: Adapter for incompatible interfaces, Decorator for dynamic behavior wrapping, and Proxy for caching/access.',
        keyTakeaways: [
          'Adapter converts the interface of a class into another interface clients expect',
          'Decorator dynamically attaches additional responsibilities to an object without modifying base class (e.g. Java I/O streams)',
          'Facade provides a simplified high-level interface to a complex subsystem',
          'Proxy controls and manages access to an object (Virtual Proxy for lazy loading, Protection Proxy for auth)'
        ],
        learningLinks: [
          { label: 'Refactoring Guru - Structural Design Patterns', url: 'https://refactoring.guru/design-patterns/structural-patterns', tag: 'Interactive' }
        ],
        interviewQuestions: [
          'How does Java’s `BufferedReader(new FileReader("file.txt"))` implement the Decorator pattern?',
          'What is the difference between an Adapter pattern and a Proxy pattern?',
          'Explain how a Caching Proxy reduces expensive database queries.'
        ]
      },
      {
        id: 'oop-6',
        title: '6. Behavioral Patterns: Strategy, Observer, Command, State',
        completed: false,
        overview: 'Patterns for communication algorithms and responsibilities between objects: Strategy for swappable algorithms, Observer for Pub/Sub events.',
        keyTakeaways: [
          'Strategy encapsulates interchangeable algorithms (e.g. sorting algorithms, payment processors) and switches them at runtime',
          'Observer defines 1:N dependency where subject automatically notifies all subscribed observers on state change',
          'Command encapsulates a request as an object, enabling undo/redo operations and task queues'
        ],
        learningLinks: [
          { label: 'Refactoring Guru - Behavioral Design Patterns', url: 'https://refactoring.guru/design-patterns/behavioral-patterns', tag: 'Interactive' }
        ],
        interviewQuestions: [
          'How does the Strategy Pattern eliminate long chains of `if-else` or `switch` statements?',
          'Explain how the Observer Pattern is used in event-driven systems and GUI frameworks.',
          'How would you implement an Undo/Redo feature using the Command Pattern?'
        ]
      },
      {
        id: 'oop-7',
        title: '7. Machine Coding LLD: Design Parking Lot, Elevator & LRU Cache',
        completed: false,
        overview: 'Step-by-step object-oriented machine coding rounds frequently tested in Google, Uber, Amazon, and top product companies.',
        keyTakeaways: [
          'Clarify requirements and define models (Vehicle, Slot, Ticket, Gate, Payment)',
          'Design Strategy pattern for slot allocation (Nearest to Entrance vs Floor-based)',
          'Ensure thread-safe operations on shared state using Mutex or Read-Write locks',
          'Implement clean unit tests and demonstrable driver `main()` program'
        ],
        learningLinks: [
          { label: 'GitHub - Awesome Low Level Design', url: 'https://github.com/ashishps1/awesome-low-level-design', tag: 'GitHub' }
        ],
        interviewQuestions: [
          'Design an Object-Oriented Parking Lot supporting multiple vehicle types, floors, and dynamic pricing.',
          'Design an Elevator System managing multiple lifts with optimal dispatching algorithms (SCAN/LOOK).',
          'Design an In-Memory LRU Cache with O(1) get and put operations using HashMap + Doubly Linked List.'
        ]
      }
    ]
  },

  // ============================================================
  // 2. DSA & ALGORITHMIC PROBLEM SOLVING (3 Roadmaps)
  // ============================================================
  {
    id: 'dsa-foundation',
    categoryGroup: 'DSA & Algorithms',
    category: 'Data Structures Foundation',
    description: 'Master core linear & hierarchical data structures with rigorous Time/Space complexity analysis.',
    icon: 'Code2',
    isCoreCS: false,
    applicableRoles: [
      'Software Development Engineer (SDE / Core DSA)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Frontend Engineer (React / Next.js / UI Architecture)',
      'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)',
      'Software Development Engineer in Test (SDET / Automation)'
    ],
    topics: [
      {
        id: 'dsaf-1',
        title: '1. Arrays, Strings & Two Pointer Algorithms',
        completed: false,
        overview: 'Contiguous memory layout, two-pointer techniques (opposite-end, fast/slow), sliding window, and prefix sums.',
        keyTakeaways: [
          'Array lookup is O(1) via base address arithmetic; insertion/deletion is O(N)',
          'Two Pointers optimize nested loops from O(N^2) to O(N) on sorted arrays',
          'Prefix Sum array allows O(1) range sum queries after O(N) precomputation'
        ],
        learningLinks: [
          { label: 'NeetCode - Arrays & Hashing Roadmap', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' },
          { label: 'Striver SDE Sheet - Arrays', url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/', tag: 'Striver' }
        ],
        interviewQuestions: [
          'How does the Sliding Window pattern solve Maximum Sum Subarray of size K in O(N) time?',
          'Explain the Dutch National Flag algorithm (Sort Colors 0, 1, 2) in one pass O(N) time and O(1) space.',
          'How do Prefix Sums and HashMaps solve the Subarray Sum Equals K problem in O(N)?'
        ]
      },
      {
        id: 'dsaf-2',
        title: '2. Singly & Doubly Linked Lists & Fast/Slow Pointers',
        completed: false,
        overview: 'Pointer manipulation, Floyd’s cycle detection algorithm, list reversal, and dummy node techniques.',
        keyTakeaways: [
          'Linked List nodes contain value + next pointer (non-contiguous memory allocation)',
          'Floyd’s Cycle-Finding Algorithm (Tortoise and Hare) detects loops in O(N) time and O(1) space',
          'Using a Dummy Head node simplifies edge-case insertions and deletions at the head'
        ],
        learningLinks: [
          { label: 'NeetCode - Linked List Roadmap', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' }
        ],
        interviewQuestions: [
          'Reverse a singly linked list iteratively in O(N) time and O(1) space, and then recursively.',
          'Explain Floyd’s cycle detection algorithm and how you find the exact start node of the cycle.',
          'How do you merge two sorted linked lists into one sorted list in O(N) time?'
        ]
      },
      {
        id: 'dsaf-3',
        title: '3. Stacks, Queues, Deque & Monotonic Stack Patterns',
        completed: false,
        overview: 'LIFO vs FIFO data structures, circular queues, double-ended queues, and monotonic stack patterns for range queries.',
        keyTakeaways: [
          'Stack (LIFO) is used for DFS, parenthesis matching, undo history, and expression evaluation',
          'Queue (FIFO) is used for BFS, task scheduling, and message buffers',
          'Monotonic Stack maintains elements in strictly increasing/decreasing order to find Next Greater Element in O(N)'
        ],
        learningLinks: [
          { label: 'NeetCode - Stack Patterns', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' },
          { label: 'GeeksforGeeks - Monotonic Stack Guide', url: 'https://www.geeksforgeeks.org/introduction-to-monotonic-stack-2/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'How does a Monotonic Decreasing Stack find the Next Greater Element for all array elements in O(N)?',
          'Implement a Queue using two Stacks such that push and pop amortized complexities are optimal.',
          'Explain how the Min Stack problem is solved with O(1) getMin() using a single stack.'
        ]
      },
      {
        id: 'dsaf-4',
        title: '4. Binary Trees, BSTs & Tree Traversals (BFS / DFS)',
        completed: false,
        overview: 'Hierarchical node structures, Inorder/Preorder/Postorder traversals, Level-order BFS, and Binary Search Tree invariants.',
        keyTakeaways: [
          'Inorder traversal of a valid BST yields strictly sorted values in O(N) time',
          'BFS uses a Queue to process level by level; DFS uses Call Stack / Stack for recursive traversal',
          'Balanced BST (AVL, Red-Black) guarantees O(log N) lookup, insertion, and deletion'
        ],
        learningLinks: [
          { label: 'Striver - Binary Tree Series', url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/', tag: 'Striver' },
          { label: 'NeetCode - Trees Roadmap', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' }
        ],
        interviewQuestions: [
          'Find the Lowest Common Ancestor (LCA) in a Binary Tree vs in a Binary Search Tree.',
          'Check if a binary tree is Height-Balanced in O(N) time without redundant subtree height recalculations.',
          'Serialize and Deserialize a Binary Tree to and from a string.'
        ]
      },
      {
        id: 'dsaf-5',
        title: '5. Hash Tables, Collision Resolution & Rolling Hash',
        completed: false,
        overview: 'Hash functions, Separate Chaining vs Open Addressing (Linear Probing), load factor, and Rabin-Karp rolling hash.',
        keyTakeaways: [
          'Hash table provides average O(1) lookup, insert, and delete; worst-case O(N) during high collisions',
          'Load Factor = N / Capacity; exceeding threshold (typically 0.75) triggers rehashing with doubled table size',
          'Rabin-Karp Rolling Hash computes string window hashes in O(1) time'
        ],
        learningLinks: [
          { label: 'GeeksforGeeks - Hashing Data Structure', url: 'https://www.geeksforgeeks.org/hashing-data-structure/', tag: 'Guide' },
          { label: 'NeetCode - Hashing & HashMaps', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' }
        ],
        interviewQuestions: [
          'Explain Separate Chaining vs Open Addressing for hash collision resolution and compare cache locality.',
          'What happens during HashMap resizing (rehashing) and why is it expensive?',
          'Design an In-Memory LRU Cache combining a HashMap and a Doubly Linked List in O(1) get/put.'
        ]
      }
    ]
  },

  {
    id: 'dsa-advanced',
    categoryGroup: 'DSA & Algorithms',
    category: 'Advanced Algorithms & Graph Mastery',
    description: 'Graph algorithms, 2D Dynamic Programming, Greedy approaches, and Bit Manipulation for Tier-1 coding rounds.',
    icon: 'Code2',
    isCoreCS: false,
    applicableRoles: [
      'Software Development Engineer (SDE / Core DSA)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)'
    ],
    topics: [
      {
        id: 'dsaa-1',
        title: '1. Graphs: BFS/DFS, Cycle Detection & Topological Sort',
        completed: false,
        overview: 'Adjacency list representations, connected components, cycle detection in directed/undirected graphs, and Kahn’s algorithm.',
        keyTakeaways: [
          'Kahn’s Algorithm uses In-Degree counts and a Queue for Topological Sorting in Directed Acyclic Graphs (DAG)',
          'Cycle detection in directed graphs requires 3 states: Unvisited (0), In-Progress (1), Visited (2)',
          'Graph BFS computes shortest path in unweighted graphs in O(V + E) time'
        ],
        learningLinks: [
          { label: 'Striver - Graph Series', url: 'https://takeuforward.org/graph/striver-graph-series-top-graph-interview-questions/', tag: 'Striver' },
          { label: 'NeetCode - Advanced Graphs', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' }
        ],
        interviewQuestions: [
          'Solve the Course Schedule problem (Topological Sort) and explain how cycle detection determines feasibility.',
          'How do you count the number of Connected Components in an undirected graph using both DFS and Disjoint Set Union (DSU)?',
          'Explain Word Ladder problem: how does bidirectional BFS reduce search space from O(B^D) to O(B^(D/2))?'
        ]
      },
      {
        id: 'dsaa-2',
        title: '2. Shortest Path Algorithms: Dijkstra, Bellman-Ford & Floyd-Warshall',
        completed: false,
        overview: 'Single-source and all-pairs shortest path algorithms on weighted graphs with non-negative and negative edge weights.',
        keyTakeaways: [
          'Dijkstra uses Min-Heap Priority Queue; time complexity O((V + E) log V); fails on negative weights',
          'Bellman-Ford relaxes all edges V-1 times in O(V * E); detects negative weight cycles',
          'Floyd-Warshall computes All-Pairs Shortest Path in O(V^3) using dynamic programming matrix'
        ],
        learningLinks: [
          { label: 'CP-Algorithms - Dijkstra Shortest Path', url: 'https://cp-algorithms.com/', tag: 'Reference' }
        ],
        interviewQuestions: [
          'Why does Dijkstra’s algorithm fail on graphs with negative edge weights while Bellman-Ford succeeds?',
          'How does Bellman-Ford detect the presence of a negative weight cycle during the V-th relaxation step?',
          'What is the difference between Kruskal’s Minimum Spanning Tree (MST) and Prim’s MST algorithm?'
        ]
      },
      {
        id: 'dsaa-3',
        title: '3. Dynamic Programming: 1D, 2D Grid, 0/1 Knapsack & LCS',
        completed: false,
        overview: 'Overlapping subproblems, optimal substructure, memoization (Top-Down), tabulation (Bottom-Up), and space optimization.',
        keyTakeaways: [
          'Identify state parameters and recurrence relation before writing code',
          '0/1 Knapsack: each item can be chosen at most once; Unbounded Knapsack: items can be chosen unlimited times',
          'Space Optimization: if current DP row depends only on previous row, space can be reduced from O(N*M) to O(M)'
        ],
        learningLinks: [
          { label: 'NeetCode - Dynamic Programming Roadmap', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' }
        ],
        interviewQuestions: [
          'Explain the state transition equation for Longest Common Subsequence (LCS) and how to reconstruct the string.',
          'Solve the Coin Change problem (Minimum coins to make amount) using bottom-up tabulation.',
          'How do you solve Longest Increasing Subsequence (LIS) in O(N log N) time using Binary Search (Patience Sorting)?'
        ]
      },
      {
        id: 'dsaa-4',
        title: '4. Disjoint Set Union (DSU / Union-Find) & Kruskal’s MST',
        completed: false,
        overview: 'Union by Rank/Size and Path Compression optimizations, cycle detection in undirected graphs, and Kruskal’s algorithm.',
        keyTakeaways: [
          'Path Compression flattens tree during find() operations; Union by Rank attaches smaller tree under larger root',
          'Combined Path Compression + Union by Rank yields nearly O(1) amortized time complexity O(alpha(N))',
          'Kruskal’s algorithm sorts all edges by weight and uses DSU to greedily build MST without cycles'
        ],
        learningLinks: [
          { label: 'CP-Algorithms - Disjoint Set Union', url: 'https://cp-algorithms.com/data_structures/disjoint_set_union.html', tag: 'Reference' }
        ],
        interviewQuestions: [
          'Explain why Path Compression and Union by Rank together give almost O(1) inverse Ackermann complexity alpha(N).',
          'How is DSU used to solve the Number of Provinces / Connected Components problem?',
          'Walk through Kruskal’s algorithm for finding the Minimum Spanning Tree of a weighted graph.'
        ]
      },
      {
        id: 'dsaa-5',
        title: '5. Binary Search on Answer Space & Monotonic Predicates',
        completed: false,
        overview: 'Master binary search on non-array answer ranges (Minimax, Capacity allocation, Koko Eating Bananas).',
        keyTakeaways: [
          'If problem asks to "Minimize Maximum" or "Maximize Minimum", it is almost always Binary Search on Answer',
          'Establish lower bound `low` and upper bound `high` of the answer space',
          'Write a monotonic validator helper function `isValid(mid)` returning boolean'
        ],
        learningLinks: [
          { label: 'NeetCode - Binary Search Roadmap', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' }
        ],
        interviewQuestions: [
          'Solve Koko Eating Bananas: explain how the speed range [1, max(piles)] forms a monotonic search space.',
          'Solve Book Allocation / Capacity to Ship Packages Within D Days using Binary Search on Answer.',
          'How do you avoid integer overflow when calculating mid = low + (high - low) / 2?'
        ]
      }
    ]
  },

  {
    id: 'dsa-competitive',
    categoryGroup: 'DSA & Algorithms',
    category: 'Competitive Programming & Math Patterns',
    description: 'Bit manipulation, Number theory, Segment Trees, Trie, and Combinatorics for competitive coding.',
    icon: 'Code2',
    isCoreCS: false,
    applicableRoles: [
      'Software Development Engineer (SDE / Core DSA)',
      'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)'
    ],
    topics: [
      {
        id: 'dsac-1',
        title: '1. Bit Manipulation, Bitwise Tricks & Bitmasks',
        completed: false,
        overview: 'Binary bitwise operations (&, |, ^, ~, <<, >>), Brian Kernighan bit-counting algorithm, and subset generation via bitmasks.',
        keyTakeaways: [
          'x & (x - 1) clears the lowest set bit; x & (-x) isolates the lowest set bit',
          'XOR property: a ^ a = 0 and a ^ 0 = a; enables finding single non-duplicate numbers in O(N)',
          'Bitmask integer represents subset of N items in O(1) space'
        ],
        learningLinks: [
          { label: 'CP-Algorithms - Bit Manipulation', url: 'https://cp-algorithms.com/', tag: 'Reference' }
        ],
        interviewQuestions: [
          'How do you count the total number of set bits in an integer using Brian Kernighan’s algorithm in O(number of set bits)?',
          'Find the two non-repeating elements in an array where all other elements repeat twice using bitwise XOR.',
          'How do you generate all 2^N subsets of an array using integer bitmasks?'
        ]
      },
      {
        id: 'dsac-2',
        title: '2. Number Theory: Modular Arithmetic, GCD & Sieve of Eratosthenes',
        completed: false,
        overview: 'Prime factorization, Euclidean algorithm for GCD, Modular Multiplicative Inverse (Fermat’s Little Theorem), and Sieve of Eratosthenes.',
        keyTakeaways: [
          'Sieve of Eratosthenes finds all primes up to N in O(N log log N) time',
          'Euclidean Algorithm computes GCD(a, b) in O(log(min(a, b))) time',
          'Modular Inverse: (a / b) % M = (a * b^(M-2)) % M when M is prime'
        ],
        learningLinks: [
          { label: 'CP-Algorithms - Sieve of Eratosthenes', url: 'https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html', tag: 'Reference' }
        ],
        interviewQuestions: [
          'Explain why the time complexity of the Sieve of Eratosthenes is O(N log log N).',
          'How does Fermat’s Little Theorem allow division under modulo arithmetic?',
          'Compute GCD(a, b) and LCM(a, b) using Euclidean algorithm.'
        ]
      },
      {
        id: 'dsac-3',
        title: '3. Trie (Prefix Tree) & Auto-Complete Search Invariant',
        completed: false,
        overview: 'Tree data structure for fast prefix searching, word insertion, auto-complete suggestions, and Maximum XOR Pair queries.',
        keyTakeaways: [
          'Trie insertion and search take O(L) time where L is word length, independent of dictionary size',
          'Each node contains a fixed-size array of 26 child pointers (or hash map) and a boolean `isEndOfWord` flag',
          'Binary Trie computes Maximum XOR Pair across array integers in O(32 * N)'
        ],
        learningLinks: [
          { label: 'NeetCode - Trie Roadmap', url: 'https://neetcode.io/roadmap', tag: 'NeetCode' }
        ],
        interviewQuestions: [
          'Implement a Prefix Tree (Trie) with insert(), search(), and startsWith() methods.',
          'Design an Auto-complete Suggestion System returning top 3 matching search prefixes.',
          'How is a Binary Bitwise Trie used to find the maximum XOR of two numbers in an array in O(N)?'
        ]
      },
      {
        id: 'dsac-4',
        title: '4. Segment Trees & Range Query Optimization',
        completed: false,
        overview: 'Segment Trees for O(log N) range sum/min/max queries and point/range updates with Lazy Propagation.',
        keyTakeaways: [
          'Segment Tree array representation requires 4*N memory space',
          'Build tree in O(N); Point Update and Range Query in O(log N)',
          'Lazy Propagation postpones range updates to child nodes to maintain O(log N) range update performance'
        ],
        learningLinks: [
          { label: 'CP-Algorithms - Segment Tree', url: 'https://cp-algorithms.com/data_structures/segment_tree.html', tag: 'Reference' }
        ],
        interviewQuestions: [
          'What is the advantage of a Segment Tree over a Prefix Sum array when frequent array updates occur?',
          'Explain how Lazy Propagation optimizes Range Update operations from O(N) to O(log N).',
          'Compare Fenwick Tree (Binary Indexed Tree) vs Segment Tree in terms of memory and implementation complexity.'
        ]
      },
      {
        id: 'dsac-5',
        title: '5. Advanced Backtracking: N-Queens, Sudoku & Pruning',
        completed: false,
        overview: 'Exhaustive state space search, branch-and-bound pruning, recursion call stack tracing, and constraint satisfaction.',
        keyTakeaways: [
          'Backtracking systematically explores decision trees and prunes invalid search branches early',
          'N-Queens uses bitsets/hash sets for columns and main/anti diagonals to check safety in O(1)',
          'Sudoku Solver uses constraint checking on 3x3 sub-grids'
        ],
        learningLinks: [
          { label: 'GeeksforGeeks - Backtracking Algorithms', url: 'https://www.geeksforgeeks.org/backtracking-algorithms/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'Solve the N-Queens problem and explain how to check diagonal safety in O(1) time without traversing the board.',
          'Implement a 9x9 Sudoku Solver using backtracking and constraint validation.',
          'How does memoization transform a backtracking exponential search into polynomial Dynamic Programming?'
        ]
      }
    ]
  },

  // ============================================================
  // 3. FRONTEND ENGINEERING (4 Roadmaps)
  // ============================================================
  {
    id: 'fe-react',
    categoryGroup: 'Frontend',
    category: 'React.js & Modern UI Architecture',
    description: 'Master component architecture, React 19 hooks, state management, render cycles, and custom hooks.',
    icon: 'Layout',
    isCoreCS: false,
    applicableRoles: [
      'Frontend Engineer (React / Next.js / UI Architecture)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Software Development Engineer in Test (SDET / Automation)'
    ],
    topics: [
      {
        id: 'fer-1',
        title: '1. React 19 Core: Hooks (useState, useEffect, useMemo, useCallback)',
        completed: false,
        overview: 'Deep dive into React 19 hooks, dependency arrays, closures, state batching, and custom hook composition.',
        keyTakeaways: [
          'React batches state updates automatically in promises, timeouts, and native event handlers',
          'useMemo caches calculated values; useCallback caches function definitions to prevent child re-renders',
          'Custom hooks isolate and reuse stateful logic across multiple components'
        ],
        learningLinks: [
          { label: 'React Official Documentation', url: 'https://react.dev/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What causes infinite re-render loops in useEffect and how do dependency arrays prevent them?',
          'When does using useMemo actually degrade performance instead of improving it?',
          'Explain the difference between useState functional updates `setCount(c => c + 1)` and direct updates.'
        ]
      },
      {
        id: 'fer-2',
        title: '2. Component Composition & Custom Hooks Design Patterns',
        completed: false,
        overview: 'Compound components, container/presentational separation, render props, and headless UI architectures.',
        keyTakeaways: [
          'Compound Components (e.g. `<Select><Option /></Select>`) share implicit state via React Context',
          'Container components handle data fetching/state; Presentational components focus solely on UI rendering',
          'Headless UI components provide accessibility and state logic without enforcing opinionated styles'
        ],
        learningLinks: [
          { label: 'React - Passing Data Deeply with Context', url: 'https://react.dev/learn/passing-data-deeply-with-context', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How do you design a Compound Component pattern in React using Context API?',
          'What are the advantages of Headless UI libraries over styled component libraries?',
          'How do you prevent prop drilling in deep component trees without introducing heavy global state?'
        ]
      },
      {
        id: 'fer-3',
        title: '3. Client State Architecture: Zustand vs Redux Toolkit',
        completed: false,
        overview: 'Global state stores, state normalization, selector subscriptions, immutability, and middleware.',
        keyTakeaways: [
          'Zustand provides minimalist stores with selective component subscriptions (only re-renders subscribed state)',
          'Redux Toolkit uses Immer for simplified immutable reducers and structured action dispatching',
          'Store separation: keep server cache in React Query and UI state in Zustand/Redux'
        ],
        learningLinks: [
          { label: 'Zustand Official Documentation', url: 'https://zustand-demo.pmnd.rs/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Why does Zustand prevent unnecessary re-renders compared to naive React Context providers?',
          'What is state normalization and why should relational entities be stored as `byId` maps instead of nested arrays?',
          'When should you use global state vs local component state?'
        ]
      },
      {
        id: 'fer-4',
        title: '4. Server State & Caching: TanStack React Query',
        completed: false,
        overview: 'Asynchronous server state management, background refetching, cache invalidation, and optimistic mutations.',
        keyTakeaways: [
          'Stale-While-Revalidate: serves instant cached data while fetching fresh updates in the background',
          'Automatic cache deduplication across concurrent component mounts',
          'Optimistic UI mutations update the screen immediately and rollback on network failure'
        ],
        learningLinks: [
          { label: 'TanStack Query Official Docs', url: 'https://tanstack.com/query/latest', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the difference between `staleTime` and `gcTime` (formerly `cacheTime`) in React Query?',
          'How do you implement an Optimistic Mutation with automatic rollback on network error?',
          'Why should API response caching not be managed inside traditional Redux/Zustand stores?'
        ]
      },
      {
        id: 'fer-5',
        title: '5. Component Testing with Vitest & React Testing Library',
        completed: false,
        overview: 'Behavior-driven frontend testing, accessible queries, userEvent interactions, and API mocking with MSW.',
        keyTakeaways: [
          'React Testing Library tests user behavior from the user’s perspective (not internal state or implementation details)',
          'Query priority: `getByRole` > `getByLabelText` > `getByPlaceholderText` > `getByText`',
          'Mock Service Worker (MSW) intercepts network requests at the browser/Node level without mocking Axios'
        ],
        learningLinks: [
          { label: 'React Testing Library Docs', url: 'https://testing-library.com/docs/react-testing-library/intro/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Why is testing component implementation details (state, internal methods) considered an anti-pattern?',
          'How does `userEvent` differ from `fireEvent` in React Testing Library?',
          'How do you test asynchronous API loading and error states in a React component?'
        ]
      }
    ]
  },

  {
    id: 'fe-nextjs',
    categoryGroup: 'Frontend',
    category: 'Next.js 15 & Full-Stack Frontend',
    description: 'Server Components, SSR, SSG, Route Handlers, and Edge caching for production web applications.',
    icon: 'Layout',
    isCoreCS: false,
    applicableRoles: [
      'Frontend Engineer (React / Next.js / UI Architecture)',
      'Full Stack Engineer (MERN / Next.js / APIs)'
    ],
    topics: [
      {
        id: 'fen-1',
        title: '1. Next.js 15 App Router Architecture & Server Components (RSC)',
        completed: false,
        overview: 'App router layouts, page routing, React Server Components (zero client bundle size), and Client Component boundaries (`"use client"`).',
        keyTakeaways: [
          'Server Components execute exclusively on Node.js/Edge runtime; fetch data directly without REST boilerplate',
          'Client Components are required only when attaching event listeners (onClick) or React hooks (useState/useEffect)',
          'Passing Server Components as children to Client Components avoids turning child components into client bundles'
        ],
        learningLinks: [
          { label: 'Next.js Official Documentation', url: 'https://nextjs.org/docs', tag: 'Official Docs' },
          { label: 'Next.js Server Components Guide', url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the fundamental architectural difference between React Server Components (RSC) and traditional SSR?',
          'Why can you not use React hooks or browser event listeners in Server Components?',
          'How do Server Components achieve zero client-side JavaScript bundle overhead?'
        ]
      },
      {
        id: 'fen-2',
        title: '2. Data Fetching: SSR, Static Generation & Incremental ISR',
        completed: false,
        overview: 'Static site generation, dynamic server-side rendering, `fetch()` cache controls, and on-demand cache revalidation (`revalidatePath`, `revalidateTag`).',
        keyTakeaways: [
          'Static Rendering (SSG) compiles HTML at build time for blistering CDN speeds',
          'Dynamic Rendering (SSR) executes per request for personalized user dashboards',
          'Incremental Static Regeneration (ISR) updates static pages in background without full site rebuild'
        ],
        learningLinks: [
          { label: 'Next.js Data Fetching & Caching', url: 'https://nextjs.org/docs/app/building-your-application/data-fetching', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain how Incremental Static Regeneration (ISR) allows static caching with dynamic freshness.',
          'How does `revalidatePath()` in Next.js purge cached pages on demand following a database mutation?',
          'Compare Static Site Generation vs Server-Side Rendering in terms of Time-To-First-Byte (TTFB) and server load.'
        ]
      },
      {
        id: 'fen-3',
        title: '3. Server Actions, Form Mutations & Zod Validation',
        completed: false,
        overview: 'Async functions executed on server directly from UI forms (`"use server"`), optimistic updates, and schema validation with Zod.',
        keyTakeaways: [
          'Server Actions eliminate the need for manual API route handlers for basic form mutations',
          'Progressive Enhancement: forms can submit even before client JavaScript bundle loads',
          'Always validate form inputs on the server using Zod schemas to prevent malicious payloads'
        ],
        learningLinks: [
          { label: 'Next.js Server Actions & Mutations', url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How do Server Actions work under the hood over HTTP POST requests?',
          'Why is client-side validation alone insufficient for web applications?',
          'How do you handle optimistic UI updates with React 19’s `useOptimistic` hook and Next.js Server Actions?'
        ]
      },
      {
        id: 'fen-4',
        title: '4. Edge Middleware, Cookie Auth & Route Interception',
        completed: false,
        overview: 'Edge runtime request interceptors, JWT authentication in HttpOnly cookies, geo-routing, and parallel/intercepting routes.',
        keyTakeaways: [
          'Middleware runs at Edge V8 isolates before request reaches page renderer',
          'Ideal for verifying session cookies, redirects, and A/B test routing',
          'Parallel and Intercepting Routes enable modal URL overlays without losing background page context'
        ],
        learningLinks: [
          { label: 'Next.js Middleware Guide', url: 'https://nextjs.org/docs/app/building-your-application/routing/middleware', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What are the limitations of the Next.js Edge Runtime compared to standard Node.js runtime?',
          'How do you protect private routes and redirect unauthenticated users using Next.js Middleware?',
          'What are Intercepting Routes in Next.js and how do they create photo feed modals like Instagram?'
        ]
      },
      {
        id: 'fen-5',
        title: '5. Core Web Vitals Optimization (LCP, CLS, INP)',
        completed: false,
        overview: 'Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS), Next.js Image component, and font self-hosting.',
        keyTakeaways: [
          'Next/Image automatically generates responsive WebP/AVIF formats and prevents layout shifts with aspect ratios',
          'Next/Font self-hosts Google Fonts with zero layout shifts via font fallback adjustments',
          'INP optimizes main thread blocking time by breaking up heavy JavaScript tasks with `requestIdleCallback`'
        ],
        learningLinks: [
          { label: 'web.dev - Core Web Vitals Hub', url: 'https://web.dev/explore/fast', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What causes poor Largest Contentful Paint (LCP) and how do priority image preload tags resolve it?',
          'How does Interaction to Next Paint (INP) differ from the older First Input Delay (FID) metric?',
          'How does Next.js Image component prevent Cumulative Layout Shift (CLS)?'
        ]
      }
    ]
  },

  {
    id: 'fe-typescript',
    categoryGroup: 'Frontend',
    category: 'TypeScript & Modern JavaScript Internals',
    description: 'Deep dive into TypeScript type system, generics, ES6+ asynchronous runtimes, and DOM internals.',
    icon: 'Layout',
    isCoreCS: false,
    applicableRoles: [
      'Frontend Engineer (React / Next.js / UI Architecture)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Software Development Engineer in Test (SDET / Automation)'
    ],
    topics: [
      {
        id: 'fet-1',
        title: '1. JavaScript Event Loop, Microtasks, Closures & Prototypes',
        completed: false,
        overview: 'Call stack, Web APIs, Microtask Queue (Promises, queueMicrotask), Macrotask Queue (setTimeout), lexical closures, and prototypical inheritance.',
        keyTakeaways: [
          'Microtasks drain completely after current execution stack before the event loop picks the next macrotask',
          'Closures retain references to their outer lexical environment; uncleaned listeners cause memory leaks',
          'Every JavaScript object has an internal `[[Prototype]]` link forming the prototype chain ending at `Object.prototype`'
        ],
        learningLinks: [
          { label: 'MDN - Event Loop Deep Dive', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop', tag: 'MDN' },
          { label: 'MDN - Closures Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', tag: 'MDN' }
        ],
        interviewQuestions: [
          'Walk through the exact console output order of setTimeout, Promise.resolve().then(), and process.nextTick() / queueMicrotask().',
          'How do JavaScript closures retain memory and how can they inadvertently create memory leaks?',
          'Explain prototypical inheritance and what happens when accessing a missing property on an object.'
        ]
      },
      {
        id: 'fet-2',
        title: '2. TypeScript Generics, Utility Types, Keyof & Conditional Types',
        completed: false,
        overview: 'Generic type constraints (`<T extends object>`), keyof operator, mapped types, utility types (`Partial`, `Pick`, `Omit`, `Record`), and infer keywords.',
        keyTakeaways: [
          'Generics create reusable, type-safe data abstractions without sacrificing compile-time type checking',
          '`keyof T` produces a union of string/number literal keys of an interface',
          'Conditional Types (`T extends U ? X : Y`) enable dynamic type deduction based on input constraints'
        ],
        learningLinks: [
          { label: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How do you write a custom implementation of TypeScript’s `ReturnType<T>` utility type using the `infer` keyword?',
          'What is the difference between `interface` and `type` in TypeScript, and when should you choose one over the other?',
          'Explain how generic constraints `<T extends { id: string }>` prevent runtime property access bugs.'
        ]
      },
      {
        id: 'fet-3',
        title: '3. Type Narrowing, Discriminated Unions & Type Guards',
        completed: false,
        overview: 'Type guards (`typeof`, `instanceof`, `is`), discriminated union patterns with literal tag properties, and exhaustive `never` checks.',
        keyTakeaways: [
          'Discriminated unions share a common literal discriminant property (e.g. `type: "success" | "error"`)',
          'User-defined type guards use the `value is Type` predicate return type for custom validation',
          'Exhaustive checking: assigning remaining values to type `never` ensures all union cases are handled at compile time'
        ],
        learningLinks: [
          { label: 'TypeScript - Type Narrowing', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How do Discriminated Unions enable type-safe pattern matching in TypeScript switch statements?',
          'Write a custom Type Guard function `isUser(obj: any): obj is User` and explain how the compiler utilizes it.',
          'What is the purpose of the `never` type in exhaustive pattern matching?'
        ]
      },
      {
        id: 'fet-4',
        title: '4. Web APIs: WebSockets, Web Workers, IndexedDB & LocalStorage',
        completed: false,
        overview: 'Browser storage limits, full-duplex WebSocket connections, offloading heavy CPU computation to Web Workers, and IndexedDB transactions.',
        keyTakeaways: [
          'LocalStorage is synchronous, blocking, and limited to 5MB (vulnerable to XSS); never store sensitive JWTs there',
          'Web Workers run in background threads with their own global context (no direct DOM access; communicate via `postMessage`)',
          'IndexedDB provides asynchronous transactional client-side storage for large offline datasets'
        ],
        learningLinks: [
          { label: 'MDN - Web APIs Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/API', tag: 'MDN' }
        ],
        interviewQuestions: [
          'Why should CPU-intensive computations (e.g. image processing) be delegated to Web Workers in client applications?',
          'Compare LocalStorage vs SessionStorage vs Cookies vs IndexedDB in terms of capacity, persistence, and security.',
          'How does the browser handle WebSocket connection upgrades from HTTP 101 Switching Protocols?'
        ]
      }
    ]
  },

  {
    id: 'fe-css-performance',
    categoryGroup: 'Frontend',
    category: 'Modern CSS, Tailwind & UI Engineering',
    description: 'Flexbox/Grid mastery, container queries, CSS variables, animation performance, and critical rendering path.',
    icon: 'Layout',
    isCoreCS: false,
    applicableRoles: [
      'Frontend Engineer (React / Next.js / UI Architecture)',
      'Full Stack Engineer (MERN / Next.js / APIs)'
    ],
    topics: [
      {
        id: 'fec-1',
        title: '1. CSS Flexbox & Grid Masterclass with Subgrid',
        completed: false,
        overview: '1D vs 2D layout engines, alignment axes, auto-fit/auto-fill responsive grids, subgrid alignment, and container queries.',
        keyTakeaways: [
          'Flexbox manages 1-dimensional row or column flows; CSS Grid handles 2-dimensional row + column alignment simultaneously',
          '`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` creates responsive grids without media queries',
          'Container Queries (`@container`) style components based on parent container width rather than viewport width'
        ],
        learningLinks: [
          { label: 'MDN - CSS Grid Layout', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids', tag: 'MDN' },
          { label: 'MDN - CSS Flexbox Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox', tag: 'MDN' }
        ],
        interviewQuestions: [
          'What is the difference between `auto-fit` and `auto-fill` in CSS Grid?',
          'How do Container Queries solve responsive component modularity better than traditional Viewport Media Queries?',
          'Explain CSS specificity calculation and cascade layering (`@layer`).'
        ]
      },
      {
        id: 'fec-2',
        title: '2. Tailwind CSS Architecture & Tokenized Design Systems',
        completed: false,
        overview: 'Utility-first styling, JIT compiler, theme customization, CSS variable design tokens (HSL dark mode), and class merging (`clsx`, `tailwind-merge`).',
        keyTakeaways: [
          'Tailwind JIT engine scans source files to generate only the CSS classes actually used (sub-10KB production stylesheets)',
          'CSS Variables (`var(--primary)`) enable dynamic runtime theme and dark mode switching without re-rendering stylesheets',
          '`tailwind-merge` intelligently resolves conflicting utility classes (e.g. `p-4` vs `p-2`)'
        ],
        learningLinks: [
          { label: 'Tailwind CSS Official Documentation', url: 'https://tailwindcss.com/docs', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does the Tailwind CSS JIT (Just-In-Time) compiler optimize production bundle sizes?',
          'Why do class conflicts occur when combining utility props and how does `tailwind-merge` resolve them?',
          'How do you implement accessible dark mode using CSS custom properties and Tailwind `dark:` variants?'
        ]
      },
      {
        id: 'fec-3',
        title: '3. Browser Rendering Engine & Critical Rendering Path',
        completed: false,
        overview: 'DOM tree + CSSOM tree -> Render Tree -> Layout (Reflow) -> Paint -> Composite. GPU acceleration and transform/opacity animations.',
        keyTakeaways: [
          'Layout (Reflow) calculates geometry and positions of all elements; triggered by modifying `width`, `height`, `margin`, `top`',
          'Paint fills pixels; Composite layers together on GPU',
          'Animations on `transform` and `opacity` bypass Layout and Paint, running smoothly at 60 FPS on GPU compositor thread'
        ],
        learningLinks: [
          { label: 'web.dev - Rendering Performance', url: 'https://web.dev/explore/fast', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Walk through the step-by-step Critical Rendering Path from HTML byte stream to pixels on screen.',
          'What is the difference between Reflow (Layout) and Repaint, and why is Reflow more computationally expensive?',
          'Why do CSS `transform` and `opacity` properties animate with higher performance than `top` and `left`?'
        ]
      },
      {
        id: 'fec-4',
        title: '4. Web Accessibility (a11y), Semantic HTML & Keyboard Navigation',
        completed: false,
        overview: 'WCAG 2.2 guidelines, ARIA attributes, semantic landmarks (`<main>`, `<nav>`, `<aside>`), focus trapping in modals, and color contrast.',
        keyTakeaways: [
          'Use native semantic HTML elements (`<button>`, `<dialog>`) before reaching for custom `<div>` ARIA widgets',
          'Accessible name computation: `aria-label` > `aria-labelledby` > text content',
          'Accessible modals must trap keyboard focus (`Tab`) inside the modal dialog and close on `Escape`'
        ],
        learningLinks: [
          { label: 'MDN - Accessibility (a11y) Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility', tag: 'MDN' }
        ],
        interviewQuestions: [
          'What is the Accessibility Tree and how do screen readers use it to interact with web pages?',
          'How do you implement a keyboard-accessible modal dialog with proper focus management?',
          'What is the first rule of ARIA use according to W3C standards?'
        ]
      }
    ]
  },

  // ============================================================
  // 4. BACKEND ENGINEERING (4 Roadmaps)
  // ============================================================
  {
    id: 'be-node',
    categoryGroup: 'Backend',
    category: 'Node.js & Express Architecture',
    description: 'Build robust REST APIs, middleware pipelines, JWT auth, and database integrations.',
    icon: 'Server',
    isCoreCS: false,
    applicableRoles: [
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
      'Software Development Engineer in Test (SDET / Automation)'
    ],
    topics: [
      {
        id: 'ben-1',
        title: '1. Node.js Libuv, Event Loop, Non-blocking I/O & Streams',
        completed: false,
        overview: 'Understand Node.js single-threaded event loop phases (Timers, Poll, Check), thread pool (libuv), Buffers, and Streams.',
        keyTakeaways: [
          'Event Loop phases: Timers -> Pending Callbacks -> Idle/Prepare -> Poll -> Check (setImmediate) -> Close',
          'Microtasks (`process.nextTick` and resolved Promises) execute immediately after current operation, before moving to next phase',
          'Streams process large files in chunks without exhausting RAM; handle backpressure via `.pipe()`'
        ],
        learningLinks: [
          { label: 'Node.js Official Documentation', url: 'https://nodejs.org/docs/latest/api/', tag: 'Official Docs' },
          { label: 'Node.js Best Practices Repository', url: 'https://github.com/goldbergyoni/nodebestpractices', tag: 'GitHub' }
        ],
        interviewQuestions: [
          'Explain the step-by-step execution order of `setImmediate()`, `setTimeout()`, and `process.nextTick()`.',
          'What is Stream Backpressure and how does it prevent memory exhaustion when reading from a fast source to a slow sink?',
          'How does libuv execute asynchronous file system and DNS lookups on a single-threaded runtime?'
        ]
      },
      {
        id: 'ben-2',
        title: '2. Layered Architecture: Controllers, Services & Repositories',
        completed: false,
        overview: 'Clean separation of HTTP transport routing, business domain services, and database persistence layers.',
        keyTakeaways: [
          'Controllers parse HTTP requests, validate input schemas, and format HTTP status responses',
          'Services execute core business logic, transactions, and third-party integrations',
          'Repositories isolate database queries (SQL / Mongoose / Prisma) from business services'
        ],
        learningLinks: [
          { label: 'Node.js Best Practices Architecture', url: 'https://github.com/goldbergyoni/nodebestpractices', tag: 'GitHub' }
        ],
        interviewQuestions: [
          'Why should database queries never be written directly inside Express route controllers?',
          'How does the Controller-Service-Repository pattern make backend applications easily unit testable with mocks?',
          'What is Dependency Injection and how does it decouple service layers in Node.js / NestJS?'
        ]
      },
      {
        id: 'ben-3',
        title: '3. Authentication: JWT, Refresh Token Rotation & RBAC',
        completed: false,
        overview: 'Stateless JWT tokens, short-lived access tokens, refresh token rotation in HttpOnly cookies, and Role-Based Access Control.',
        keyTakeaways: [
          'Access Token (15m expiry) sent in Authorization header or httpOnly cookie; Refresh Token (7d) stored securely in DB with revocation whitelist',
          'Refresh Token Rotation: issuing a new refresh token on every refresh invalidates compromised tokens if reused',
          'RBAC middleware verifies permissions before routing traffic to protected handler'
        ],
        learningLinks: [
          { label: 'JWT.io - JSON Web Token Standard Guide', url: 'https://jwt.io/introduction', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How do you prevent XSS and CSRF attacks when storing JWT authentication tokens?',
          'Explain how Refresh Token Rotation detects stolen tokens and revokes active sessions.',
          'What information should and should NOT be placed inside a JWT payload?'
        ]
      },
      {
        id: 'ben-4',
        title: '4. Error Handling Middleware, Logging & Input Validation',
        completed: false,
        overview: 'Centralized error-handling middleware, operational vs programmer errors, structured JSON logging, and Zod validation.',
        keyTakeaways: [
          'Express error middleware requires 4 parameters `(err, req, res, next)` to be recognized by the runtime',
          'Operational errors (400 Invalid Input, 404 Not Found) are handled gracefully; Programmer errors (NullPointer) trigger safe process restart',
          'Structured JSON logs with Request IDs enable distributed tracing in production'
        ],
        learningLinks: [
          { label: 'Node.js Best Practices - Error Handling', url: 'https://github.com/goldbergyoni/nodebestpractices', tag: 'GitHub' }
        ],
        interviewQuestions: [
          'What is the difference between an Operational error and a Programmer error in Node.js?',
          'Why should unhandled Promise rejections and uncaught exceptions trigger process termination and restart?',
          'How do you implement centralized async error handling in Express without wrapping every route in try/catch?'
        ]
      }
    ]
  },

  {
    id: 'be-spring',
    categoryGroup: 'Backend',
    category: 'Java Spring Boot Enterprise SDE',
    description: 'Enterprise backend development with Spring Boot, Spring Security, Hibernate JPA, and Microservices.',
    icon: 'Server',
    isCoreCS: false,
    applicableRoles: [
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Software Development Engineer (SDE / Core DSA)'
    ],
    topics: [
      {
        id: 'bes-1',
        title: '1. Core Java 21: OOPs, Multithreading, Generics & Streams API',
        completed: false,
        overview: 'Virtual threads (Project Loom), concurrency utilities (`ExecutorService`, `ConcurrentHashMap`), functional Streams, and JVM memory layout (Heap, Metaspace, GC).',
        keyTakeaways: [
          'Java 21 Virtual Threads provide lightweight user-mode concurrency without 1:1 OS thread memory overhead',
          'Streams API enables declarative parallel data pipelines (`filter`, `map`, `reduce`)',
          'Garbage Collectors (G1GC, ZGC) minimize stop-the-world pauses in high-throughput JVM services'
        ],
        learningLinks: [
          { label: 'Oracle Java Documentation', url: 'https://docs.oracle.com/en/java/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What are Java 21 Virtual Threads (Project Loom) and how do they differ from traditional OS platform threads?',
          'Explain the internal workings of `ConcurrentHashMap` in Java (Segment locking vs CAS bucket locks).',
          'How does the Java Garbage Collector manage Young Generation vs Old (Tenured) Generation memory?'
        ]
      },
      {
        id: 'bes-2',
        title: '2. Spring Boot Dependency Injection, Annotations & Auto-Config',
        completed: false,
        overview: 'Inversion of Control (IoC) container, Bean scopes (Singleton, Prototype), `@Autowired`, `@Component`, `@Service`, and Spring Boot starters.',
        keyTakeaways: [
          'IoC container instantiates, configures, and manages bean lifecycles via constructor injection',
          '`@SpringBootApplication` combines `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`',
          'Constructor injection is preferred over field injection for immutability and testability'
        ],
        learningLinks: [
          { label: 'Spring Boot Official Documentation', url: 'https://spring.io/projects/spring-boot', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain Inversion of Control (IoC) and Dependency Injection (DI) in Spring Boot.',
          'Why is constructor-based dependency injection recommended over field-based `@Autowired`?',
          'How does Spring Boot’s `@EnableAutoConfiguration` automatically configure embedded Tomcat and DataSource?'
        ]
      },
      {
        id: 'bes-3',
        title: '3. Spring Data JPA, Hibernate, Connection Pooling & Transactions',
        completed: false,
        overview: 'ORM entities, HikariCP connection pool, lazy vs eager loading, N+1 query problem, and `@Transactional` propagation.',
        keyTakeaways: [
          'Hibernate maps Java entity classes to relational tables via JPA annotations',
          'N+1 Problem: fetching 1 parent triggers N individual child queries; solve with `JOIN FETCH` or `@EntityGraph`',
          '`@Transactional` manages commit and rollback boundaries via Spring AOP proxies'
        ],
        learningLinks: [
          { label: 'Spring Data JPA Documentation', url: 'https://spring.io/projects/spring-data-jpa', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the N+1 SELECT problem in Hibernate and how do you resolve it using JOIN FETCH?',
          'How does `@Transactional` propagation work (REQUIRED vs REQUIRES_NEW)?',
          'What is First-Level Cache (Persistence Context) vs Second-Level Cache in Hibernate?'
        ]
      },
      {
        id: 'bes-4',
        title: '4. Spring Security with JWT & OAuth2 Resource Server',
        completed: false,
        overview: 'SecurityFilterChain, authentication filters, UserDetailsService, stateless JWT validation, and method-level security (`@PreAuthorize`).',
        keyTakeaways: [
          'Spring Security architecture routes requests through a chain of servlet filters',
          'Stateless REST APIs disable session cookies and CSRF protection in favor of JWT bearer tokens',
          '`@PreAuthorize("hasRole(\'ADMIN\')")` enforces fine-grained authorization at controller method level'
        ],
        learningLinks: [
          { label: 'Spring Security Official Docs', url: 'https://spring.io/projects/spring-security', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does Spring Security Filter Chain intercept and authenticate incoming HTTP requests?',
          'Explain how to configure stateless JWT authentication filter in Spring Security 6.',
          'What is the difference between Authentication and Authorization in Spring Security?'
        ]
      },
      {
        id: 'bes-5',
        title: '5. Microservices with Eureka, Spring Cloud Gateway & Kafka',
        completed: false,
        overview: 'Service discovery (Eureka), dynamic routing (Spring Cloud Gateway), distributed resilience (Resilience4j Circuit Breaker), and asynchronous messaging with Kafka.',
        keyTakeaways: [
          'Eureka service registry allows microservices to dynamically locate each other by service name',
          'Spring Cloud Gateway provides reverse proxy, SSL termination, and rate limiting',
          'Kafka decouples synchronous REST calls into event-driven asynchronous message publishing'
        ],
        learningLinks: [
          { label: 'Spring Cloud Documentation', url: 'https://spring.io/projects/spring-cloud', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the role of an API Gateway in a microservices architecture?',
          'How does the Circuit Breaker pattern (Resilience4j) prevent cascading failures across distributed microservices?',
          'How do you maintain data consistency across multiple microservices databases using the Saga Pattern?'
        ]
      }
    ]
  },

  {
    id: 'be-python',
    categoryGroup: 'Backend',
    category: 'Python & FastAPI High-Performance Backend',
    description: 'Asynchronous backend systems, Pydantic data schemas, SQLAlchemy ORM, and Celery workers.',
    icon: 'Server',
    isCoreCS: false,
    applicableRoles: [
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)'
    ],
    topics: [
      {
        id: 'bep-1',
        title: '1. Python 3 Asyncio, Coroutines, Generators & Type Hints',
        completed: false,
        overview: 'Asynchronous event loop in Python, `async`/`await` keywords, coroutines, generators (`yield`), and static type hints (`typing`).',
        keyTakeaways: [
          'Python `asyncio` runs single-threaded concurrent I/O operations on an event loop',
          'Global Interpreter Lock (GIL) limits multi-threaded CPU execution; use `multiprocessing` for CPU-bound tasks',
          'Type hints enable static analysis with mypy and automatic schema validation in FastAPI'
        ],
        learningLinks: [
          { label: 'Python Official Documentation', url: 'https://docs.python.org/3/', tag: 'Official Docs' },
          { label: 'FastAPI Official Documentation', url: 'https://fastapi.tiangolo.com/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the Python Global Interpreter Lock (GIL) and how does it affect CPU-bound vs I/O-bound concurrency?',
          'How does Python’s `asyncio` event loop differ from multi-threading and multi-processing?',
          'Explain how Python generators (`yield`) achieve lazy evaluation and low memory consumption.'
        ]
      },
      {
        id: 'bep-2',
        title: '2. FastAPI Dependency Injection, Path Operations & Swagger',
        completed: false,
        overview: 'Declarative endpoint routing, Pydantic request/response models, automatic OpenAPI/Swagger documentation, and dependency injection (`Depends`).',
        keyTakeaways: [
          'FastAPI builds on Starlette (async web framework) and Pydantic (data parsing/validation)',
          '`Depends()` manages database sessions, authentication checks, and shared logic cleanly',
          'Automatic interactive API documentation generated at `/docs` (Swagger UI) and `/redoc`'
        ],
        learningLinks: [
          { label: 'FastAPI Tutorial & User Guide', url: 'https://fastapi.tiangolo.com/tutorial/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does FastAPI achieve high performance comparable to Node.js and Go?',
          'How does FastAPI’s Dependency Injection system (`Depends`) simplify database session management?',
          'How does Pydantic perform runtime data validation and serialization in FastAPI?'
        ]
      },
      {
        id: 'bep-3',
        title: '3. SQLAlchemy 2.0 Async ORM & Alembic Database Migrations',
        completed: false,
        overview: 'Declarative async models, `AsyncSession`, select queries, relationship joins, and automated schema migration scripts with Alembic.',
        keyTakeaways: [
          'SQLAlchemy 2.0 provides unified `select()` syntax with full async engine support (`asyncpg`)',
          'Alembic tracks database schema versions via Git-controlled migration revisions',
          'Use `selectinload` or `joinedload` to prevent N+1 query latency in async relationships'
        ],
        learningLinks: [
          { label: 'SQLAlchemy 2.0 Documentation', url: 'https://docs.sqlalchemy.org/en/20/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the difference between SQLAlchemy Core and SQLAlchemy ORM?',
          'How do you manage async database connections and transaction rollbacks using SQLAlchemy 2.0 and asyncpg?',
          'How does Alembic generate and execute forward (`upgrade`) and backward (`downgrade`) database migrations?'
        ]
      },
      {
        id: 'bep-4',
        title: '4. Background Tasks with Celery & Redis Message Broker',
        completed: false,
        overview: 'Distributed task queues, asynchronous job processing (emails, report generation, ML inference), and periodic cron schedules with Celery Beat.',
        keyTakeaways: [
          'Celery offloads long-running tasks from HTTP request/response lifecycles to background worker processes',
          'Redis or RabbitMQ acts as the message broker passing serialized task payloads',
          'Celery Beat triggers scheduled recurring cron jobs'
        ],
        learningLinks: [
          { label: 'Celery Official Documentation', url: 'https://docs.celeryq.dev/en/stable/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Why should long-running jobs (e.g. PDF generation, ML inference) never be executed synchronously in API handlers?',
          'How do Celery workers communicate with message brokers (Redis/RabbitMQ) and result backends?',
          'How do you handle task retries with exponential backoff in Celery during external API downtime?'
        ]
      }
    ]
  },

  {
    id: 'be-go',
    categoryGroup: 'Backend',
    category: 'Go (Golang) Microservices & Concurrency',
    description: 'Goroutines, channels, mutexes, Gin web framework, GORM, and high-throughput gRPC services.',
    icon: 'Server',
    isCoreCS: false,
    applicableRoles: [
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)'
    ],
    topics: [
      {
        id: 'beg-1',
        title: '1. Go Syntax, Structs, Interfaces & Pointers',
        completed: false,
        overview: 'Type system, implicit interface implementation, struct embedding (composition over inheritance), error handling conventions, and memory pointers.',
        keyTakeaways: [
          'Go interfaces are satisfied implicitly (no `implements` keyword)',
          'Explicit error handling: functions return `(result, err)` tuple; no try/catch exceptions',
          'Pass-by-value vs pass-by-pointer: pointers avoid copying large struct values in memory'
        ],
        learningLinks: [
          { label: 'Go Official Documentation', url: 'https://go.dev/doc/', tag: 'Official Docs' },
          { label: 'A Tour of Go', url: 'https://go.dev/tour/', tag: 'Interactive' }
        ],
        interviewQuestions: [
          'How does Go implement polymorphism and interfaces without an explicit `implements` keyword?',
          'What is the difference between passing a pointer vs value to a function in Go?',
          'Why does Go enforce explicit `if err != nil` error handling instead of try/catch exceptions?'
        ]
      },
      {
        id: 'beg-2',
        title: '2. Goroutines, Channels & Synchronization Primitives',
        completed: false,
        overview: 'Lightweight user-space threads (Goroutines), buffered vs unbuffered channels, `select` statements, `sync.Mutex`, and `sync.WaitGroup`.',
        keyTakeaways: [
          'Goroutines require only 2KB initial stack memory compared to 1MB OS thread stack',
          'Unbuffered channels synchronize sender and receiver (blocking); buffered channels allow async queues up to capacity',
          '`sync.WaitGroup` coordinates graceful shutdown and waiting for concurrent Goroutines to finish'
        ],
        learningLinks: [
          { label: 'Go - Concurrency Tour', url: 'https://go.dev/tour/concurrency/1', tag: 'Interactive' }
        ],
        interviewQuestions: [
          'What makes Go Goroutines significantly more lightweight than OS threads?',
          'Explain the difference between Buffered and Unbuffered channels with communication deadlock examples.',
          'How do you detect and prevent Race Conditions in Go using the `-race` detector flag?'
        ]
      },
      {
        id: 'beg-3',
        title: '3. REST APIs with Gin / Fiber Web Framework & GORM',
        completed: false,
        overview: 'High-throughput HTTP routing, middleware chains (CORS, JWT auth, logging), struct validation, and database operations with GORM / pgx.',
        keyTakeaways: [
          'Gin uses a Radix Tree for rapid URL path matching with zero dynamic memory allocations',
          'Context (`c *gin.Context`) carries request state, cancellation signals, and JSON serialization helpers',
          'Direct SQL with `pgx` is often preferred over heavy ORMs in high-performance Go services'
        ],
        learningLinks: [
          { label: 'Gin Web Framework Official Guide', url: 'https://gin-gonic.com/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does Go’s Radix Tree URL routing achieve microsecond API response latency in Gin?',
          'How do you implement centralized middleware for JWT authentication and error logging in Gin?',
          'What is Context propagation (`context.Context`) in Go HTTP handlers and why is it essential for timeouts?'
        ]
      },
      {
        id: 'beg-4',
        title: '4. gRPC Services & Protocol Buffers (Protobuf)',
        completed: false,
        overview: 'Binary serialization with Protobuf (`.proto` files), HTTP/2 transport, unary vs streaming RPCs, and high-performance microservices communication.',
        keyTakeaways: [
          'Protocol Buffers serialize structured data into compact binary payloads (5-10x smaller and faster than JSON)',
          'gRPC runs over HTTP/2 providing multiplexing, bidirectional streaming, and strictly typed contracts',
          'Ideal for low-latency internal microservices communication'
        ],
        learningLinks: [
          { label: 'gRPC Official Go Quickstart', url: 'https://grpc.io/docs/languages/go/quickstart/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Why is gRPC over HTTP/2 significantly faster than traditional REST over JSON over HTTP/1.1?',
          'What are the 4 types of gRPC service methods (Unary, Server Streaming, Client Streaming, Bidirectional)?',
          'How do Protocol Buffers handle backward and forward schema compatibility across service versions?'
        ]
      }
    ]
  },

  // ============================================================
  // 5. SYSTEM DESIGN & ARCHITECTURE (2 Roadmaps)
  // ============================================================
  {
    id: 'sys-hld',
    categoryGroup: 'System Design',
    category: 'High-Level Distributed Systems (HLD)',
    description: 'Scalability, Load Balancing, Database Sharding, Caching strategies, and CAP theorem for Tier-1 interviews.',
    icon: 'GitBranch',
    isCoreCS: false,
    applicableRoles: [
      'Software Development Engineer (SDE / Core DSA)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)'
    ],
    topics: [
      {
        id: 'hld-1',
        title: '1. Vertical vs Horizontal Scaling, Load Balancers (L4 vs L7)',
        completed: false,
        overview: 'Stateless server tiers, round-robin/least-connections algorithms, Layer 4 TCP vs Layer 7 HTTP load balancing, and SSL termination.',
        keyTakeaways: [
          'Horizontal scaling adds commodity machines; requires stateless application tier storing sessions in Redis',
          'L4 Load Balancers route packets at transport layer based on IP + Port (high throughput); L7 routes based on HTTP headers, cookies, URL path',
          'Consistent Hashing prevents cache stampedes when scaling distributed server clusters'
        ],
        learningLinks: [
          { label: 'System Design Primer - Scalability', url: 'https://github.com/donnemartin/system-design-primer', tag: 'GitHub' }
        ],
        interviewQuestions: [
          'What is the difference between a Layer 4 and a Layer 7 Load Balancer?',
          'How does Consistent Hashing work and why is virtual nodes replication necessary?',
          'How do you handle session persistence across multiple stateless application instances?'
        ]
      },
      {
        id: 'hld-2',
        title: '2. Database Sharding, Replication & CAP / PACELC Theorem',
        completed: false,
        overview: 'Partitioning strategies, read replicas, master-slave vs master-master replication, split-brain problem, and consistency models.',
        keyTakeaways: [
          'Horizontal Sharding divides rows across databases using Shard Key (Hash-based vs Range-based)',
          'CAP Theorem: In the presence of a Network Partition (P), you must choose between Consistency (C) or Availability (A)',
          'PACELC Theorem: If Partition (P) -> choose Availability (A) or Consistency (C); Else (E) -> choose Latency (L) or Consistency (C)'
        ],
        learningLinks: [
          { label: 'System Design Primer - Database Sharding', url: 'https://github.com/donnemartin/system-design-primer#database-sharding', tag: 'GitHub' }
        ],
        interviewQuestions: [
          'What are the challenges of database sharding (e.g. cross-shard joins, resharding, distributed transactions)?',
          'Explain the PACELC theorem and give an example of an AP/EL vs CP/EC database.',
          'How do you prevent the Split-Brain scenario in a multi-master distributed database cluster?'
        ]
      },
      {
        id: 'hld-3',
        title: '3. Distributed Caching (Redis, Cache-Aside, Write-Through)',
        completed: false,
        overview: 'Caching patterns, TTL eviction policies (LRU, LFU), cache penetration, cache breakdown, and cache avalanche prevention.',
        keyTakeaways: [
          'Cache-Aside: App reads from cache; on miss, reads from DB and populates cache',
          'Write-Through: App writes to cache; cache writes to DB synchronously; Write-Back: Cache writes to DB asynchronously',
          'Cache Avalanche: many keys expire simultaneously -> add random TTL jitter to smooth spikes'
        ],
        learningLinks: [
          { label: 'Redis Official Documentation', url: 'https://redis.io/docs/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain Cache Penetration, Cache Breakdown, and Cache Avalanche, and how to resolve each.',
          'Compare Cache-Aside vs Write-Through vs Write-Back caching strategies.',
          'How does Redis achieve single-threaded high throughput using non-blocking I/O multiplexing (epoll)?'
        ]
      },
      {
        id: 'hld-4',
        title: '4. Message Queues (Kafka / RabbitMQ) & Event-Driven Systems',
        completed: false,
        overview: 'Point-to-point queues vs pub/sub event logs, partition ordering, consumer groups, idempotency, and at-least-once delivery.',
        keyTakeaways: [
          'RabbitMQ is a message broker (pushes messages to consumers, deletes on ACK)',
          'Kafka is a distributed commit log (pull-based, retains messages on disk, consumer tracks offset)',
          'Kafka partition ordering: messages with the same partition key are strictly ordered within that partition'
        ],
        learningLinks: [
          { label: 'Apache Kafka Official Documentation', url: 'https://kafka.apache.org/documentation/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the fundamental architectural difference between RabbitMQ and Apache Kafka?',
          'How do consumer groups in Kafka enable horizontal scaling of message processing?',
          'How do you design idempotent consumers to handle duplicate message deliveries safely?'
        ]
      },
      {
        id: 'hld-5',
        title: '5. System Blueprint: Design URL Shortener (TinyURL) & Rate Limiter',
        completed: false,
        overview: 'End-to-end system design interview blueprints covering API design, database schemas, capacity estimation, and bottlenecks.',
        keyTakeaways: [
          'TinyURL: Base62 encoding (62^7 = 3.5 trillion URLs) + pre-generated Key Generation Service (KGS) to avoid collisions',
          'Rate Limiter: Sliding Window Counter or Token Bucket in Redis with atomic Lua scripts',
          'System Design Framework: Requirements -> Capacity Planning -> High Level Diagram -> Deep Dives -> Bottlenecks'
        ],
        learningLinks: [
          { label: 'System Design Primer - Interview Solutions', url: 'https://github.com/donnemartin/system-design-primer', tag: 'GitHub' }
        ],
        interviewQuestions: [
          'Design a distributed URL shortener (TinyURL) handling 500 million new URLs per month.',
          'Design an API Rate Limiter handling 100,000 requests per second across distributed nodes.',
          'How do you prevent race conditions when updating token bucket counters in Redis?'
        ]
      }
    ]
  },

  {
    id: 'sys-api-security',
    categoryGroup: 'System Design',
    category: 'Distributed API Architecture & Security',
    description: 'REST vs GraphQL vs gRPC, OAuth2/OIDC, API Gateways, Rate Limiting, and Distributed Tracing.',
    icon: 'GitBranch',
    isCoreCS: false,
    applicableRoles: [
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
      'Full Stack Engineer (MERN / Next.js / APIs)'
    ],
    topics: [
      {
        id: 'sec-1',
        title: '1. API Styles: REST vs GraphQL vs gRPC & WebSockets',
        completed: false,
        overview: 'Architectural evaluation of API communication protocols: over-fetching/under-fetching, schema enforcement, binary serialization, and bidirectional event streams.',
        keyTakeaways: [
          'REST: Resource-oriented, HTTP cacheable, standard status codes (universal public APIs)',
          'GraphQL: Single endpoint, client requests exact fields (eliminates over-fetching in mobile apps)',
          'gRPC: Binary Protobuf over HTTP/2 for ultra-fast internal microservices RPCs',
          'WebSockets: Persistent bidirectional TCP connection for real-time multiplayer/chat'
        ],
        learningLinks: [
          { label: 'GraphQL Official Documentation', url: 'https://graphql.org/learn/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'When should you choose GraphQL over REST and what are the caching challenges associated with GraphQL?',
          'How does gRPC compare to REST in terms of payload size, serialization latency, and browser support?',
          'What are the security concerns with GraphQL (e.g. query depth attacks, circular queries) and how do you mitigate them?'
        ]
      },
      {
        id: 'sec-2',
        title: '2. OAuth 2.0, OpenID Connect (OIDC) & API Key Management',
        completed: false,
        overview: 'Authorization grant types (Authorization Code with PKCE, Client Credentials), ID tokens vs Access tokens, scopes, and key rotation.',
        keyTakeaways: [
          'OAuth 2.0 is an authorization framework (delegated access); OpenID Connect (OIDC) adds authentication (identity layer)',
          'PKCE (Proof Key for Code Exchange) protects public single-page and mobile apps from authorization code interception',
          'Never store API keys or private client secrets in frontend client code'
        ],
        learningLinks: [
          { label: 'OAuth 2.0 Official Specs & Guides', url: 'https://oauth.net/2/', tag: 'Official Docs' },
          { label: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/', tag: 'Security' }
        ],
        interviewQuestions: [
          'Walk through the complete OAuth 2.0 Authorization Code Flow with PKCE.',
          'What is the difference between an ID Token (JWT) and an Access Token in OpenID Connect?',
          'How do you secure third-party webhook callbacks using HMAC SHA-256 signature verification?'
        ]
      },
      {
        id: 'sec-3',
        title: '3. API Gateways, Rate Limiting & Denial of Service Protection',
        completed: false,
        overview: 'Reverse proxy routing, Token Bucket rate limiting, mutual TLS (mTLS), Web Application Firewalls (WAF), and DDoS mitigation.',
        keyTakeaways: [
          'API Gateway handles cross-cutting concerns: SSL termination, centralized authentication, CORS, rate limiting, and request logging',
          'Token Bucket algorithm allows traffic bursts up to bucket capacity while maintaining steady replenishment rate',
          'mTLS enforces bidirectional certificate verification between internal microservices'
        ],
        learningLinks: [
          { label: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/', tag: 'Security' }
        ],
        interviewQuestions: [
          'How does the Token Bucket algorithm differ from the Leaky Bucket algorithm in API rate limiters?',
          'What is Mutual TLS (mTLS) and why is it standard for Zero-Trust internal microservice communication?',
          'How do API Gateways prevent Broken Object Level Authorization (BOLA / IDOR) vulnerabilities?'
        ]
      },
      {
        id: 'sec-4',
        title: '4. Distributed Tracing & Observability with OpenTelemetry',
        completed: false,
        overview: 'Distributed trace IDs, span contexts, W3C Trace Context headers, metrics, logs, and distributed latency bottleneck debugging.',
        keyTakeaways: [
          'Distributed Tracing propagates `traceparent` headers across HTTP/gRPC hops to track end-to-end request journeys',
          'Spans represent individual units of work with duration timestamps, tags, and error logs',
          'OpenTelemetry provides vendor-neutral instrumentation standards exportable to Jaeger, Prometheus, or Datadog'
        ],
        learningLinks: [
          { label: 'OpenTelemetry Official Documentation', url: 'https://opentelemetry.io/docs/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does Distributed Tracing track a single user request across 10 microservices and database calls?',
          'What is the difference between Metrics, Logs, and Traces (the 3 pillars of Observability)?',
          'How do trace sampling strategies (head-based vs tail-based) control monitoring cost and data volume?'
        ]
      }
    ]
  },

  // ============================================================
  // 6. DEVOPS & CLOUD INFRASTRUCTURE (3 Roadmaps)
  // ============================================================
  {
    id: 'do-docker-k8s',
    categoryGroup: 'DevOps',
    category: 'Docker & Kubernetes Orchestration',
    description: 'Container packaging, multi-stage Dockerfiles, Kubernetes pods, deployments, and cluster networking.',
    icon: 'Cpu',
    isCoreCS: false,
    applicableRoles: [
      'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Full Stack Engineer (MERN / Next.js / APIs)'
    ],
    topics: [
      {
        id: 'ddk-1',
        title: '1. Docker Architecture, Namespaces, Cgroups & Multi-Stage Builds',
        completed: false,
        overview: 'Linux namespaces (isolation), cgroups (resource limits), union file systems (overlay2), and production multi-stage Docker builds.',
        keyTakeaways: [
          'Namespaces isolate processes, networks, mounts, IPC, and users; cgroups enforce CPU, RAM, and I/O resource limits',
          'Docker images are read-only layered file systems; containers add a thin read-write layer on top',
          'Multi-stage builds compile code in a heavy build stage and copy only artifacts into a slim runtime image (reducing image size by 10x)'
        ],
        learningLinks: [
          { label: 'Docker Official Documentation', url: 'https://docs.docker.com/get-started/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What Linux kernel mechanisms (Namespaces, Cgroups, Chroot) make Docker containers possible?',
          'Why should production Docker containers never run as the `root` user?',
          'Explain how Docker layer caching works and how to order Dockerfile instructions to maximize cache hits.'
        ]
      },
      {
        id: 'ddk-2',
        title: '2. Docker Compose for Multi-Container Development Environments',
        completed: false,
        overview: 'Declarative container orchestration, bridged container networking, volume mounts, and environment configuration.',
        keyTakeaways: [
          'Docker Compose provisions multi-container setups (App + Database + Redis + Queue) via `docker-compose.yml`',
          'Containers on the same user-defined network resolve each other by service name via internal DNS',
          'Named volumes persist data across container restarts; bind mounts map host source code for hot reload'
        ],
        learningLinks: [
          { label: 'Docker Compose Official Guide', url: 'https://docs.docker.com/compose/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How do containers communicate with each other inside a user-defined Docker Compose network?',
          'What is the difference between a Bind Mount and a Named Volume in Docker?',
          'How do you manage environment secrets and `.env` files safely in Docker Compose?'
        ]
      },
      {
        id: 'ddk-3',
        title: '3. Kubernetes Architecture: Control Plane, Nodes, Pods & Services',
        completed: false,
        overview: 'API Server, etcd, Scheduler, Kubelet, Pod lifecycle, ClusterIP vs NodePort vs LoadBalancer services, and Ingress.',
        keyTakeaways: [
          'Control Plane components: API Server (entrypoint), etcd (distributed state store), Kube-Scheduler, Controller-Manager',
          'Worker Node components: Kubelet (node agent), Kube-Proxy (networking rules), Container Runtime',
          'ClusterIP provides internal load-balanced IP; NodePort exposes port on each node; Ingress manages L7 routing with SSL'
        ],
        learningLinks: [
          { label: 'Kubernetes Official Documentation', url: 'https://kubernetes.io/docs/concepts/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain the role of each Kubernetes Control Plane component (API Server, etcd, Scheduler, Controller Manager).',
          'What is the difference between a Kubernetes Pod and a Deployment?',
          'Compare ClusterIP, NodePort, LoadBalancer, and Ingress Controller in Kubernetes networking.'
        ]
      },
      {
        id: 'ddk-4',
        title: '4. ConfigMaps, Secrets, Probes & Horizontal Pod Autoscaling (HPA)',
        completed: false,
        overview: 'Decoupled environment configuration, Base64 secrets, Liveness/Readiness probes, and metrics-driven auto-scaling.',
        keyTakeaways: [
          'Liveness Probe checks if container is alive (restarts if failed); Readiness Probe checks if container is ready to accept traffic (removes from Service if failed)',
          'ConfigMaps store non-confidential key-value pairs; Secrets store encrypted credentials injected as env vars or volumes',
          'Horizontal Pod Autoscaler (HPA) automatically adjusts replica count based on CPU, memory, or custom metrics'
        ],
        learningLinks: [
          { label: 'Kubernetes - Pod Lifecycle & Probes', url: 'https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the critical difference between a Liveness Probe and a Readiness Probe in Kubernetes?',
          'Why should a liveness probe NOT check downstream database availability?',
          'How does the Horizontal Pod Autoscaler (HPA) scale pods in response to traffic spikes?'
        ]
      }
    ]
  },

  {
    id: 'do-cicd-cloud',
    categoryGroup: 'DevOps',
    category: 'CI/CD Pipelines & AWS Cloud Deployment',
    description: 'Automated test & release pipelines with GitHub Actions, AWS EC2, S3, RDS, and serverless hosting.',
    icon: 'Cpu',
    isCoreCS: false,
    applicableRoles: [
      'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Full Stack Engineer (MERN / Next.js / APIs)'
    ],
    topics: [
      {
        id: 'dcc-1',
        title: '1. Git Workflows: Branching Strategies, Pull Requests & Rebase Workflows',
        completed: false,
        overview: 'Git Flow, Trunk-Based Development, merge vs rebase, interactive rebasing, merge conflicts, and commit squashing.',
        keyTakeaways: [
          'Trunk-Based Development practices frequent, short-lived branch merges to main for rapid CI deployment',
          '`git rebase` replays commits onto target branch maintaining clean linear history; `git merge` preserves merge commit topology',
          'Squashing commits combines exploratory commit noise into single descriptive feature commits'
        ],
        learningLinks: [
          { label: 'Git Official Documentation', url: 'https://git-scm.com/doc', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain the fundamental difference between `git merge` and `git rebase` and when to use each.',
          'How does Trunk-Based Development prevent long-lived merge conflicts compared to Git Flow?',
          'What happens under the hood during a `git cherry-pick` operation?'
        ]
      },
      {
        id: 'dcc-2',
        title: '2. GitHub Actions: CI Workflows, Automated Testing & Image Publish',
        completed: false,
        overview: 'YAML workflow definitions, event triggers (push, pull_request), matrix testing, secrets management, and automated Docker container builds.',
        keyTakeaways: [
          'Workflows run on Ubuntu/Windows/macOS hosted runners triggered by Git events',
          'Matrix builds run unit tests across multiple Node/Python versions and OS targets concurrently',
          'GitHub Secrets inject encrypted deployment credentials securely into runner environments'
        ],
        learningLinks: [
          { label: 'GitHub Actions Official Documentation', url: 'https://docs.github.com/en/actions', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How do you write a complete GitHub Actions workflow that runs linter, executes tests, builds a Docker image, and pushes to Docker Hub?',
          'How do GitHub Actions Matrix builds optimize test execution across multiple runtime versions?',
          'How do you prevent pull request workflows from leaking repository secrets?'
        ]
      },
      {
        id: 'dcc-3',
        title: '3. AWS Core Services: EC2, S3, RDS, VPC & IAM Security',
        completed: false,
        overview: 'Virtual servers (EC2), object storage (S3), managed databases (RDS), virtual private clouds (VPC subnets/security groups), and IAM least privilege.',
        keyTakeaways: [
          'VPC isolates resources into Public subnets (Internet Gateway) and Private subnets (NAT Gateway for DBs)',
          'Security Groups act as stateful firewalls at instance level; Network ACLs act as stateless firewalls at subnet level',
          'IAM Roles grant temporary credentials to AWS services without hardcoding static access keys'
        ],
        learningLinks: [
          { label: 'AWS Getting Started Documentation', url: 'https://aws.amazon.com/getting-started/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the architectural difference between a Public Subnet and a Private Subnet in an AWS VPC?',
          'Explain the difference between an AWS Security Group (Stateful) and a Network ACL (Stateless).',
          'Why should applications running on AWS EC2 or Lambda assume IAM Roles instead of using static access keys?'
        ]
      },
      {
        id: 'dcc-4',
        title: '4. Infrastructure as Code (IaC) with Terraform & AWS Lambda',
        completed: false,
        overview: 'Declarative cloud provisioning with Terraform (`.tf`), state files, serverless functions (AWS Lambda), and CloudFront CDN distribution.',
        keyTakeaways: [
          'Terraform manages reproducible cloud infrastructure via declarative configuration files and state management (`terraform.tfstate`)',
          'AWS Lambda executes event-driven code on-demand with automatic scaling (zero idle cost)',
          'CloudFront CDN caches static frontend assets and API responses at 400+ edge locations worldwide'
        ],
        learningLinks: [
          { label: 'Terraform Official Documentation', url: 'https://developer.hashicorp.com/terraform/intro', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the purpose of the Terraform state file (`terraform.tfstate`) and why must it be stored in remote S3 with DynamoDB locking?',
          'What causes AWS Lambda Cold Starts and how do you minimize cold start latency?',
          'How does Amazon CloudFront CDN improve worldwide Time To First Byte (TTFB) and reduce origin server load?'
        ]
      }
    ]
  },

  {
    id: 'do-monitoring-linux',
    categoryGroup: 'DevOps',
    category: 'Linux Administration & Observability',
    description: 'Bash scripting, systemd services, Prometheus metrics, Grafana dashboards, and centralized log aggregation.',
    icon: 'Cpu',
    isCoreCS: false,
    applicableRoles: [
      'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
      'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)'
    ],
    topics: [
      {
        id: 'dml-1',
        title: '1. Linux Shell Scripting, Cron Jobs & Systemd Services',
        completed: false,
        overview: 'Bash scripting fundamentals, piping/redirection, Cron scheduled automation, Systemd unit files (`systemctl`), and user permissions (`chmod`, `chown`).',
        keyTakeaways: [
          'Bash scripts automate recurring maintenance, backups, and health checks with error traps (`set -euo pipefail`)',
          'Systemd unit files (`/etc/systemd/system/`) manage background daemon lifecycles with automatic restart policies',
          'Crontab syntax (`*/5 * * * *`) executes scheduled cron jobs'
        ],
        learningLinks: [
          { label: 'Linux Journey - Process & Permissions', url: 'https://linuxjourney.com/', tag: 'Interactive' }
        ],
        interviewQuestions: [
          'What does `set -euo pipefail` do at the top of a production Bash script?',
          'Write a Systemd service unit file that automatically starts and restarts a Node.js or Python application on server reboot.',
          'Explain the Linux file permissions representation `chmod 755` vs `chmod 644`.'
        ]
      },
      {
        id: 'dml-2',
        title: '2. Networking & Diagnostic CLI: curl, netstat, tcpdump, lsof',
        completed: false,
        overview: 'Linux diagnostic tools for troubleshooting network latency, open ports, DNS resolution, and CPU/memory bottlenecks (`top`, `htop`, `df`, `free`).',
        keyTakeaways: [
          '`lsof -i :port` reveals which process is listening on a specific network port',
          '`tcpdump` captures and inspects raw network packets on specific network interfaces',
          '`curl -w "@format.txt"` measures DNS lookup, TCP connect, and SSL handshake timing breakdown'
        ],
        learningLinks: [
          { label: 'Linux Journey - Network CLI', url: 'https://linuxjourney.com/', tag: 'Interactive' }
        ],
        interviewQuestions: [
          'How do you troubleshoot a server where CPU utilization is 100% or RAM is exhausted using Linux CLI tools?',
          'How do you check which process is occupying port 8080 and gracefully terminate it?',
          'Explain how `netstat` / `ss` identifies TCP connection states (ESTABLISHED, CLOSE_WAIT, TIME_WAIT).'
        ]
      },
      {
        id: 'dml-3',
        title: '3. Prometheus Metrics Collection & PromQL Alerting',
        completed: false,
        overview: 'Pull-based metrics scraping, Counter/Gauge/Histogram metric types, PromQL queries, and Alertmanager notification routing.',
        keyTakeaways: [
          'Prometheus scrapes `/metrics` HTTP endpoints on target nodes at fixed evaluation intervals',
          'Counter: Monotonically increasing number (e.g. total HTTP requests); Gauge: Value that goes up/down (e.g. memory usage)',
          'PromQL `rate(http_requests_total[5m])` calculates per-second request rate over 5-minute windows'
        ],
        learningLinks: [
          { label: 'Prometheus Official Documentation', url: 'https://prometheus.io/docs/introduction/overview/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the difference between Pull-based metrics collection (Prometheus) and Push-based metrics collection (StatsD)?',
          'Explain the difference between a Counter, a Gauge, a Histogram, and a Summary in Prometheus.',
          'How do you write a PromQL query to calculate the 99th percentile HTTP latency across microservice endpoints?'
        ]
      },
      {
        id: 'dml-4',
        title: '4. Grafana Dashboards & Centralized Log Aggregation (Loki / ELK)',
        completed: false,
        overview: 'Visualizing telemetry dashboards, alerting rules, centralized log parsing (Logstash/Fluentbit), Elasticsearch/Loki storage, and Kibana search.',
        keyTakeaways: [
          'Grafana unifies Prometheus metrics, Loki logs, and Tempo traces into interactive dashboards',
          'Grafana Loki indexes only metadata labels (like Prometheus), significantly reducing storage and index overhead compared to full-text Elasticsearch',
          'Correlating log entries with trace IDs accelerates root-cause investigation during production outages'
        ],
        learningLinks: [
          { label: 'Grafana Official Documentation', url: 'https://grafana.com/docs/grafana/latest/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does Grafana Loki achieve lower storage and operating costs compared to Elasticsearch (ELK)?',
          'How do you configure an automated alert in Grafana to notify a Slack/Discord channel when error rates exceed 1%?',
          'Why is structured JSON logging essential for high-volume centralized log aggregation systems?'
        ]
      }
    ]
  },

  // ============================================================
  // 7. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (2 Roadmaps)
  // ============================================================
  {
    id: 'ai-ml-python',
    categoryGroup: 'AI & Data Science',
    category: 'Applied Machine Learning & PyTorch',
    description: 'NumPy/Pandas data pipelines, Scikit-learn, PyTorch Tensors, Neural Networks, and model evaluation.',
    icon: 'Cpu',
    isCoreCS: false,
    applicableRoles: [
      'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)'
    ],
    topics: [
      {
        id: 'aml-1',
        title: '1. Data Engineering with NumPy, Pandas & Vectorized Operations',
        completed: false,
        overview: 'N-dimensional arrays, matrix multiplications, broadcasting rules, Pandas DataFrames, handling missing data, and feature encoding.',
        keyTakeaways: [
          'Vectorized NumPy operations execute in pre-compiled C loops, orders of magnitude faster than Python `for` loops',
          'Broadcasting automatically expands smaller array dimensions to match larger arrays during arithmetic operations',
          'Pandas handles tabular data manipulation, one-hot encoding, and missing value imputation'
        ],
        learningLinks: [
          { label: 'NumPy Official Documentation', url: 'https://numpy.org/doc/stable/', tag: 'Official Docs' },
          { label: 'Pandas Official Documentation', url: 'https://pandas.pydata.org/docs/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does NumPy achieve 50x-100x speedup over native Python lists using vectorized memory contiguous arrays?',
          'Explain NumPy array broadcasting rules with a 2D matrix addition example.',
          'How do you handle missing values in a Pandas DataFrame (Imputation vs Dropping) without introducing data leakage?'
        ]
      },
      {
        id: 'aml-2',
        title: '2. Scikit-learn: Regression, Classification & Cross-Validation',
        completed: false,
        overview: 'Supervised learning models (Linear/Logistic Regression, Random Forests, XGBoost), train-test split, K-Fold cross-validation, and metrics (Precision, Recall, F1, ROC-AUC).',
        keyTakeaways: [
          'Precision: TP / (TP + FP) measures false positive rate; Recall: TP / (TP + FN) measures false negative rate',
          'F1 Score harmonic mean balances Precision and Recall on imbalanced datasets',
          'K-Fold Cross-Validation splits data into K subsets to prevent model overfitting'
        ],
        learningLinks: [
          { label: 'Scikit-Learn Official Documentation', url: 'https://scikit-learn.org/stable/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain the Bias-Variance Tradeoff in machine learning models.',
          'When is the ROC-AUC score preferred over simple accuracy for evaluating classification models?',
          'What is the difference between a Random Forest (Bagging) and XGBoost (Gradient Boosting)?'
        ]
      },
      {
        id: 'aml-3',
        title: '3. PyTorch Tensors, Autograd & Neural Network Training Loop',
        completed: false,
        overview: 'Tensors on GPU (`cuda`), dynamic computational graphs (`autograd`), custom `nn.Module`, loss functions (`CrossEntropyLoss`), and optimizers (`AdamW`).',
        keyTakeaways: [
          'PyTorch creates dynamic computational graphs on-the-fly during forward pass',
          '`loss.backward()` calculates gradients with automatic differentiation; `optimizer.step()` updates model weights',
          '`optimizer.zero_grad()` must be called before backward pass to clear accumulated gradients'
        ],
        learningLinks: [
          { label: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Walk through the exact step-by-step PyTorch training loop (`zero_grad`, `forward`, `loss`, `backward`, `step`).',
          'Why must `optimizer.zero_grad()` be called at each epoch iteration in PyTorch?',
          'How does the Adam optimizer combine Momentum and RMSprop for adaptive learning rate optimization?'
        ]
      },
      {
        id: 'aml-4',
        title: '4. Deep Learning: CNNs, Transformers & Model Deployment',
        completed: false,
        overview: 'Convolutional layers, pooling, Self-Attention mechanism, Transformer encoders/decoders, and ONNX runtime model export for API inference.',
        keyTakeaways: [
          'CNNs use shared convolutional filters for translation-invariant spatial image feature extraction',
          'Self-Attention computes query, key, and value dot-product weights across all sequence tokens in parallel (O(N^2))',
          'ONNX exports trained PyTorch weights into optimized inference engines running in production C++/Go/Python services'
        ],
        learningLinks: [
          { label: 'PyTorch - Deep Learning Models', url: 'https://pytorch.org/tutorials/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain the Self-Attention mechanism equation `Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V`.',
          'Why did Transformer architectures replace Recurrent Neural Networks (RNNs / LSTMs) in modern NLP and AI?',
          'How do you optimize deep learning model inference latency using Quantization (FP16 / INT8) and ONNX?'
        ]
      }
    ]
  },

  {
    id: 'ai-genai-llm',
    categoryGroup: 'AI & Data Science',
    category: 'Generative AI, LLMs & RAG Systems',
    description: 'Prompt engineering, LangChain, Vector Databases, Retrieval-Augmented Generation (RAG), and fine-tuning.',
    icon: 'Cpu',
    isCoreCS: false,
    applicableRoles: [
      'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)',
      'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
      'Full Stack Engineer (MERN / Next.js / APIs)'
    ],
    topics: [
      {
        id: 'gen-1',
        title: '1. Prompt Engineering, In-Context Learning & Structured Outputs',
        completed: false,
        overview: 'Zero-shot/few-shot prompting, Chain-of-Thought (CoT), System instructions, JSON Schema structured outputs, and tokenization (BPE).',
        keyTakeaways: [
          'Chain-of-Thought (CoT) prompting instructs LLMs to break reasoning into explicit step-by-step reasoning tokens',
          'Structured Outputs enforce strict JSON Schema validation matching Pydantic / TypeScript types directly from the model',
          'Byte-Pair Encoding (BPE) tokenizes text into subword token IDs'
        ],
        learningLinks: [
          { label: 'DAIR.AI - Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', tag: 'Guide' }
        ],
        interviewQuestions: [
          'What is Chain-of-Thought (CoT) prompting and why does it improve LLM reasoning accuracy on math and logic tasks?',
          'How do modern LLMs guarantee strict JSON Schema outputs without hallucinating non-standard JSON formats?',
          'Explain how Byte-Pair Encoding (BPE) tokenization handles out-of-vocabulary words.'
        ]
      },
      {
        id: 'gen-2',
        title: '2. Vector Embeddings & Vector Databases (ChromaDB / Pinecone)',
        completed: false,
        overview: 'Dense vector representations (text-embedding-3), cosine similarity, approximate nearest neighbors (HNSW / IVF), and vector indexing.',
        keyTakeaways: [
          'Embedding models project semantic text meaning into high-dimensional vector spaces (e.g. 1536 dimensions)',
          'Cosine Similarity measures the cosine of the angle between two embedding vectors (-1 to 1)',
          'Hierarchical Navigable Small World (HNSW) graphs enable sub-millisecond approximate nearest neighbor search across millions of vectors'
        ],
        learningLinks: [
          { label: 'LangChain Official Documentation', url: 'https://python.langchain.com/docs/get_started/introduction', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does Cosine Similarity differ from Euclidean (L2) distance for comparing text embeddings?',
          'How does the Hierarchical Navigable Small World (HNSW) indexing algorithm accelerate vector search from O(N) to O(log N)?',
          'What causes embedding dimensionality tradeoffs (e.g. 256 vs 1536 dimensions) in production vector stores?'
        ]
      },
      {
        id: 'gen-3',
        title: '3. Retrieval-Augmented Generation (RAG) Architecture',
        completed: false,
        overview: 'Document chunking strategies (Recursive, Semantic), hybrid search (Dense + BM25 Sparse), re-ranking (Cross-Encoders), and citation hallucination mitigation.',
        keyTakeaways: [
          'RAG retrieves relevant domain document chunks dynamically and injects them into the LLM context prompt',
          'Chunking strategy (chunk size ~500 tokens with 50-token overlap) balances context granularity and retrieval precision',
          'Hybrid Search combines Dense semantic search with BM25 keyword matching for optimal recall'
        ],
        learningLinks: [
          { label: 'LangChain - RAG Architecture Guide', url: 'https://python.langchain.com/docs/get_started/introduction', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Walk through the end-to-end architecture of a Production RAG system from document ingestion to LLM generation.',
          'Why is Hybrid Search (Dense Embeddings + BM25 Sparse Search) superior to dense vector search alone for code and IDs?',
          'How does a Cross-Encoder Re-ranker improve RAG context relevance before prompt injection?'
        ]
      },
      {
        id: 'gen-4',
        title: '4. LLM Fine-Tuning (LoRA / QLoRA) & Evaluation (Ragas)',
        completed: false,
        overview: 'Low-Rank Adaptation (LoRA), 4-bit Quantized LoRA (QLoRA), instruction fine-tuning datasets, and RAG evaluation metrics (Faithfulness, Answer Relevance).',
        keyTakeaways: [
          'LoRA freezes base model weights and trains small low-rank adapter matrices (reducing trainable parameters by 99%)',
          'QLoRA quantizes base model to 4-bit precision, enabling fine-tuning 70B models on a single consumer GPU',
          'RAG evaluation frameworks (Ragas) automatically assess Faithfulness (factual alignment) and Context Recall'
        ],
        learningLinks: [
          { label: 'Hugging Face Transformers Documentation', url: 'https://huggingface.co/docs', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'Explain how Low-Rank Adaptation (LoRA) fine-tunes large language models with minimal compute and memory.',
          'When should you use RAG vs Fine-Tuning for domain-specific enterprise knowledge?',
          'How do you measure and benchmark RAG performance using Faithfulness, Answer Relevance, and Context Precision metrics?'
        ]
      }
    ]
  },

  // ============================================================
  // 8. QUALITY ENGINEERING & SDET (1 Roadmap)
  // ============================================================
  {
    id: 'sdet-automation',
    categoryGroup: 'Testing & QA',
    category: 'Automated Testing & SDET Architecture',
    description: 'End-to-end browser automation with Playwright & Cypress, API test automation, and performance benchmarking.',
    icon: 'CheckCircle2',
    isCoreCS: false,
    applicableRoles: [
      'Software Development Engineer in Test (SDET / Automation)',
      'Full Stack Engineer (MERN / Next.js / APIs)',
      'Frontend Engineer (React / Next.js / UI Architecture)'
    ],
    topics: [
      {
        id: 'sdt-1',
        title: '1. E2E Browser Automation with Playwright & Page Object Model (POM)',
        completed: false,
        overview: 'Headless browser automation, auto-waiting, resilient locators (`getByRole`), Page Object Model design patterns, and cross-browser testing (Chromium, Firefox, WebKit).',
        keyTakeaways: [
          'Playwright auto-waits for elements to be visible, enabled, and stable before performing actions (eliminating flaky `sleep` calls)',
          'Page Object Model (POM) encapsulates page selectors and interaction methods into reusable classes',
          'Trace Viewer records screenshots, DOM snapshots, and network activity for debugging failed tests'
        ],
        learningLinks: [
          { label: 'Playwright Official Documentation', url: 'https://playwright.dev/docs/intro', tag: 'Official Docs' },
          { label: 'Cypress Official Documentation', url: 'https://docs.cypress.io/guides/overview/why-cypress', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does Playwright’s auto-waiting mechanism prevent flaky tests compared to Selenium WebDriver?',
          'Explain the Page Object Model (POM) architecture and why it improves test suite maintainability.',
          'How do you test complex user flows requiring multiple browser tabs or authenticated sessions in Playwright?'
        ]
      },
      {
        id: 'sdt-2',
        title: '2. REST API Automated Integration Testing with Jest & Supertest',
        completed: false,
        overview: 'Automating HTTP API tests, status code assertions, JSON schema validation, auth token injection, and database state setup/teardown.',
        keyTakeaways: [
          'Supertest sends HTTP requests directly to Express/FastAPI app instances without spinning up a live network port',
          'Assert status codes, response headers, payload structures, and response time limits',
          '`beforeEach` and `afterEach` hooks isolate database test fixtures and roll back test data'
        ],
        learningLinks: [
          { label: 'Jest Official Documentation', url: 'https://jestjs.io/docs/getting-started', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How do you structure automated API test suites covering positive scenarios, negative input validation, and unauthorized 401/403 access?',
          'How do you isolate database state between concurrent integration tests to prevent flaky test dependencies?',
          'How do you validate complex API response JSON schemas using AJV or Zod in automated tests?'
        ]
      },
      {
        id: 'sdt-3',
        title: '3. Performance & Load Testing with k6 / Artillery',
        completed: false,
        overview: 'Virtual Users (VUs), load ramp-up scenarios, stress testing, spike testing, measuring p95/p99 latency, and threshold failure criteria.',
        keyTakeaways: [
          'k6 writes load test scripts in JavaScript executed on a high-performance Go runtime (generating thousands of concurrent VUs from single node)',
          'Load Testing verifies behavior under expected peak traffic; Stress Testing pushes system to breaking point to identify failure bottlenecks',
          'Define strict pass/fail thresholds (e.g. `http_req_duration: ["p(95)<200ms"]`) in CI pipelines'
        ],
        learningLinks: [
          { label: 'Grafana k6 Official Documentation', url: 'https://k6.io/docs/', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'What is the difference between Load Testing, Stress Testing, Spike Testing, and Soak (Endurance) Testing?',
          'Why are 95th (p95) and 99th (p99) percentile response times more meaningful than average response times in load tests?',
          'How do you simulate realistic user think time and randomized traffic distribution in a k6 script?'
        ]
      },
      {
        id: 'sdt-4',
        title: '4. CI/CD Test Pipeline Automation, Parallel Sharding & Allure Reports',
        completed: false,
        overview: 'Integrating automated test suites into GitHub Actions CI, parallel test sharding across multiple runners, artifact video/trace uploads, and Allure test reports.',
        keyTakeaways: [
          'Test Sharding splits a 1,000-test suite across N parallel CI machines (e.g. `shard: 1/4`), reducing build duration from 40m to 10m',
          'Automated CI failure gates block pull requests if test coverage thresholds or regressions are detected',
          'Allure generates visual HTML test execution reports with execution trends, duration graphs, and failure screenshots'
        ],
        learningLinks: [
          { label: 'Playwright - CI/CD Integration Guide', url: 'https://playwright.dev/docs/ci', tag: 'Official Docs' }
        ],
        interviewQuestions: [
          'How does Test Sharding in CI pipelines reduce end-to-end regression test runtimes?',
          'How do you configure GitHub Actions to automatically upload Playwright trace files and screenshots only when tests fail?',
          'What strategies do you implement to quarantine and eliminate flaky automated tests from blocking main branch deployments?'
        ]
      }
    ]
  }
];

export default defaultRoadmaps;
