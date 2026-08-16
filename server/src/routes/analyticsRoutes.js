import { Router } from 'express';
import { getDashboardMetrics, logStudyHours } from '../controllers/analyticsController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', authenticate, getDashboardMetrics);
router.post('/log-study', authenticate, logStudyHours);

export default router;
