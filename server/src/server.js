import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import dsaRoutes from './routes/dsaRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import revisionRoutes from './routes/revisionRoutes.js';
import plannerRoutes from './routes/plannerRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/revision', revisionRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/company-archives', companyRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'NextOffer Placement API',
    version: '1.0.0'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NextOffer API Server 🚀',
    docs: '/api/health'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 NextOffer API Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  connectDB();
});
