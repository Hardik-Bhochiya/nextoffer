import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';

// Route Handler Imports
import authRoutes from './routes/authRoutes.js';
import dsaRoutes from './routes/dsaRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import revisionRoutes from './routes/revisionRoutes.js';
import plannerRoutes from './routes/plannerRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

// Load environment variables (.env)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------------------------------------------------------
// Core Middleware Configuration
// -----------------------------------------------------------------------------
// Enable Cross-Origin Resource Sharing (CORS) for all origins in development & production
app.use(cors({ origin: '*' }));

// Parse incoming JSON request payloads
app.use(express.json());

// HTTP request logger middleware for development debugging
app.use(morgan('dev'));

// -----------------------------------------------------------------------------
// Modular REST API Endpoints
// -----------------------------------------------------------------------------
app.use('/api/auth', authRoutes);           // User registration, authentication, JWT issuing
app.use('/api/dsa', dsaRoutes);             // LeetCode problems tracker, topics, revision counts
app.use('/api/roadmap', roadmapRoutes);     // CS engineering syllabi, tracks enrollment, milestones
app.use('/api/projects', projectRoutes);    // Portfolio projects showcase & live links
app.use('/api/notes', noteRoutes);          // Technical markdown notes & interview cheat sheets
app.use('/api/revision', revisionRoutes);   // Spaced repetition schedule (SuperMemo SM-2 logic)
app.use('/api/planner', plannerRoutes);     // Placement study goals, daily tasks, streak discipline
app.use('/api/search', searchRoutes);       // Universal search querying all platform collections
app.use('/api/analytics', analyticsRoutes); // Readiness score radar charts & candidate metrics

// -----------------------------------------------------------------------------
// System Health Check & Root Endpoints
// -----------------------------------------------------------------------------

/**
 * Health check endpoint for uptime monitors, containers, and deployment health verification
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: getDBStatus() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    service: 'NextOffer API',
    version: '1.0.0'
  });
});

/**
 * Root information endpoint
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NextOffer API Server 🚀',
    docs: '/api/health'
  });
});

// -----------------------------------------------------------------------------
// 404 Fallback Route Handler (for unhandled endpoints)
// -----------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl || req.url}`
  });
});

// -----------------------------------------------------------------------------
// Global Error Handling Middleware
// -----------------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('⚠️ Unhandled Exception:', err);
  // Distinguish Mongoose validation/cast errors (400) from internal crashes (500)
  const statusCode = err.status || err.statusCode || (err.name === 'ValidationError' || err.name === 'CastError' ? 400 : 500);
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// -----------------------------------------------------------------------------
// Server Initialization & Database Connection
// -----------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 NextOffer API Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  connectDB();
});
