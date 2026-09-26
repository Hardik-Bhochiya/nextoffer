// Computer Science Project Architecture Types & Detailed Milestone Learning Guides

export const ARCHITECTURE_TYPES = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Application',
    shortLabel: 'Full Stack',
    badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/50',
    iconName: 'Globe',
    defaultTech: 'React, Node.js, Express, MongoDB, Tailwind CSS, REST APIs',
    summary: 'End-to-end web system with client UI, API services, database, authentication, and cloud deployment.',
    milestones: [
      {
        title: '1. Architecture & System Requirements (PRD, Tech Stack, Scope)',
        phase: 'Planning',
        completed: true,
        guide: {
          overview: 'Define the functional and non-functional requirements, data flows, and technology choices before writing code.',
          keyTasks: [
            'Draft a Product Requirements Document (PRD) with core user personas & user stories',
            'Define API contracts (REST endpoints, request/response JSON schemas)',
            'Choose database technology (Relational vs NoSQL) and justify trade-offs',
            'Draw a high-level system architecture diagram (Client -> API Gateway -> Service -> DB)'
          ],
          recommendedTools: ['Excalidraw / Mermaid.js', 'Postman / Swagger OpenAPI', 'Notion / GitHub Projects'],
          interviewTip: 'Interviewers look for intentional trade-offs (e.g., why MongoDB over Postgres, SSR vs SPA) rather than picking a stack by default.'
        }
      },
      {
        title: '2. Database Modeling & Schema Relationships (ERD, Migrations)',
        phase: 'Architecture',
        completed: false,
        guide: {
          overview: 'Design normalized tables/collections with proper indexing, cascading rules, and foreign key relations.',
          keyTasks: [
            'Design Entity-Relationship Diagram (ERD) with 1:1, 1:N, and N:M relationships',
            'Define schema validation rules, unique constraints, and timestamping',
            'Add compound and single indexes on frequently queried search / filter fields',
            'Write repeatable seed scripts and migration files'
          ],
          recommendedTools: ['dbdiagram.io', 'Mongoose / Prisma / Drizzle ORM', 'MongoDB Compass / DBeaver'],
          interviewTip: 'Explain your indexing strategy: how B-Trees improve query lookup times from O(N) to O(log N) and index write overhead.'
        }
      },
      {
        title: '3. Core Backend Services & REST/GraphQL API Endpoints',
        phase: 'Backend',
        completed: false,
        guide: {
          overview: 'Implement controller-service-repository layered architecture with JWT authentication, validation, and error middleware.',
          keyTasks: [
            'Build JWT / Session authentication with bcrypt password hashing and refresh tokens',
            'Implement input sanitization & schema validation (Zod / Joi / express-validator)',
            'Create centralized async error handler middleware (avoid try/catch duplication)',
            'Implement CRUD routes with proper HTTP status codes (200, 201, 400, 401, 403, 404, 500)'
          ],
          recommendedTools: ['Express.js / Fastify', 'Zod / Joi validation', 'jsonwebtoken & bcrypt'],
          interviewTip: 'Highlight security hygiene: httpOnly Secure SameSite cookies, CORS configuration, rate limiting, and password hashing salts.'
        }
      },
      {
        title: '4. Frontend Client Architecture & Responsive UI Components',
        phase: 'Frontend',
        completed: false,
        guide: {
          overview: 'Develop modular, accessible, and responsive components with clean state separation and design tokens.',
          keyTasks: [
            'Build responsive layouts with Tailwind CSS / CSS Grid supporting mobile & desktop',
            'Set up reusable UI atoms/molecules (Buttons, Modals, Form Inputs, Badges, Loaders)',
            'Implement client routing with protected auth guards & navigation states',
            'Ensure keyboard accessibility (a11y) and ARIA attributes on interactive modals'
          ],
          recommendedTools: ['React 19 / Vite / Next.js', 'Tailwind CSS', 'Lucide Icons / Radix UI'],
          interviewTip: 'Demonstrate component composition principles, separation of container vs presentational logic, and avoiding prop drilling.'
        }
      },
      {
        title: '5. End-to-End API Integration & State Management',
        phase: 'Integration',
        completed: false,
        guide: {
          overview: 'Connect frontend to backend with optimistic updates, loading skeletons, caching, and error toast feedback.',
          keyTasks: [
            'Configure Axios/Fetch interceptor with automatic bearer token injection and 401 token refresh',
            'Manage global server cache and optimistic updates (React Query / TanStack Query)',
            'Handle edge-state UI: loading skeletons, empty states, and toast error notifications',
            'Implement pagination, infinite scroll, and search debouncing'
          ],
          recommendedTools: ['TanStack React Query', 'Axios', 'Zustand / Context API'],
          interviewTip: 'Discuss cache invalidation strategies and optimistic UI updates for instant perceived user responsiveness.'
        }
      },
      {
        title: '6. Unit/Integration Testing & Edge Case Hardening',
        phase: 'Testing',
        completed: false,
        guide: {
          overview: 'Verify correctness of API endpoints and UI workflows under valid, invalid, and boundary test scenarios.',
          keyTasks: [
            'Write backend integration tests with Supertest mocking DB transactions',
            'Write frontend component unit tests for critical forms & auth flows (React Testing Library)',
            'Test boundary conditions (empty strings, large payloads, concurrent requests)',
            'Perform a security audit for SQL/NoSQL injection and XSS vulnerabilities'
          ],
          recommendedTools: ['Vitest / Jest', 'Supertest', 'React Testing Library / Playwright'],
          interviewTip: 'Emphasize testing pyramid: fast unit tests for business logic + integration tests for API contracts.'
        }
      },
      {
        title: '7. Cloud Deployment, CI/CD Pipeline & Live Hosting',
        phase: 'Hosting',
        completed: false,
        guide: {
          overview: 'Deploy client and server to cloud providers with automated GitHub Actions CI/CD and custom domains.',
          keyTasks: [
            'Set up GitHub Actions CI workflow for automated linting, building, and tests on PRs',
            'Deploy Frontend to Vercel / Cloudflare Pages with SSL & CDN edge caching',
            'Deploy Backend API to Render / Railway / AWS EC2 with environment secrets',
            'Provision production cloud database (MongoDB Atlas / Supabase / Neon Postgres)'
          ],
          recommendedTools: ['GitHub Actions', 'Vercel / Cloudflare', 'Render / AWS / Docker'],
          interviewTip: 'Talk about environment variable hygiene, zero-downtime deployments, and CORS domain whitelisting in production.'
        }
      },
      {
        title: '8. Technical Documentation, Architecture Diagram & Showcase',
        phase: 'Showcase',
        completed: false,
        guide: {
          overview: 'Package the project with a comprehensive README, system diagrams, API documentation, and live demo showcase.',
          keyTasks: [
            'Write a professional README with problem statement, architecture diagram, tech stack, and setup steps',
            'Add interactive Swagger / Postman API documentation links',
            'Record a 60-second Loom / MP4 video demo demonstrating core workflows',
            'Deploy live demo link and test all features in an incognito window'
          ],
          recommendedTools: ['Swagger UI', 'Mermaid.js', 'Loom / GitHub README Badges'],
          interviewTip: 'A well-documented repository with architecture diagrams and working live links stands out in resume screening.'
        }
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Distributed Systems',
    shortLabel: 'Backend & Distributed',
    badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/50',
    iconName: 'Server',
    defaultTech: 'Node.js / Spring Boot / Go, PostgreSQL, Redis, Docker, Kafka, gRPC',
    summary: 'High-throughput microservices, API contracts, caching tiers, asynchronous messaging, and containerization.',
    milestones: [
      {
        title: '1. System Architecture, Capacity Planning & API Contract (OpenAPI/gRPC)',
        phase: 'Architecture',
        completed: true,
        guide: {
          overview: 'Design system capacity requirements, read/write QPS estimates, storage growth, and protobuf/REST contracts.',
          keyTasks: [
            'Calculate back-of-the-envelope estimations (Daily Active Users, QPS, Bandwidth, Storage)',
            'Define strict OpenAPI 3.0 or Protobuf / gRPC service contracts',
            'Determine synchronous vs asynchronous service communication boundaries',
            'Establish idempotency keys and error response specifications'
          ],
          recommendedTools: ['Protobuf / gRPC', 'Swagger / OpenAPI', 'Excalidraw'],
          interviewTip: 'Interviewers probe capacity planning calculations and how you handle network latency between services.'
        }
      },
      {
        title: '2. Data Store Selection, Schema Indexing & Transaction Strategy',
        phase: 'Database',
        completed: false,
        guide: {
          overview: 'Choose primary and auxiliary data stores, design normalized schemas, B-tree indexes, and ACID isolation levels.',
          keyTasks: [
            'Implement relational schema with foreign keys or NoSQL document model based on access patterns',
            'Create B-Tree / Composite indexes and analyze query execution plans with EXPLAIN ANALYZE',
            'Implement database transactions with appropriate isolation levels to prevent race conditions',
            'Plan database partitioning / sharding or read replica strategy'
          ],
          recommendedTools: ['PostgreSQL / MySQL', 'Prisma / TypeORM / Hibernate', 'pgAdmin / EXPLAIN ANALYZE'],
          interviewTip: 'Explain ACID properties, database lock contention, and the trade-offs between Read Committed vs Serializable isolation.'
        }
      },
      {
        title: '3. Core Business Logic, Data Access Layer & ORM Configuration',
        phase: 'Backend',
        completed: false,
        guide: {
          overview: 'Write domain business services using clean architecture (Hexagonal / Clean Architecture) and connection pooling.',
          keyTasks: [
            'Implement repository pattern to isolate database queries from core domain logic',
            'Configure database connection pooling (HikariCP / pg-pool) to avoid connection exhaustion',
            'Implement strict request DTO validation and sanitization',
            'Implement structured JSON logging with correlation IDs (winston / pino / Logback)'
          ],
          recommendedTools: ['Node.js / Spring Boot / Go', 'HikariCP / pg-pool', 'Pino / Winston'],
          interviewTip: 'Explain why layered architecture makes code testable and prevents database details from leaking into domain logic.'
        }
      },
      {
        title: '4. Authentication, RBAC & API Gateway Rate Limiting',
        phase: 'Security',
        completed: false,
        guide: {
          overview: 'Secure the system with token-based auth, Role-Based Access Control (RBAC), and distributed rate limiting.',
          keyTasks: [
            'Implement JWT with short-lived access tokens and secure refresh token rotation',
            'Enforce Role-Based Access Control (RBAC) middleware for granular endpoint permissions',
            'Implement sliding-window rate limiting with Redis to mitigate DDoS and brute force',
            'Configure security headers (Helmet, Content Security Policy, strict CORS)'
          ],
          recommendedTools: ['Redis Rate Limiter', 'Passport.js / Spring Security', 'Helmet'],
          interviewTip: 'Discuss Token Bucket vs Leaky Bucket vs Sliding Window rate limiting algorithms and why Redis sorted sets excel for sliding windows.'
        }
      },
      {
        title: '5. Distributed Caching (Redis) & Asynchronous Event Queues (Kafka/RabbitMQ)',
        phase: 'Infrastructure',
        completed: false,
        guide: {
          overview: 'Accelerate read throughput with Redis cache-aside strategy and decouple write-heavy tasks using message brokers.',
          keyTasks: [
            'Implement Cache-Aside pattern in Redis with TTLs and cache stampede protection',
            'Publish asynchronous events to Kafka / RabbitMQ / BullMQ for background processing',
            'Implement idempotent consumer workers with dead-letter queues (DLQ) for retries',
            'Handle cache invalidation upon entity updates'
          ],
          recommendedTools: ['Redis / ioredis', 'Apache Kafka / RabbitMQ / BullMQ', 'Redlock'],
          interviewTip: 'Be prepared to explain Cache Penetration, Cache Breakdown, Cache Avalanche, and how TTL jitter solves avalanches.'
        }
      },
      {
        title: '6. Load Testing, Concurrency Benchmarks & Chaos Testing',
        phase: 'Testing',
        completed: false,
        guide: {
          overview: 'Stress-test your API endpoints to identify CPU bottlenecks, connection pool limits, and memory leaks under high QPS.',
          keyTasks: [
            'Write load test scripts simulating 1,000+ concurrent virtual users with ramp-up periods',
            'Measure p95 and p99 latency percentiles under sustained throughput',
            'Identify and resolve database slow queries, N+1 query problems, and CPU bottlenecks',
            'Test service recovery under sudden database disconnection or Redis crash'
          ],
          recommendedTools: ['k6 / Artillery', 'Apache JMeter', 'Autocannon / Wrk'],
          interviewTip: 'Highlight the difference between average response time and p99 latency: tail latency is what impacts real enterprise users.'
        }
      },
      {
        title: '7. Containerization (Docker), Kubernetes & Cloud Deployment',
        phase: 'Hosting',
        completed: false,
        guide: {
          overview: 'Package services into minimal multi-stage Docker images and deploy with container orchestration and health checks.',
          keyTasks: [
            'Create production multi-stage Dockerfile (Alpine/Distroless, non-root user, slim image size)',
            'Configure docker-compose for local microservice orchestration (API + Postgres + Redis + Kafka)',
            'Implement readiness (`/health/ready`) and liveness (`/health/live`) probe endpoints',
            'Deploy to cloud container service (AWS ECS / Kubernetes / Railway / Render)'
          ],
          recommendedTools: ['Docker & Docker Compose', 'Kubernetes / AWS ECS', 'GitHub Actions'],
          interviewTip: 'Explain why multi-stage builds reduce attack surface and why distinct readiness vs liveness probes prevent routing traffic to booting containers.'
        }
      },
      {
        title: '8. Distributed Tracing, Observability (Prometheus/Grafana) & Architecture Writeup',
        phase: 'Showcase',
        completed: false,
        guide: {
          overview: 'Instrument services with OpenTelemetry metrics, Prometheus scrapers, Grafana dashboards, and architectural documentation.',
          keyTasks: [
            'Export metrics (HTTP latency, error rate, memory, active connections) to Prometheus',
            'Build Grafana dashboard displaying RED metrics (Rate, Errors, Duration)',
            'Implement OpenTelemetry distributed trace IDs across microservice calls (Jaeger/Zipkin)',
            'Write an in-depth architecture case study describing benchmarks and design decisions'
          ],
          recommendedTools: ['Prometheus & Grafana', 'OpenTelemetry / Jaeger', 'Mermaid.js'],
          interviewTip: 'Demonstrating Prometheus monitoring and Grafana RED dashboards instantly elevates a candidate from junior to senior tier.'
        }
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Application & Design System',
    shortLabel: 'Frontend UI',
    badgeColor: 'text-teal-400 bg-teal-950/80 border-teal-800/50',
    iconName: 'Layout',
    defaultTech: 'Next.js, TypeScript, Tailwind CSS, Zustand, Framer Motion, Storybook',
    summary: 'Complex client-side architecture, responsive design system, state synchronization, and web performance optimization.',
    milestones: [
      {
        title: '1. UI/UX Wireframes, Component Hierarchy & Information Architecture',
        phase: 'Planning',
        completed: true,
        guide: {
          overview: 'Map user journeys, visual design tokens, atomic component hierarchy, and responsive breakpoints.',
          keyTasks: [
            'Design wireframes and user interaction flows in Figma / Excalidraw',
            'Define design tokens (color scales, typography, spacing, shadows, border radii)',
            'Structure component hierarchy into atoms, molecules, organisms, and page templates',
            'Plan responsive layout strategies (mobile-first, tablet, widescreen)'
          ],
          recommendedTools: ['Figma / Excalidraw', 'Tailwind CSS config', 'Storybook'],
          interviewTip: 'Discuss mobile-first responsive methodology and why establishing design tokens early avoids arbitrary CSS values.'
        }
      },
      {
        title: '2. Project Scaffolding, Dynamic Routing & Global State Store (Zustand/Redux)',
        phase: 'Setup',
        completed: false,
        guide: {
          overview: 'Set up TypeScript strict mode, router structure, persistent layout shells, and decoupled global state stores.',
          keyTasks: [
            'Scaffold Next.js / Vite project with strict TypeScript configuration and path aliases (`@/*`)',
            'Implement layout hierarchy with nested routing, persistent sidebars, and header shells',
            'Configure global client state store (Zustand / Redux Toolkit) with selective subscriptions',
            'Set up dark/light theme switching with localStorage persistence and CSS variables'
          ],
          recommendedTools: ['Next.js App Router / Vite', 'TypeScript', 'Zustand / Redux Toolkit'],
          interviewTip: 'Explain why Zustand selectors prevent unnecessary component re-renders compared to naive React Context usage.'
        }
      },
      {
        title: '3. Responsive UI Layouts, Design System & Accessibility (a11y) Standards',
        phase: 'UI/UX',
        completed: false,
        guide: {
          overview: 'Build fluid, accessible, interactive UI components matching WCAG AA accessibility standards.',
          keyTasks: [
            'Create reusable components (Modals, Dialogs, Dropdowns, Tabs, Accordions, Data Tables)',
            'Implement keyboard focus trapping, Esc key dismissal, and ARIA attributes for modals',
            'Add subtle micro-animations and page transitions with Framer Motion',
            'Verify color contrast ratios and responsive touch targets for mobile devices'
          ],
          recommendedTools: ['Radix UI / Headless UI', 'Framer Motion', 'Tailwind CSS'],
          interviewTip: 'Highlight accessibility (a11y) compliance, keyboard navigation focus rings, and screen-reader accessibility.'
        }
      },
      {
        title: '4. API Client Integration, Optimistic Updates & Server Cache Layer',
        phase: 'Integration',
        completed: false,
        guide: {
          overview: 'Integrate backend APIs with TanStack React Query for automatic caching, background refetching, and optimistic mutations.',
          keyTasks: [
            'Implement type-safe API client with request/response Zod validation',
            'Configure TanStack Query hooks with stale-time, cache-time, and automatic retry policies',
            'Implement optimistic UI updates with automatic rollback on server error',
            'Add debounced search input hooks and infinite scrolling intersection observers'
          ],
          recommendedTools: ['TanStack React Query', 'Zod', 'Axios / ky'],
          interviewTip: 'Explain the difference between client state (UI toggles, modals) and server state (caching, deduplication, invalidation).'
        }
      },
      {
        title: '5. Frontend Performance Tuning (CWV, LCP, Code Splitting, Memoization)',
        phase: 'Optimization',
        completed: false,
        guide: {
          overview: 'Optimize Core Web Vitals (Largest Contentful Paint, Interaction to Next Paint, Cumulative Layout Shift).',
          keyTasks: [
            'Implement route-based and component-based dynamic code splitting (`React.lazy` / `next/dynamic`)',
            'Optimize images with WebP/AVIF formats, proper `srcset`, and priority preloading for hero assets',
            'Analyze JavaScript bundle sizes with `rollup-plugin-visualizer` / `@next/bundle-analyzer`',
            'Audit performance in Chrome DevTools Lighthouse to achieve a 90+ performance score'
          ],
          recommendedTools: ['Lighthouse / WebPageTest', 'Rollup Visualizer', 'Chrome DevTools Performance'],
          interviewTip: 'Demonstrate deep knowledge of Core Web Vitals (LCP, INP, CLS) and how you minimized hydration overhead and render blocking.'
        }
      },
      {
        title: '6. Component Unit Testing (Jest/RTL) & E2E Critical Path Testing (Playwright)',
        phase: 'Testing',
        completed: false,
        guide: {
          overview: 'Test components from the user perspective and automate end-to-end user journeys using modern test runners.',
          keyTasks: [
            'Write React Testing Library unit tests verifying user interaction behaviors (not implementation details)',
            'Mock API responses with Mock Service Worker (MSW)',
            'Write Playwright / Cypress E2E tests for critical user journeys (signup, checkout, search flow)',
            'Set up automated test runs on pull requests with GitHub Actions'
          ],
          recommendedTools: ['Playwright / Cypress', 'Vitest / React Testing Library', 'Mock Service Worker (MSW)'],
          interviewTip: 'Explain why querying by role (`getByRole`, `getByLabelText`) improves both test stability and accessibility.'
        }
      },
      {
        title: '7. Production Bundle Optimization & CDN Edge Deployment (Vercel/Cloudflare)',
        phase: 'Hosting',
        completed: false,
        guide: {
          overview: 'Deploy to global edge networks with automatic CDN caching, Brotli compression, and security headers.',
          keyTasks: [
            'Configure production build minification, tree-shaking, and asset hash versioning',
            'Deploy to Vercel / Cloudflare Pages with edge caching and instant rollbacks',
            'Configure custom domain, SSL certificates, and security headers (CSP, X-Frame-Options)',
            'Set up Sentry / LogRocket client-side error tracking'
          ],
          recommendedTools: ['Vercel / Cloudflare Pages', 'Sentry', 'GitHub Actions'],
          interviewTip: 'Discuss how CDN edge caching reduces TTFB (Time to First Byte) globally and how Sentry captures real user exception stacks.'
        }
      },
      {
        title: '8. Component Documentation (Storybook) & Interactive Showcase Demo',
        phase: 'Showcase',
        completed: false,
        guide: {
          overview: 'Showcase your UI library with an interactive Storybook catalog and interactive demo walkthrough.',
          keyTasks: [
            'Publish Storybook documentation showcasing all component states and variants',
            'Write an interactive documentation page with live interactive controls',
            'Create a demo walkthrough video demonstrating responsive breakpoints and fluid animations',
            'Provide live deployed URL with sample login credentials'
          ],
          recommendedTools: ['Storybook', 'Loom', 'GitHub README'],
          interviewTip: 'Storybook documentation proves to design and engineering teams that you build scalable, maintainable design systems.'
        }
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning & GenAI Pipeline',
    shortLabel: 'AI / Machine Learning',
    badgeColor: 'text-purple-400 bg-purple-950/80 border-purple-800/50',
    iconName: 'Cpu',
    defaultTech: 'Python, PyTorch, FastAPI, Hugging Face, LangChain, ChromaDB, Docker',
    summary: 'End-to-end ML workflow from dataset acquisition and training to model quantization and serving microservices.',
    milestones: [
      {
        title: '1. Problem Formulation, Dataset Acquisition & Exploratory Data Analysis (EDA)',
        phase: 'Data',
        completed: true,
        guide: {
          overview: 'Frame the ML objective, gather diverse training data, check distributions, and identify class imbalances.',
          keyTasks: [
            'Formulate the mathematical objective function and success metrics (F1, Precision-Recall AUC, RMSE)',
            'Acquire raw datasets and perform Exploratory Data Analysis (EDA) in Jupyter notebooks',
            'Visualize feature correlations, distributions, missing values, and outliers',
            'Establish baseline non-ML heuristic benchmark to measure progress against'
          ],
          recommendedTools: ['Pandas / NumPy', 'Seaborn / Matplotlib', 'Jupyter Lab'],
          interviewTip: 'Always establish a simple baseline (e.g. majority class or logistic regression) before claiming complex neural nets are necessary.'
        }
      },
      {
        title: '2. Data Preprocessing, Cleaning, Tokenization & Feature Engineering Pipeline',
        phase: 'Preprocessing',
        completed: false,
        guide: {
          overview: 'Build reproducible data transformation pipelines to normalize, encode, tokenize, and clean training features.',
          keyTasks: [
            'Handle missing values with imputation strategies and remove duplicate records',
            'Perform feature scaling, one-hot/embedding encoding, or text tokenization (Byte-Pair Encoding)',
            'Build scikit-learn / PyTorch `Dataset` & `DataLoader` pipelines with data augmentation',
            'Split data into strict Train / Validation / Test sets with stratification'
          ],
          recommendedTools: ['scikit-learn Pipelines', 'Hugging Face Tokenizers', 'PyTorch DataLoaders'],
          interviewTip: 'Explain data leakage prevention: fit transformers ONLY on training set and transform validation/test sets.'
        }
      },
      {
        title: '3. Baseline Model Selection, Training & Cross-Validation Architecture',
        phase: 'Modeling',
        completed: false,
        guide: {
          overview: 'Train candidate model architectures with k-fold cross-validation, loss tracking, and early stopping.',
          keyTasks: [
            'Train multiple candidate models (XGBoost, Transformer, CNN, or Fine-tuned LLM)',
            'Implement k-fold cross-validation to guard against overfitting',
            'Track training and validation loss curves with TensorBoard / Weights & Biases',
            'Configure early stopping callbacks and model checkpointing'
          ],
          recommendedTools: ['PyTorch / XGBoost', 'Weights & Biases / MLflow', 'Hugging Face Transformers'],
          interviewTip: 'Discuss the Bias-Variance trade-off and explain how loss curves diagnose underfitting vs overfitting.'
        }
      },
      {
        title: '4. Hyperparameter Tuning, Metric Evaluation (F1/AUC) & Error Analysis',
        phase: 'Evaluation',
        completed: false,
        guide: {
          overview: 'Systematically optimize hyperparameters and conduct deep error analysis on misclassified validation samples.',
          keyTasks: [
            'Perform Bayesian optimization / Optuna sweeps over learning rates, batch sizes, and regularizers',
            'Evaluate models on unseen test split using confusion matrices, ROC-AUC, and precision-recall curves',
            'Perform error analysis: categorize false positives/negatives to understand failure modes',
            'Benchmark inference latency and memory footprints across candidates'
          ],
          recommendedTools: ['Optuna', 'scikit-learn metrics', 'Weights & Biases'],
          interviewTip: 'Why accuracy is misleading on imbalanced datasets: explain why Macro F1 and Precision-Recall AUC matter in real-world ML.'
        }
      },
      {
        title: '5. Model Quantization, Serialization (ONNX/TorchScript) & Inference Optimization',
        phase: 'Optimization',
        completed: false,
        guide: {
          overview: 'Convert model weights to high-speed inference runtimes with INT8/FP16 quantization and batching.',
          keyTasks: [
            'Export model weights to portable formats (ONNX / TorchScript / TensorRT)',
            'Apply post-training quantization (INT8/FP16) to reduce model size by 2x-4x with minimal accuracy drop',
            'Benchmark speedup: compare raw PyTorch vs ONNX Runtime inference latency',
            'Implement dynamic request batching for high-throughput inference'
          ],
          recommendedTools: ['ONNX Runtime', 'TorchScript', 'TensorRT / llama.cpp'],
          interviewTip: 'Discuss memory-bandwidth vs compute-bound workloads in inference and how quantization reduces memory bus pressure.'
        }
      },
      {
        title: '6. Model Serving REST/gRPC API Microservice (FastAPI / TorchServe)',
        phase: 'API Serving',
        completed: false,
        guide: {
          overview: 'Wrap the optimized model in an asynchronous, low-latency API service with schema validation and input guards.',
          keyTasks: [
            'Build asynchronous REST API with FastAPI / TorchServe for single and batch predictions',
            'Implement Pydantic input/output validation schemas and pre/post-processing wrappers',
            'Add input safety guards, prompt injection sanitizers, and token limits',
            'Implement worker thread pooling to prevent synchronous model inference from blocking the async event loop'
          ],
          recommendedTools: ['FastAPI / Uvicorn', 'Pydantic', 'TorchServe / vLLM'],
          interviewTip: 'Explain why heavy CPU/GPU matrix computations must run in separate process pools to prevent choking async HTTP event loops.'
        }
      },
      {
        title: '7. Containerization, Cloud GPU Deployment & Model Drift Telemetry',
        phase: 'Hosting',
        completed: false,
        guide: {
          overview: 'Package model and inference engine into a Docker container and deploy to cloud GPU compute with telemetry.',
          keyTasks: [
            'Build container with NVIDIA CUDA base image and pinned dependency wheels',
            'Deploy to cloud GPU endpoint (AWS SageMaker / RunPod / Modal / Render)',
            'Implement prediction logging and distribution drift monitoring (Evidently AI / Prometheus)',
            'Set up auto-scaling policies based on request queue latency'
          ],
          recommendedTools: ['Docker (NVIDIA Container Toolkit)', 'AWS SageMaker / Modal / RunPod', 'Evidently AI'],
          interviewTip: 'Explain data drift vs concept drift and how you would establish automated retraining pipelines when drift exceeds thresholds.'
        }
      },
      {
        title: '8. Model Card, Benchmark Report & Interactive Demo UI (Streamlit/Gradio)',
        phase: 'Showcase',
        completed: false,
        guide: {
          overview: 'Publish an interactive web demo for stakeholders and write a transparent Model Card documenting capabilities and limits.',
          keyTasks: [
            'Build interactive web UI with Streamlit / Gradio / Next.js for real-time model interaction',
            'Write a standardized Model Card (training data, intended use, limitations, bias evaluation)',
            'Record video demonstration showing edge cases and inference speed',
            'Publish open-source code and model weights (Hugging Face Hub / GitHub)'
          ],
          recommendedTools: ['Gradio / Streamlit', 'Hugging Face Spaces', 'Model Card Toolkit'],
          interviewTip: 'Model cards and interactive Gradio apps demonstrate both technical mastery and ethical AI responsibility to engineering leaders.'
        }
      }
    ]
  },
  {
    id: 'devops-cloud',
    title: 'DevOps & Cloud Infrastructure (IaC)',
    shortLabel: 'DevOps & Cloud',
    badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800/50',
    iconName: 'Workflow',
    defaultTech: 'Terraform, Docker, Kubernetes, GitHub Actions, AWS / GCP, Prometheus, Helm',
    summary: 'Automated CI/CD release pipelines, Infrastructure as Code, container orchestration, and centralized observability.',
    milestones: [
      {
        title: '1. Cloud Architecture Specification & Network Topology (VPC, Subnets, IAM)',
        phase: 'Planning',
        completed: true,
        guide: {
          overview: 'Plan isolated network partitions, public/private subnets, NAT gateways, and least-privilege IAM policies.',
          keyTasks: [
            'Design multi-AZ VPC topology with public (ingress) and private (workload/DB) subnets',
            'Define Security Groups and Network ACL rules with strict ingress whitelisting',
            'Draft IAM roles and policies following the Principle of Least Privilege',
            'Create network architecture topology diagram'
          ],
          recommendedTools: ['AWS VPC / GCP VPC', 'Draw.io / Cloudcraft', 'IAM Policy Simulator'],
          interviewTip: 'Explain why databases should never reside in public subnets and how NAT Gateways allow outbound updates without exposing inbound ports.'
        }
      },
      {
        title: '2. Infrastructure as Code (IaC) Provisioning (Terraform / CloudFormation)',
        phase: 'Infrastructure',
        completed: false,
        guide: {
          overview: 'Codify all cloud resources declaratively using Terraform with remote state locking and modular designs.',
          keyTasks: [
            'Write modular Terraform files (`modules/vpc`, `modules/compute`, `modules/rds`)',
            'Configure remote S3 state storage with DynamoDB state locking to prevent concurrent apply race conditions',
            'Use input variables, output values, and environment workspaces (staging vs prod)',
            'Run `terraform plan` and security linting with `tflint` / `tfsec`'
          ],
          recommendedTools: ['Terraform / OpenTofu', 'AWS S3 + DynamoDB state lock', 'tfsec / tflint'],
          interviewTip: 'Discuss the dangers of state drift and explain how automated GitOps applies prevent manual configuration drift.'
        }
      },
      {
        title: '3. Automated CI/CD Multi-Stage Pipeline (GitHub Actions / GitLab CI)',
        phase: 'Automation',
        completed: false,
        guide: {
          overview: 'Construct robust continuous integration pipelines that run linters, tests, builds, and automated security scans on PRs.',
          keyTasks: [
            'Create multi-job GitHub Actions workflow: lint -> test -> security scan -> build -> deploy',
            'Implement parallel job execution and caching for package managers (`npm`, `pip`, `go mod`)',
            'Scan dependencies for CVEs using Snyk / Trivy / GitHub Dependabot',
            'Automate semantic release versioning and changelog generation'
          ],
          recommendedTools: ['GitHub Actions / GitLab CI', 'Trivy / Snyk', 'Semantic Release'],
          interviewTip: 'Explain how ephemeral pipeline environments (preview environments) shorten feedback loops for pull request reviewers.'
        }
      },
      {
        title: '4. Container Packaging (Docker) & Cluster Orchestration (Kubernetes Helm)',
        phase: 'Containers',
        completed: false,
        guide: {
          overview: 'Package applications into minimal OCI containers and deploy via Kubernetes Deployments, Services, and Helm charts.',
          keyTasks: [
            'Write secure multi-stage Dockerfiles with rootless user execution and minimal base images',
            'Create Kubernetes manifests (Deployments, Services, ConfigMaps, Secrets, Ingress)',
            'Package manifests into reusable Helm charts with configurable `values.yaml`',
            'Configure Horizontal Pod Autoscalers (HPA) based on CPU and memory utilization thresholds'
          ],
          recommendedTools: ['Docker', 'Kubernetes (EKS/GKE/k3s)', 'Helm'],
          interviewTip: 'Explain why liveness probes should not depend on external database health (which could trigger cascading cluster restart storms).'
        }
      },
      {
        title: '5. Zero-Trust Security Hardening, Secret Vault & Policy Scanning',
        phase: 'Security',
        completed: false,
        guide: {
          overview: 'Enforce secret management without hardcoded credentials, container vulnerability scanning, and TLS encryption.',
          keyTasks: [
            'Integrate HashiCorp Vault or AWS Secrets Manager for runtime secret injection',
            'Enforce TLS 1.3 encryption in transit with cert-manager automated Let\'s Encrypt certificates',
            'Configure Kubernetes NetworkPolicies to isolate pod-to-pod communication',
            'Implement static container image scanning in CI pipeline'
          ],
          recommendedTools: ['HashiCorp Vault / AWS Secrets Manager', 'cert-manager', 'Trivy'],
          interviewTip: 'Discuss Zero Trust principles: never trust, always verify every network hop, even internal microservice traffic.'
        }
      },
      {
        title: '6. Centralized Logging (Loki), Prometheus Metrics & Grafana Dashboards',
        phase: 'Observability',
        completed: false,
        guide: {
          overview: 'Build complete visibility into system health with centralized log aggregation, metrics scrapers, and alert rules.',
          keyTasks: [
            'Deploy Prometheus Operator and Grafana stack to monitor node and pod metrics',
            'Aggregate container stdout logs into Grafana Loki / ELK Stack',
            'Create Grafana dashboards showing cluster CPU, memory, network I/O, and ingress error rates',
            'Configure Alertmanager webhook alerts to Slack / Discord / PagerDuty for critical thresholds'
          ],
          recommendedTools: ['Prometheus & Grafana', 'Grafana Loki / Promtail', 'Alertmanager'],
          interviewTip: 'Describe the 3 pillars of observability (Metrics, Logs, Traces) and how alerts should be actionable, not noisy.'
        }
      },
      {
        title: '7. High-Availability Failover, Blue/Green Deployments & Disaster Recovery',
        phase: 'Hosting',
        completed: false,
        guide: {
          overview: 'Implement zero-downtime deployment strategies (Blue/Green or Canary) and verify backup restoration runbooks.',
          keyTasks: [
            'Implement ArgoCD / Flux for GitOps automated cluster synchronization',
            'Configure Blue/Green or Canary rollouts using Argo Rollouts or Ingress weighting',
            'Set up automated database snapshot backups with cross-region replication',
            'Conduct a simulated disaster recovery drill measuring Recovery Time Objective (RTO) and Recovery Point Objective (RPO)'
          ],
          recommendedTools: ['ArgoCD / Argo Rollouts', 'AWS RDS Backups', 'Velero'],
          interviewTip: 'Define RTO (Recovery Time Objective) and RPO (Recovery Point Objective) and explain how Canary rollouts catch production bugs early.'
        }
      },
      {
        title: '8. Operational Runbooks, Cloud Cost Optimization & Architecture Topology Diagram',
        phase: 'Showcase',
        completed: false,
        guide: {
          overview: 'Document operational incident procedures, optimize cloud infrastructure spend, and publish the architecture spec.',
          keyTasks: [
            'Write detailed operational runbooks for common alerts (high CPU, pod crash loop, DB failover)',
            'Conduct cloud cost optimization audit (right-sizing instances, spot instances, storage lifecycle policies)',
            'Create interactive infrastructure topology diagram with network flow annotations',
            'Publish public GitHub repository with sanitized Terraform and Helm charts'
          ],
          recommendedTools: ['Infracost', 'Mermaid.js / Cloudcraft', 'Markdown Runbooks'],
          interviewTip: 'Cost optimization (FinOps) is a key differentiator for infrastructure engineers—show how Infracost in CI prevents unexpected cloud bills.'
        }
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Application (iOS / Android / Cross-Platform)',
    shortLabel: 'Mobile App',
    badgeColor: 'text-blue-400 bg-blue-950/80 border-blue-800/50',
    iconName: 'Smartphone',
    defaultTech: 'React Native / Flutter, TypeScript, SQLite, Firebase, Fastlane, Redux',
    summary: 'Native or cross-platform mobile app with offline-first local persistence, device APIs, and store deployment pipeline.',
    milestones: [
      {
        title: '1. App Flow Wireframes, UX Guidelines & Native Platform SDK Toolchain',
        phase: 'Planning',
        completed: true,
        guide: {
          overview: 'Map mobile navigation flows, touch gestures, platform human interface guidelines, and toolchain setup.',
          keyTasks: [
            'Design mobile screens following Apple Human Interface Guidelines and Google Material Design',
            'Configure cross-platform project (React Native with Expo / Flutter) with TypeScript',
            'Set up iOS Simulator and Android Emulator environments',
            'Establish design tokens, typography, and responsive screen scaling'
          ],
          recommendedTools: ['Figma', 'Expo / React Native CLI / Flutter', 'Xcode & Android Studio'],
          interviewTip: 'Discuss platform-specific UX differences: Android back gesture/hardware button vs iOS swipe-to-back navigation.'
        }
      },
      {
        title: '2. Local Database & Offline-First Persistence (SQLite / Room / Realm)',
        phase: 'Storage',
        completed: false,
        guide: {
          overview: 'Implement local on-device database storage for offline access and instant app startup times.',
          keyTasks: [
            'Integrate on-device relational database (SQLite / WatermelonDB / Realm / Room)',
            'Define local schema migrations and indexing on primary key queries',
            'Implement secure storage for sensitive auth tokens (Keychain / EncryptedSharedPreferences)',
            'Create repository abstraction layer to switch between local cache and remote network'
          ],
          recommendedTools: ['SQLite / WatermelonDB', 'Expo SecureStore / React Native Keychain', 'MMKV'],
          interviewTip: 'Explain why MMKV or SQLite is exponentially faster than asynchronous AsyncStorage on mobile devices.'
        }
      },
      {
        title: '3. Core Business Logic, State Architecture & Screen Navigation Hierarchy',
        phase: 'Core Logic',
        completed: false,
        guide: {
          overview: 'Build deep stack navigation, bottom tab bars, and predictable state management.',
          keyTasks: [
            'Configure React Navigation / Flutter Navigator with deep linking support',
            'Implement stack navigators, bottom tab bars, and modal presentation layers',
            'Manage app state with Redux Toolkit / Zustand including offline state persistence',
            'Handle device lifecycle state transitions (Active, Background, Inactive)'
          ],
          recommendedTools: ['React Navigation', 'Zustand / Redux Toolkit', 'Framer Motion / Reanimated'],
          interviewTip: 'Discuss how unmounting off-screen navigation screens prevents mobile memory leaks and battery drain.'
        }
      },
      {
        title: '4. Native Device Capabilities (Biometrics, Push Notifications, Camera, GPS)',
        phase: 'Platform',
        completed: false,
        guide: {
          overview: 'Integrate native device hardware modules with permission request guards and fallbacks.',
          keyTasks: [
            'Implement Biometric authentication (FaceID / TouchID / Fingerprint) with fallback passcode',
            'Configure Push Notifications (FCM / APNs) with background handler tokens',
            'Integrate Camera / Photo Picker with image compression before upload',
            'Handle permission denial flows gracefully with settings redirect prompts'
          ],
          recommendedTools: ['Expo LocalAuthentication', 'Firebase Cloud Messaging (FCM)', 'Expo Camera'],
          interviewTip: 'Explain the native bridge / JSI (JavaScript Interface) architecture and how React Native communicates with native iOS/Android code.'
        }
      },
      {
        title: '5. Background Sync, Offline Queuing & Network Resilience Handling',
        phase: 'Networking',
        completed: false,
        guide: {
          overview: 'Queue mutating user actions when offline and automatically reconcile with the cloud when connection resumes.',
          keyTasks: [
            'Implement network connectivity listener using NetInfo',
            'Build an offline mutation queue stored in SQLite with optimistic UI updates',
            'Reconcile pending actions in background with server conflict resolution strategies',
            'Add pull-to-refresh and network reconnect banner notifications'
          ],
          recommendedTools: ['NetInfo', 'TanStack Query offline support', 'Redux Persist'],
          interviewTip: 'Explain conflict resolution strategies (Last-Write-Wins vs Vector Clocks vs CRDTs) for offline-first synchronization.'
        }
      },
      {
        title: '6. Unit/Component Testing & Real Device Simulator Test Matrices',
        phase: 'Testing',
        completed: false,
        guide: {
          overview: 'Test mobile components and automate full user flows across varied screen dimensions and OS versions.',
          keyTasks: [
            'Write component tests with React Native Testing Library',
            'Automate end-to-end user flows on simulators using Maestro / Detox',
            'Test layout rendering on varied aspect ratios (notch, dynamic island, tablets)',
            'Profile memory and FPS performance to ensure 60fps smooth scrolling'
          ],
          recommendedTools: ['Maestro / Detox', 'React Native Testing Library', 'Flipper / React Native DevTools'],
          interviewTip: 'Highlight why Maestro or Detox provides more reliable mobile E2E testing than generic web testing tools.'
        }
      },
      {
        title: '7. App Store / Play Store Build Signing, Fastlane CI/CD & TestFlight Beta',
        phase: 'Hosting',
        completed: false,
        guide: {
          overview: 'Automate build compilation, cryptographic code signing, and distribution to Apple TestFlight and Google Play Beta.',
          keyTasks: [
            'Configure iOS provisioning profiles, certificates, and Android keystore signing',
            'Write Fastlane scripts (`Fastfile`) to automate build, version bump, and upload',
            'Set up GitHub Actions to trigger automated TestFlight and Play Store Internal tracks on release tags',
            'Configure Over-The-Air (OTA) runtime updates for instant bug fixes'
          ],
          recommendedTools: ['Fastlane', 'Apple TestFlight / Google Play Console', 'EAS Build'],
          interviewTip: 'Discuss the code signing lifecycle (Certificates, Identifiers, Provisioning Profiles) and how Fastlane match shares certs across a team.'
        }
      },
      {
        title: '8. Release Notes, Interactive Video Walkthrough & Architecture Specification',
        phase: 'Showcase',
        completed: false,
        guide: {
          overview: 'Package the mobile application with release notes, recorded device screen demos, and architecture documentation.',
          keyTasks: [
            'Record high-resolution iOS and Android screen demo videos showing offline capabilities',
            'Write a clear README with architecture diagrams, state flow, and local build instructions',
            'Provide APK / TestFlight public beta link for reviewers to test directly on their phones',
            'Publish structured release notes with feature highlights'
          ],
          recommendedTools: ['GitHub Releases', 'Loom', 'Figma presentation'],
          interviewTip: 'Providing a downloadable APK or TestFlight link lets interviewers experience your UI polish firsthand on their own device.'
        }
      }
    ]
  },
  {
    id: 'system-design',
    title: 'System Design & Low-Level Design (LLD)',
    shortLabel: 'System Design / LLD',
    badgeColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-800/50',
    iconName: 'Boxes',
    defaultTech: 'C++ / Java / Go, Multi-threading, Design Patterns, POSIX, Memory Management',
    summary: 'Object-oriented low-level architecture (LLD), concurrency primitives, design patterns, and high-performance system internals.',
    milestones: [
      {
        title: '1. Problem Scope, Functional & Non-Functional Constraints Definition',
        phase: 'Requirements',
        completed: true,
        guide: {
          overview: 'Clarify system boundaries, performance constraints (memory limits, throughput, latency), and public interfaces.',
          keyTasks: [
            'Specify functional requirements and edge cases (e.g. Rate Limiter, In-Memory DB, LRU Cache, Parking Lot)',
            'Define non-functional constraints: concurrency model, thread safety, memory footprint, time complexity targets',
            'Outline external APIs and interface abstractions',
            'Document class hierarchy and sequence diagram'
          ],
          recommendedTools: ['Mermaid.js / PlantUML', 'Markdown Specs', 'Excalidraw'],
          interviewTip: 'In LLD interviews, spend the first 5 minutes clarifying edge cases and concurrency requirements before writing any code.'
        }
      },
      {
        title: '2. Low-Level Class Diagrams, SOLID Design Patterns & Interface Contracts',
        phase: 'Design',
        completed: false,
        guide: {
          overview: 'Apply SOLID principles and classic Gang-of-Four design patterns to design extensible, modular classes.',
          keyTasks: [
            'Create UML Class Diagram displaying Inheritance, Aggregation, and Composition relationships',
            'Apply appropriate Design Patterns (Factory, Strategy, Observer, Singleton, Decorator, Command)',
            'Adhere to SOLID principles (Single Responsibility, Open-Closed, Liskov, Interface Segregation, Dependency Inversion)',
            'Define clean abstract base interfaces to enable polymorphism'
          ],
          recommendedTools: ['PlantUML / Mermaid', 'IntelliJ / VSCode UML', 'Draw.io'],
          interviewTip: 'Explicitly explain why you chose a specific pattern (e.g., Strategy Pattern for swappable eviction policies in a Cache).'
        }
      },
      {
        title: '3. Core Engine Implementation, Memory Management & Data Structures',
        phase: 'Implementation',
        completed: false,
        guide: {
          overview: 'Implement optimal data structures (HashMaps, Doubly Linked Lists, B-Trees, Tries, Heaps) and efficient memory usage.',
          keyTasks: [
            'Implement composite data structures (e.g. HashMap + Doubly Linked List for O(1) LRU Cache operations)',
            'Manage memory lifecycle (RAII in C++, smart pointers, garbage collection tuning in Java/Go)',
            'Avoid unnecessary object allocations in hot loops to reduce GC pauses',
            'Implement clean encapsulation and immutable data transfer objects'
          ],
          recommendedTools: ['C++20 / Java 21 / Go', 'Valgrind / ASan', 'JMH Benchmarks'],
          interviewTip: 'Explain the exact time and space complexity of every core operation (e.g. O(1) get/put, O(log N) heap extraction).'
        }
      },
      {
        title: '4. Concurrency, Thread Safety & Synchronization Primitives (Mutex/Locks)',
        phase: 'Concurrency',
        completed: false,
        guide: {
          overview: 'Ensure thread-safety across concurrent reads and writes using locks, read-write locks, atomic primitives, and lock-free structures.',
          keyTasks: [
            'Implement fine-grained locking or Read-Write Locks (`std::shared_mutex` / `ReentrantReadWriteLock`)',
            'Utilize lock-free atomic operations (`std::atomic` / `AtomicInteger`) where appropriate',
            'Guard against common concurrency pitfalls: Deadlocks, Race Conditions, Livelocks, and Starvation',
            'Implement thread pools and work-stealing queues for concurrent task execution'
          ],
          recommendedTools: ['Pthreads / std::thread', 'ThreadSanitizer (TSan)', 'Java Concurrency Utilities'],
          interviewTip: 'Be prepared to explain the 4 Coffman conditions for deadlocks and how lock ordering or try-lock timeouts prevent deadlocks.'
        }
      },
      {
        title: '5. CLI Driver, Client Library or Extensible Plugin Interface',
        phase: 'Interface',
        completed: false,
        guide: {
          overview: 'Provide a robust Command-Line Interface (CLI), embedded library API, or interactive REPL for users and developers.',
          keyTasks: [
            'Build an interactive REPL shell or CLI parser with command history and tab completion',
            'Provide idiomatic client SDK methods and clear error types',
            'Implement an extensible plugin / event listener mechanism (e.g., custom storage backends)',
            'Add configurable logging and verbose debugging flags'
          ],
          recommendedTools: ['Clap / cxxopts (C++)', 'Picocli (Java)', 'Cobra (Go)'],
          interviewTip: 'A functional CLI or REPL demonstrates that your design is practically usable, not just theoretical code.'
        }
      },
      {
        title: '6. Comprehensive Unit Testing, Memory Leak Checks (Valgrind) & Stress Tests',
        phase: 'Testing',
        completed: false,
        guide: {
          overview: 'Validate correctness with unit tests, sanitizers for memory corruption, and high-concurrency stress testing.',
          keyTasks: [
            'Write comprehensive unit tests covering standard cases, boundary conditions, and invalid inputs',
            'Run multi-threaded stress tests simulating hundreds of concurrent worker threads',
            'Verify zero memory leaks and undefined behavior using AddressSanitizer (ASan) and Valgrind',
            'Achieve 90%+ code coverage on core engine modules'
          ],
          recommendedTools: ['Google Test (GTest)', 'JUnit 5', 'Valgrind / AddressSanitizer / ThreadSanitizer'],
          interviewTip: 'Running AddressSanitizer and ThreadSanitizer proves your concurrent C++/Java code has no subtle race conditions or heap leaks.'
        }
      },
      {
        title: '7. Cross-Platform Compilation, Release Binary Packaging & Benchmarking',
        phase: 'Hosting',
        completed: false,
        guide: {
          overview: 'Build automated CMake/Gradle build scripts, generate static binaries, and measure performance benchmarks.',
          keyTasks: [
            'Set up CMake / Gradle / Makefile build system with optimized `-O3` compiler flags',
            'Run micro-benchmarks measuring throughput (ops/sec) and latency percentiles',
            'Package standalone binaries or library packages across Linux, macOS, and Windows',
            'Automate release builds via GitHub Actions CI pipeline'
          ],
          recommendedTools: ['CMake / Gradle', 'Google Benchmark / JMH', 'GitHub Releases'],
          interviewTip: 'Present hard benchmark numbers (e.g., "1.2 Million ops/sec at 120ns p99 latency") to substantiate your performance claims.'
        }
      },
      {
        title: '8. Technical Design Doc, Sequence Diagrams & Complexity Performance Report',
        phase: 'Showcase',
        completed: false,
        guide: {
          overview: 'Write an industry-standard Technical Design Document detailing the class architecture, trade-offs, and performance benchmarks.',
          keyTasks: [
            'Write Technical Design Doc with problem statement, class diagrams, and sequence diagrams',
            'Document design decisions, trade-offs, and alternative approaches considered',
            'Include benchmark graphs and algorithmic complexity analysis tables',
            'Provide copy-paste quickstart code snippets in the README'
          ],
          recommendedTools: ['Markdown', 'Mermaid.js', 'GitHub Wiki'],
          interviewTip: 'Design documents mirror real-world Big Tech engineering proposals (RFCs)—presenting one proves senior-level communication skills.'
        }
      }
    ]
  },
  {
    id: 'sdet',
    title: 'Test Automation Framework & QA Engineering',
    shortLabel: 'Test Automation & QA',
    badgeColor: 'text-rose-400 bg-rose-950/80 border-rose-800/50',
    iconName: 'ShieldCheck',
    defaultTech: 'TypeScript, Playwright, Jest, k6, Docker, Allure Reports, GitHub Actions',
    summary: 'Scalable automated testing suite, Page Object Model (POM), API contract validation, and CI load benchmarking.',
    milestones: [
      {
        title: '1. Test Strategy, Acceptance Criteria & Coverage Scope Definition',
        phase: 'Planning',
        completed: true,
        guide: {
          overview: 'Define the test automation strategy, test pyramid distribution, acceptance criteria, and critical user journeys.',
          keyTasks: [
            'Draft Test Strategy document outlining Scope, Test Levels, and Toolchain selection',
            'Identify critical business flows (happy paths, edge cases, negative flows, auth)',
            'Define acceptance criteria using Gherkin BDD syntax (Given / When / Then)',
            'Establish test environment prerequisites and test data management strategy'
          ],
          recommendedTools: ['Gherkin / Cucumber', 'Notion / Confluence', 'TestRail'],
          interviewTip: 'Explain why 70% Unit, 20% Integration, and 10% E2E is the ideal test pyramid ratio to avoid slow, flaky CI pipelines.'
        }
      },
      {
        title: '2. Test Automation Framework Architecture (Playwright/Cypress/PyTest)',
        phase: 'Framework',
        completed: false,
        guide: {
          overview: 'Scaffold a modular, maintainable automation framework with configuration profiles, custom runners, and global fixtures.',
          keyTasks: [
            'Set up Playwright / Cypress / PyTest framework with TypeScript strict typing',
            'Configure multi-browser execution (Chromium, Firefox, WebKit) and viewport matrix',
            'Implement environment configuration loaders (`dev`, `staging`, `prod`)',
            'Set up automatic screenshot capture on test failure and video recording'
          ],
          recommendedTools: ['Playwright', 'TypeScript', 'dotenv'],
          interviewTip: 'Explain why Playwright auto-waiting eliminates brittle arbitrary `sleep()` calls that cause test flakiness.'
        }
      },
      {
        title: '3. Page Object Model (POM) Design & Reusable Component Test Fixtures',
        phase: 'Architecture',
        completed: false,
        guide: {
          overview: 'Implement Page Object Model (POM) and custom fixtures to decouple page selector definitions from test assertion logic.',
          keyTasks: [
            'Create Page Object classes encapsulating selectors and user interactions for each screen',
            'Implement reusable custom fixtures for authenticated browser sessions',
            'Use resilient locator strategies (user-facing role locators over brittle CSS classes)',
            'Build helper utilities for dynamic waits, table parsing, and toast verification'
          ],
          recommendedTools: ['Playwright Fixtures', 'Page Object Model', 'TypeScript classes'],
          interviewTip: 'Explain how POM ensures that if a button selector changes in UI, you only update one single class rather than 50 broken tests.'
        }
      },
      {
        title: '4. End-to-End User Flow Automation & Visual Regression Testing',
        phase: 'E2E Suites',
        completed: false,
        guide: {
          overview: 'Automate complete multi-page user journeys, authentication persistence, and visual regression pixel checks.',
          keyTasks: [
            'Write automated E2E suites for core user journeys (registration, complex search, checkout)',
            'Implement session storage / cookie injection to skip UI login on non-auth tests',
            'Add visual regression snapshot testing (`toHaveScreenshot()`) for layout regression detection',
            'Handle dynamic content (timestamps, random IDs) with visual masking'
          ],
          recommendedTools: ['Playwright Visual Testing', 'Percy / Applitools', 'Faker.js'],
          interviewTip: 'Discuss how visual regression testing catches unintended CSS breakages that functional assertion tests completely miss.'
        }
      },
      {
        title: '5. Mock Service Layer, Test Data Factories & API Contract Tests',
        phase: 'API Testing',
        completed: false,
        guide: {
          overview: 'Write fast API contract tests and implement network route mocking to test frontend failure handling.',
          keyTasks: [
            'Build automated REST API test suite validating status codes, response headers, and JSON schemas',
            'Implement JSON Schema validation (Ajv / Zod) to catch API breaking changes',
            'Mock network API responses in Playwright (`page.route()`) to simulate 500 errors and network timeouts',
            'Create dynamic test data factories using `@faker-js/faker`'
          ],
          recommendedTools: ['Playwright APIRequestContext', 'Ajv / Zod schema validator', 'Faker.js'],
          interviewTip: 'Emphasize that testing error states (500 server crashes, 429 rate limits, network timeouts) is as critical as happy path testing.'
        }
      },
      {
        title: '6. High-Concurrency API Load Benchmarking & Performance Stress Tests (k6)',
        phase: 'Performance',
        completed: false,
        guide: {
          overview: 'Simulate high concurrent user traffic against backend endpoints to measure response times under load.',
          keyTasks: [
            'Write k6 load testing scripts with virtual user (VU) ramp-up, steady-state, and cooldown stages',
            'Define performance Service Level Objectives (SLOs): e.g. 95% of requests must resolve under 200ms',
            'Simulate realistic user think times and request distributions',
            'Generate interactive performance summary reports with threshold pass/fail checks'
          ],
          recommendedTools: ['k6', 'k6 HTML Reporter', 'Autocannon'],
          interviewTip: 'Explain how performance testing in CI catches API regression bottlenecks before code reaches production users.'
        }
      },
      {
        title: '7. Headless CI/CD Parallel Test Execution & Failure Notification Webhooks',
        phase: 'Hosting',
        completed: false,
        guide: {
          overview: 'Execute test suites in headless Docker containers in parallel within GitHub Actions CI/CD pipelines.',
          keyTasks: [
            'Configure GitHub Actions matrix workflow to run tests across parallel shards',
            'Run tests inside official Playwright Docker container for environment consistency',
            'Upload failed test traces, screenshots, and videos as CI build artifacts',
            'Configure webhook notifications to Slack / Discord reporting build pass/fail status'
          ],
          recommendedTools: ['GitHub Actions Matrix Sharding', 'Playwright Docker', 'Slack Webhooks'],
          interviewTip: 'Discuss test sharding: how splitting 1,000 tests across 5 parallel CI workers reduces build time from 20 minutes to 4 minutes.'
        }
      },
      {
        title: '8. Comprehensive Allure Test Reports, Flakiness Analysis & QA Documentation',
        phase: 'Showcase',
        completed: false,
        guide: {
          overview: 'Generate rich HTML Allure test reports, analyze test flakiness trends, and publish framework documentation.',
          keyTasks: [
            'Generate Allure HTML reports with execution steps, error attachments, and historical trends',
            'Deploy Allure report to GitHub Pages on every CI run',
            'Implement automatic test retry policies and flakiness tracking dashboards',
            'Write clear framework README with command cheatsheet and setup instructions'
          ],
          recommendedTools: ['Allure Report', 'GitHub Pages', 'Playwright Trace Viewer'],
          interviewTip: 'Live Allure reports and Playwright Trace Viewer recordings provide visual proof of your QA automation craftsmanship.'
        }
      }
    ]
  }
];

// Helper to look up an archetype by ID or Title or Category string
export const getArchitectureTypeConfig = (identifier) => {
  if (!identifier) return ARCHITECTURE_TYPES[0];
  const query = identifier.toLowerCase().trim();

  // 1. Direct ID match
  const byId = ARCHITECTURE_TYPES.find(a => a.id.toLowerCase() === query);
  if (byId) return byId;

  // 2. Direct title match
  const byTitle = ARCHITECTURE_TYPES.find(a => a.title.toLowerCase() === query);
  if (byTitle) return byTitle;

  // 3. Keyword matching
  if (query.includes('ai') || query.includes('ml') || query.includes('machine learning') || query.includes('genai')) {
    return ARCHITECTURE_TYPES.find(a => a.id === 'ai-ml');
  }
  if (query.includes('backend') || query.includes('distributed') || query.includes('microservice') || query.includes('spring') || query.includes('server')) {
    return ARCHITECTURE_TYPES.find(a => a.id === 'backend');
  }
  if (query.includes('frontend') || query.includes('react') || query.includes('ui') || query.includes('client')) {
    return ARCHITECTURE_TYPES.find(a => a.id === 'frontend');
  }
  if (query.includes('devops') || query.includes('cloud') || query.includes('k8s') || query.includes('docker') || query.includes('iac')) {
    return ARCHITECTURE_TYPES.find(a => a.id === 'devops-cloud');
  }
  if (query.includes('mobile') || query.includes('ios') || query.includes('android') || query.includes('flutter')) {
    return ARCHITECTURE_TYPES.find(a => a.id === 'mobile');
  }
  if (query.includes('system') || query.includes('lld') || query.includes('design') || query.includes('sde') || query.includes('low-level')) {
    return ARCHITECTURE_TYPES.find(a => a.id === 'system-design');
  }
  if (query.includes('sdet') || query.includes('qa') || query.includes('test') || query.includes('quality')) {
    return ARCHITECTURE_TYPES.find(a => a.id === 'sdet');
  }

  return ARCHITECTURE_TYPES[0]; // fallback to fullstack
};

// Aliases for compatibility
export const PROJECT_ARCHETYPES = ARCHITECTURE_TYPES;
export const getProjectTypeConfig = getArchitectureTypeConfig;
export const ALL_ALLOCATED_ROLES = [];
export const getRecommendedProjectTypeForRole = (role) => getArchitectureTypeConfig(role);
