// Project Archetypes & Role Allocation System
// Each CS domain has fundamentally different software engineering lifecycle milestones

export const PROJECT_ARCHETYPES = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Application',
    shortLabel: 'Full Stack',
    allocatedRole: 'Full Stack Engineer (MERN / Next.js / APIs)',
    roleId: 'fullstack',
    badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/50',
    iconName: 'Globe',
    defaultTech: 'React, Node.js, Express, MongoDB, Tailwind CSS, REST APIs',
    summary: 'End-to-end web system with client UI, API services, database, authentication, and cloud deployment.',
    milestones: [
      { title: '1. Architecture & System Requirements (PRD, Tech Stack, Scope)', phase: 'Planning', completed: true },
      { title: '2. Database Modeling & Schema Relationships (ERD, Migrations)', phase: 'Architecture', completed: false },
      { title: '3. Core Backend Services & REST/GraphQL API Endpoints', phase: 'Backend', completed: false },
      { title: '4. Frontend Client Architecture & Responsive UI Components', phase: 'Frontend', completed: false },
      { title: '5. End-to-End API Integration & State Management', phase: 'Integration', completed: false },
      { title: '6. Unit/Integration Testing & Edge Case Hardening', phase: 'Testing', completed: false },
      { title: '7. Cloud Deployment, CI/CD Pipeline & Live Hosting', phase: 'Hosting', completed: false },
      { title: '8. Technical Documentation, Architecture Diagram & Showcase', phase: 'Showcase', completed: false }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Distributed Systems',
    shortLabel: 'Backend System',
    allocatedRole: 'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
    roleId: 'backend',
    badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/50',
    iconName: 'Server',
    defaultTech: 'Node.js / Spring Boot, PostgreSQL, Redis, Docker, Kafka, gRPC',
    summary: 'High-throughput microservices, API contracts, caching tiers, asynchronous messaging, and containerization.',
    milestones: [
      { title: '1. System Architecture, Capacity Planning & API Contract (OpenAPI/gRPC)', phase: 'Architecture', completed: true },
      { title: '2. Data Store Selection, Schema Indexing & Transaction Strategy', phase: 'Database', completed: false },
      { title: '3. Core Business Logic, Data Access Layer & ORM Configuration', phase: 'Backend', completed: false },
      { title: '4. Authentication, RBAC & API Gateway Rate Limiting', phase: 'Security', completed: false },
      { title: '5. Distributed Caching (Redis) & Asynchronous Event Queues (Kafka)', phase: 'Infrastructure', completed: false },
      { title: '6. Load Testing, Concurrency Benchmarks & Chaos Testing', phase: 'Testing', completed: false },
      { title: '7. Containerization (Docker), Kubernetes & Cloud Deployment', phase: 'Hosting', completed: false },
      { title: '8. Distributed Tracing, Observability (Prometheus/Grafana) & Architecture Writeup', phase: 'Showcase', completed: false }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Application & Design System',
    shortLabel: 'Frontend UI',
    allocatedRole: 'Frontend Engineer (React / Next.js / UI Architecture)',
    roleId: 'frontend',
    badgeColor: 'text-teal-400 bg-teal-950/80 border-teal-800/50',
    iconName: 'Layout',
    defaultTech: 'Next.js, TypeScript, Tailwind CSS, Zustand, Framer Motion, Storybook',
    summary: 'Complex client-side architecture, responsive design system, state synchronization, and web performance optimization.',
    milestones: [
      { title: '1. UI/UX Wireframes, Component Hierarchy & Information Architecture', phase: 'Planning', completed: true },
      { title: '2. Project Scaffolding, Dynamic Routing & Global State Store (Zustand/Redux)', phase: 'Setup', completed: false },
      { title: '3. Responsive UI Layouts, Design System & Accessibility (a11y) Standards', phase: 'UI/UX', completed: false },
      { title: '4. API Client Integration, Optimistic Updates & Server Cache Layer', phase: 'Integration', completed: false },
      { title: '5. Frontend Performance Tuning (CWV, LCP, Code Splitting, Memoization)', phase: 'Optimization', completed: false },
      { title: '6. Component Unit Testing (Jest/RTL) & E2E Critical Path Testing (Playwright)', phase: 'Testing', completed: false },
      { title: '7. Production Bundle Optimization & CDN Edge Deployment (Vercel/Cloudflare)', phase: 'Hosting', completed: false },
      { title: '8. Component Documentation (Storybook) & Interactive Showcase Demo', phase: 'Showcase', completed: false }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning & GenAI Pipeline',
    shortLabel: 'AI / Machine Learning',
    allocatedRole: 'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)',
    roleId: 'ai-ml',
    badgeColor: 'text-purple-400 bg-purple-950/80 border-purple-800/50',
    iconName: 'Cpu',
    defaultTech: 'Python, PyTorch, FastAPI, Hugging Face, LangChain, ChromaDB, Docker',
    summary: 'End-to-end ML workflow from dataset acquisition and training to model quantization and serving microservices.',
    milestones: [
      { title: '1. Problem Formulation, Dataset Acquisition & Exploratory Data Analysis (EDA)', phase: 'Data', completed: true },
      { title: '2. Data Preprocessing, Cleaning, Tokenization & Feature Engineering Pipeline', phase: 'Preprocessing', completed: false },
      { title: '3. Baseline Model Selection, Training & Cross-Validation Architecture', phase: 'Modeling', completed: false },
      { title: '4. Hyperparameter Tuning, Metric Evaluation (F1/AUC) & Error Analysis', phase: 'Evaluation', completed: false },
      { title: '5. Model Quantization, Serialization (ONNX/TorchScript) & Inference Optimization', phase: 'Optimization', completed: false },
      { title: '6. Model Serving REST/gRPC API Microservice (FastAPI / TorchServe)', phase: 'API Serving', completed: false },
      { title: '7. Containerization, Cloud GPU Deployment & Model Drift Telemetry', phase: 'Hosting', completed: false },
      { title: '8. Model Card, Benchmark Report & Interactive Demo UI (Streamlit/Gradio)', phase: 'Showcase', completed: false }
    ]
  },
  {
    id: 'devops-cloud',
    title: 'DevOps & Cloud Infrastructure (IaC)',
    shortLabel: 'DevOps & Cloud',
    allocatedRole: 'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
    roleId: 'devops',
    badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800/50',
    iconName: 'Workflow',
    defaultTech: 'Terraform, Docker, Kubernetes, GitHub Actions, AWS / GCP, Prometheus, Helm',
    summary: 'Automated CI/CD release pipelines, Infrastructure as Code, container orchestration, and centralized observability.',
    milestones: [
      { title: '1. Cloud Architecture Specification & Network Topology (VPC, Subnets, IAM)', phase: 'Planning', completed: true },
      { title: '2. Infrastructure as Code (IaC) Provisioning (Terraform / CloudFormation)', phase: 'Infrastructure', completed: false },
      { title: '3. Automated CI/CD Multi-Stage Pipeline (GitHub Actions / GitLab CI)', phase: 'Automation', completed: false },
      { title: '4. Container Packaging (Docker) & Cluster Orchestration (Kubernetes Helm)', phase: 'Containers', completed: false },
      { title: '5. Zero-Trust Security Hardening, Secret Vault & Policy Scanning', phase: 'Security', completed: false },
      { title: '6. Centralized Logging (Loki), Prometheus Metrics & Grafana Dashboards', phase: 'Observability', completed: false },
      { title: '7. High-Availability Failover, Blue/Green Deployments & Disaster Recovery', phase: 'Hosting', completed: false },
      { title: '8. Operational Runbooks, Cloud Cost Optimization & Architecture Topology Diagram', phase: 'Showcase', completed: false }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Application (iOS / Android / Cross-Platform)',
    shortLabel: 'Mobile App',
    allocatedRole: 'Mobile Engineer (iOS / Android / React Native)',
    roleId: 'fullstack',
    badgeColor: 'text-blue-400 bg-blue-950/80 border-blue-800/50',
    iconName: 'Smartphone',
    defaultTech: 'React Native / Flutter, TypeScript, SQLite, Firebase, Fastlane, Redux',
    summary: 'Native or cross-platform mobile app with offline-first local persistence, device APIs, and store deployment pipeline.',
    milestones: [
      { title: '1. App Flow Wireframes, UX Guidelines & Native Platform SDK Toolchain', phase: 'Planning', completed: true },
      { title: '2. Local Database & Offline-First Persistence (SQLite / Room / Realm)', phase: 'Storage', completed: false },
      { title: '3. Core Business Logic, State Architecture & Screen Navigation Hierarchy', phase: 'Core Logic', completed: false },
      { title: '4. Native Device Capabilities (Biometrics, Push Notifications, Camera, GPS)', phase: 'Platform', completed: false },
      { title: '5. Background Sync, Offline Queuing & Network Resilience Handling', phase: 'Networking', completed: false },
      { title: '6. Unit/Component Testing & Real Device Simulator Test Matrices', phase: 'Testing', completed: false },
      { title: '7. App Store / Play Store Build Signing, Fastlane CI/CD & TestFlight Beta', phase: 'Hosting', completed: false },
      { title: '8. Release Notes, Interactive Video Walkthrough & Architecture Specification', phase: 'Showcase', completed: false }
    ]
  },
  {
    id: 'system-design',
    title: 'System Design & Low-Level Design (LLD)',
    shortLabel: 'System Design / LLD',
    allocatedRole: 'Software Development Engineer (SDE / Core DSA)',
    roleId: 'sde',
    badgeColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-800/50',
    iconName: 'Boxes',
    defaultTech: 'C++ / Java / Go, Multi-threading, Design Patterns, POSIX, Memory Management',
    summary: 'Object-oriented low-level architecture (LLD), concurrency primitives, design patterns, and high-performance system internals.',
    milestones: [
      { title: '1. Problem Scope, Functional & Non-Functional Constraints Definition', phase: 'Requirements', completed: true },
      { title: '2. Low-Level Class Diagrams, SOLID Design Patterns & Interface Contracts', phase: 'Design', completed: false },
      { title: '3. Core Engine Implementation, Memory Management & Data Structures', phase: 'Implementation', completed: false },
      { title: '4. Concurrency, Thread Safety & Synchronization Primitives (Mutex/Locks)', phase: 'Concurrency', completed: false },
      { title: '5. CLI Driver, Client Library or Extensible Plugin Interface', phase: 'Interface', completed: false },
      { title: '6. Comprehensive Unit Testing, Memory Leak Checks (Valgrind) & Stress Tests', phase: 'Testing', completed: false },
      { title: '7. Cross-Platform Compilation, Release Binary Packaging & Benchmarking', phase: 'Hosting', completed: false },
      { title: '8. Technical Design Doc, Sequence Diagrams & Complexity Performance Report', phase: 'Showcase', completed: false }
    ]
  },
  {
    id: 'sdet',
    title: 'Test Automation Framework & QA Engineering',
    shortLabel: 'Test Automation',
    allocatedRole: 'Software Development Engineer in Test (SDET / Automation)',
    roleId: 'sdet',
    badgeColor: 'text-rose-400 bg-rose-950/80 border-rose-800/50',
    iconName: 'ShieldCheck',
    defaultTech: 'TypeScript, Playwright, Jest, k6, Docker, Allure Reports, GitHub Actions',
    summary: 'Scalable automated testing suite, Page Object Model (POM), API contract validation, and CI load benchmarking.',
    milestones: [
      { title: '1. Test Strategy, Acceptance Criteria & Coverage Scope Definition', phase: 'Planning', completed: true },
      { title: '2. Test Automation Framework Architecture (Playwright/Cypress/PyTest)', phase: 'Framework', completed: false },
      { title: '3. Page Object Model (POM) Design & Reusable Component Test Fixtures', phase: 'Architecture', completed: false },
      { title: '4. End-to-End User Flow Automation & Visual Regression Testing', phase: 'E2E Suites', completed: false },
      { title: '5. Mock Service Layer, Test Data Factories & API Contract Tests', phase: 'API Testing', completed: false },
      { title: '6. High-Concurrency API Load Benchmarking & Performance Stress Tests (k6)', phase: 'Performance', completed: false },
      { title: '7. Headless CI/CD Parallel Test Execution & Failure Notification Webhooks', phase: 'Hosting', completed: false },
      { title: '8. Comprehensive Allure Test Reports, Flakiness Analysis & QA Documentation', phase: 'Showcase', completed: false }
    ]
  }
];

export const ALL_ALLOCATED_ROLES = [
  'Full Stack Engineer (MERN / Next.js / APIs)',
  'Backend Engineer (Node.js / Java / Python / Distributed APIs)',
  'Frontend Engineer (React / Next.js / UI Architecture)',
  'AI / Machine Learning Engineer (Python / PyTorch / LLMs / GenAI)',
  'DevOps Engineer (Docker / Kubernetes / CI/CD Automation)',
  'Cloud Engineer (AWS / Azure / Cloud Infrastructure & Security)',
  'Mobile Engineer (iOS / Android / React Native)',
  'Software Development Engineer (SDE / Core DSA)',
  'Software Development Engineer in Test (SDET / Automation)'
];

// Helper to look up an archetype by ID or Title or Category string
export const getProjectTypeConfig = (identifier) => {
  if (!identifier) return PROJECT_ARCHETYPES[0];
  const query = identifier.toLowerCase().trim();

  // 1. Direct ID match
  const byId = PROJECT_ARCHETYPES.find(a => a.id.toLowerCase() === query);
  if (byId) return byId;

  // 2. Direct title match
  const byTitle = PROJECT_ARCHETYPES.find(a => a.title.toLowerCase() === query);
  if (byTitle) return byTitle;

  // 3. Keyword matching
  if (query.includes('ai') || query.includes('ml') || query.includes('machine learning') || query.includes('genai')) {
    return PROJECT_ARCHETYPES.find(a => a.id === 'ai-ml');
  }
  if (query.includes('backend') || query.includes('distributed') || query.includes('microservice') || query.includes('spring') || query.includes('server')) {
    return PROJECT_ARCHETYPES.find(a => a.id === 'backend');
  }
  if (query.includes('frontend') || query.includes('react') || query.includes('ui') || query.includes('client')) {
    return PROJECT_ARCHETYPES.find(a => a.id === 'frontend');
  }
  if (query.includes('devops') || query.includes('cloud') || query.includes('k8s') || query.includes('docker') || query.includes('iac')) {
    return PROJECT_ARCHETYPES.find(a => a.id === 'devops-cloud');
  }
  if (query.includes('mobile') || query.includes('ios') || query.includes('android') || query.includes('flutter')) {
    return PROJECT_ARCHETYPES.find(a => a.id === 'mobile');
  }
  if (query.includes('system') || query.includes('lld') || query.includes('design') || query.includes('sde') || query.includes('low-level')) {
    return PROJECT_ARCHETYPES.find(a => a.id === 'system-design');
  }
  if (query.includes('sdet') || query.includes('qa') || query.includes('test') || query.includes('quality')) {
    return PROJECT_ARCHETYPES.find(a => a.id === 'sdet');
  }

  return PROJECT_ARCHETYPES[0]; // fallback to fullstack
};

// Map target role from AuthContext/rolesData to recommended project type
export const getRecommendedProjectTypeForRole = (roleTitle) => {
  if (!roleTitle) return PROJECT_ARCHETYPES[0];
  const query = roleTitle.toLowerCase();

  if (query.includes('backend')) return PROJECT_ARCHETYPES.find(a => a.id === 'backend');
  if (query.includes('frontend')) return PROJECT_ARCHETYPES.find(a => a.id === 'frontend');
  if (query.includes('ai') || query.includes('ml') || query.includes('machine learning')) return PROJECT_ARCHETYPES.find(a => a.id === 'ai-ml');
  if (query.includes('devops') || query.includes('cloud')) return PROJECT_ARCHETYPES.find(a => a.id === 'devops-cloud');
  if (query.includes('mobile')) return PROJECT_ARCHETYPES.find(a => a.id === 'mobile');
  if (query.includes('sdet') || query.includes('qa') || query.includes('test')) return PROJECT_ARCHETYPES.find(a => a.id === 'sdet');
  if (query.includes('sde') || query.includes('core')) return PROJECT_ARCHETYPES.find(a => a.id === 'system-design');

  return PROJECT_ARCHETYPES[0]; // default Full Stack
};
