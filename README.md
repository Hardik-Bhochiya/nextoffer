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

**NextOffer** is an algorithmic interview and career placement preparation platform built on the **MERN Stack** (MongoDB, Express, React, Node.js) with a sleek **GitHub Primer Dark Theme**. It consolidates personal coding practice, development roadmaps, capstone projects, markdown revision cheatsheets, daily execution checklists, and spaced repetition schedules into a unified command center.

</div>

---

## 💻 How to Run the Project in VS Code (Complete Beginner Guide)

Follow these simple steps to set up, run, and present the project locally in Visual Studio Code.

---

### 1. Required Apps & Prerequisites

Before starting, ensure you have the following installed on your machine:

1. **[Visual Studio Code](https://code.visualstudio.com/)**: Your code editor and terminal environment.
2. **[Node.js (v18 or higher)](https://nodejs.org/)**: JavaScript runtime for running frontend and backend.
   - Verify in terminal: `node -v` and `npm -v`
3. **[MongoDB Community Server](https://www.mongodb.com/try/download/community)** *(Local Database)*:
   - On Windows, MongoDB runs as an automatic background service (`MongoDB Server`).
   - *(Optional & Recommended)*: **[MongoDB Compass](https://www.mongodb.com/products/tools/compass)** — GUI to view and manage your database collections visually.
4. **Web Browser**: Google Chrome, Brave, Edge, or Firefox.

---

### 2. Verify MongoDB is Running

Before starting the server, make sure your local MongoDB instance is active:

#### Option A: Using Windows Services (Automatic)
MongoDB usually runs automatically on Windows as a service. You can verify in PowerShell (Run as Administrator):
```powershell
# Check or start the MongoDB service:
net start MongoDB
```
If it says *`The requested service has already been started`*, you are ready!

#### Option B: Using MongoDB Compass (Visual GUI)
1. Open **MongoDB Compass** from your Start Menu.
2. Leave the default URI as `mongodb://localhost:27017`.
3. Click **Connect**.
4. Once connected, your database is running and ready.

---

### 3. Open the Project in VS Code

1. Launch **Visual Studio Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select the project directory:
   ```text
   C:\Users\ahirh\Desktop\NEXT_OFFER\nextoffer
   ```
4. Open the integrated terminal in VS Code:
   - Press **`Ctrl + ~`** (or go to **Terminal** > **New Terminal**).

---

### 4. Install Dependencies (First-Time Only)

If you haven't installed dependencies yet, run this one command in the root folder:
```bash
npm run install:all
```
*This automatically installs packages for root, `server/`, and `client/`.*

---

### 5. Start the Application

In your VS Code terminal, run:
```bash
npm run dev
```

This single command starts both servers concurrently:
- 🚀 **Backend API Server**: Running on `http://localhost:5000`
- 💻 **Frontend Web Client**: Running on `http://localhost:5173`
- 📡 **Health Check**: Available at `http://localhost:5000/api/health`

---

### 6. Access the Platform

1. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```
2. **Create your account**:
   - Click **Sign up** on the login page.
   - Enter your name, email, target role, and password.
   - Click **Create account**.
3. **Sign In**:
   - Enter your credentials to access your personalized placement dashboard.
4. **Self-Analysis & Clean Start**:
   - New accounts start clean with 0 dummy data so you can analyze your genuine preparation progress!
   - Add your own solved problems in **DSA Placement Tracker**.
   - Add your portfolio systems in **Capstone Projects**.
   - Write revision notes in **Interview Smart Notes**.
   - Enroll in tracks in **Learning Paths**.

---

### 7. How to Stop or Restart

- **To Stop**: Click into the VS Code terminal running the app and press **`Ctrl + C`**, then type `Y` and press Enter.
- **To Restart**: Simply type `npm run dev` again.
- **Data Persistence**: All your account data, solved problems, notes, and milestones are permanently saved in MongoDB on your hard drive. They will never be lost when stopping or restarting.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend UI** | React 19, Vite, Tailwind CSS v4 | GitHub Primer Dark Theme (`#0d1117`, `#161b22`, `#30363d`, `#238636`, `#58a6ff`) |
| **Icons & Charts** | Lucide React, Recharts, Canvas Confetti | GitHub commit-green progress telemetry and clean metric visualizers |
| **Backend API** | Node.js, Express.js | REST API with JWT authorization, Morgan logging, CORS |
| **Database** | MongoDB & Mongoose | Local disk persistence with auto-reconnect and Atlas cloud support |
| **Authentication** | JWT, bcryptjs | 7-day persistent login sessions with encrypted passwords |

---

## 📁 Project Directory Structure

```text
nextoffer/
├── package.json               # Root runner ("npm run dev" starts client and server)
├── README.md                  # Comprehensive setup and usage documentation
│
├── client/                    # Frontend (React 19 + Vite + GitHub Primer Dark UI)
│   ├── src/
│   │   ├── components/layout/ # Navbar (Search, Profile, Streaks), Sidebar, AppLayout
│   │   ├── context/           # AuthContext (JWT) & DataContext (API State Sync)
│   │   ├── pages/             # Auth (Split-Screen), Dashboard, DSA, Roadmaps, Projects, Notes, Planner, Analytics, Profile
│   │   ├── services/          # Axios API client with bearer token interceptor
│   │   ├── App.jsx            # Protected routing and page views
│   │   └── index.css          # GitHub Primer design tokens and custom scrollbars
│   ├── vite.config.js         # Vite configuration with /api proxy to port 5000
│   ├── vercel.json            # SPA rewrite routing for Vercel deployment
│   └── package.json
│
└── server/                    # Backend API (Node.js + Express.js + Mongoose)
    ├── src/
    │   ├── config/db.js       # Resilient MongoDB connector with exponential backoff
    │   ├── controllers/       # Auth, DSA, Roadmap, Project, Note, Planner, Search, Analytics
    │   ├── middleware/        # JWT Authentication validator
    │   ├── models/            # Mongoose schemas (User, DsaProblem, Project, Note, Revision, Planner)
    │   ├── routes/            # Express REST endpoint routers
    │   └── server.js          # Express app entry point
    ├── .env                   # Environment variables (MONGODB_URI, JWT_SECRET, PORT)
    ├── .env.example
    └── package.json
```

---

## ☁️ Cloud Deployment (When Ready)

When you are ready to host the platform publicly on the internet:

1. **Database**: Use **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** (100% free shared cluster).
2. **Backend**: Deploy `server/` to **[Railway](https://railway.com)** or **[Render](https://render.com)** as a Web Service.
   - Set environment variable: `MONGODB_URI` pointing to your Atlas cluster.
3. **Frontend**: Deploy `client/` to **[Vercel](https://vercel.com)**.
   - Root directory: `client`
   - Framework: `Vite`
   - Environment variable: `VITE_API_URL` pointing to your backend URL + `/api`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <b>Built with ❤️ for engineers preparing for their dream software engineering offer.</b>
</div>
