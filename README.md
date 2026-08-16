# 🚀 NextOffer - AI-Powered Placement Preparation Platform

<div align="center">

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **Prepare Smarter. Track Better. Land Your Next Offer.**

**NextOffer** is a full-stack, AI-powered placement preparation platform built on the **MERN Stack** (MongoDB, Express, React, Node.js). It consolidates coding practice, development roadmaps, portfolio projects, markdown revision cheatsheets, daily goals, and spaced repetition schedules into a unified command center.

</div>

---

## 📌 Problem Statement

Students and job seekers preparing for top-tier software engineering placements (FAANG / Tier-1 / Startups) often struggle with scattered preparation across LeetCode, GitHub, YouTube, Notion, ChatGPT, and spreadsheets. 

**NextOffer solves this fragmentation** by integrating:
1. **Curated DSA Tracker** (with platform tags, complexity analysis & personal intuition notes)
2. **Full-Stack Development Roadmaps** (Frontend, Backend, Database & System Design, DevOps)
3. **Portfolio Project Management** (with milestone tracking & live links)
4. **Smart Markdown Cheatsheets** (OOPs, DBMS, OS, Computer Networks, System Design)
5. **Daily Planner & Spaced Repetition Engine** (1-day, 3-day, 7-day, 14-day intervals with confetti rewards 🎉)
6. **AI Study Mentor & Weakness Auditor** (24/7 technical interview guidance & gap analysis)
7. **Placement Readiness Telemetry** (Dynamic weighted score calculation from 0 to 100%)

---

## ✨ Features Breakdown

### 📊 Master Placement Dashboard
- **Real-Time Readiness Gauge**: Automatically calculated via weighted formula:
  $$\text{Readiness Score} = 0.5 \times \text{DSA} + 0.3 \times \text{Roadmap} + 0.2 \times \text{Projects} + 10\text{ (Streak Bonus)}$$
- **Daily Consistency Streaks**: Visual streak indicator with top-percentile tracking.
- **Weekly Study Velocity**: Interactive charts showing hours invested vs. questions solved.
- **Due Revision Alerts**: Instant reminders for concepts due for spaced review today.

### 💻 DSA Problem Tracker
- Filter by **Topic** (*Arrays, Two Pointers, Sliding Window, Trees, Graphs, DP*), **Difficulty** (*Easy, Medium, Hard*), **Platform** (*LeetCode, GeeksforGeeks, HackerRank, CodeStudio*), and **Status**.
- **Intuition & Approach Notes**: Embedded markdown editor with Time & Space complexity tracking.
- **Spaced Revision Counter**: Track how many times each problem has been revisited.

### 🛣️ Development Roadmaps
- Structured learning paths across **Frontend**, **Backend**, **Database & System Architecture**, and **DevOps**.
- Interactive milestones with checklist completion percentages.

### 📂 Capstone Project Showcase
- Portfolio manager tracking repository links, live demos, tech stacks, and step-by-step milestone checklists.

### 📝 Smart Markdown Notes & Cheatsheets
- Tag-filtered notes repository covering core subjects (OOPs 4 Pillars, DBMS ACID & Normalization, OS Deadlocks, System Design).

### 📅 Daily Planner & Spaced Repetition (Module R7)
- **Study Goals**: Set target deadlines and priorities (High, Medium, Low).
- **Daily Execution Checklist**: Check off daily tasks with instant confetti celebration.
- **Spaced Repetition Scheduler**: Pre-programmed revision intervals (Day 1, 3, 7, 14).

### 🤖 AI Study Mentor & Weakness Auditor
- Interactive conversational AI mentor for DSA patterns, System Design challenges, and ATS resume tips.
- One-click **Weakness Audit** analyzing pending problem clusters.

### 🔍 Global Search & Filter System (SearchFilter)
- Fast fuzzy cross-module search from the top navigation bar across DSA questions, roadmaps, projects, notes, and study goals.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide React, Recharts, Canvas Confetti |
| **Backend** | Node.js (v22+), Express.js REST API, Morgan Logger, CORS |
| **Database** | MongoDB / Mongoose with instant fallback in-memory datastore |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **AI Integration** | Modular AI Mentor API (supporting Gemini, OpenAI & built-in heuristic placement advisor) |

---

## 📁 Repository Structure

```
nextoffer/
├── package.json               # Root monorepo runner ("npm run dev" starts both apps)
├── .gitignore                 # Standard ignore patterns
│
├── client/                    # Frontend (React 19 + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/layout/ # Navbar (with Global Search & Profile), Sidebar, AppLayout
│   │   ├── context/           # AuthContext & DataContext (state synchronization)
│   │   ├── pages/             # Dashboard, DSA, Roadmaps, Projects, Notes, Planner, AI, Analytics
│   │   ├── services/          # Axios API client with JWT interceptor
│   │   ├── App.jsx            # React Router DOM configuration
│   │   └── index.css          # Dark theme tokens & glassmorphism utilities
│   ├── vite.config.js         # Vite configuration with backend API proxy
│   └── package.json
│
└── server/                    # Backend API (Node.js + Express.js)
    ├── src/
    │   ├── config/db.js       # MongoDB connector with resilient fallback
    │   ├── controllers/       # Auth, DSA, Roadmap, Project, Note, Planner, Search, AI, Analytics
    │   ├── middleware/        # JWT Authentication middleware
    │   ├── routes/            # Express router endpoints
    │   ├── services/          # In-memory store & calculation engine
    │   ├── data/seedData.js   # Preloaded 24+ top DSA problems, roadmaps & cheatsheets
    │   └── server.js          # Express app entry point (port 5000)
    ├── .env.example
    └── package.json
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- *(Optional)* Local [MongoDB](https://www.mongodb.com/try/download/community) or MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone https://github.com/Hardik-Bhochiya/nextoffer.git
cd nextoffer
```

### 2. Install dependencies
```bash
# Install root, backend, and frontend packages with one command:
npm run install:all
```

### 3. Run the Development Server
```bash
# Starts backend (port 5000) and frontend (port 5173) concurrently:
npm run dev
```

### 4. Open the Web Application
Visit **[http://localhost:5173](http://localhost:5173)** in your browser.
Click **"Instant Demo Login (Hardik Bhochiya)"** on the login screen to explore the dashboard immediately!

---

## 🔑 Environment Configuration (Optional)

Create a `server/.env` file from `server/.env.example`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/nextoffer
JWT_SECRET=your_super_secret_jwt_key_2026
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📐 System Design & Architecture

NextOffer is built according to verified software engineering diagrams:
- **ER Diagram**: Primary and foreign key relationships between `User`, `DSA Tracker`, `Roadmap`, `Project Tracker`, `Notes`, and `Daily Planner`.
- **Use Case Diagram**: Comprehensive user flows for all 6 preparation modules.
- **Sequence Diagrams (R6 & R7)**: Asynchronous REST lifecycle for Notes Management and Planner/Revision scheduling.
- **Class Diagram**: Controllers, Entities (`DSAProblem`, `RoadmapTopic`, `Project`, `Note`, `StudyGoal`, `DailyTask`, `Revision`), and `SearchFilter`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <b>Built with ❤️ for student developers aiming for their dream tech offer.</b>
</div>
