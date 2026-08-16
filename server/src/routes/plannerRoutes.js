import { Router } from 'express';
import {
  getPlannerData,
  createStudyGoal,
  updateStudyGoal,
  deleteStudyGoal,
  addDailyTask,
  toggleDailyTask,
  deleteDailyTask
} from '../controllers/plannerController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getPlannerData);
router.post('/goals', authenticate, createStudyGoal);
router.put('/goals/:id', authenticate, updateStudyGoal);
router.delete('/goals/:id', authenticate, deleteStudyGoal);

router.post('/tasks', authenticate, addDailyTask);
router.patch('/tasks/:id/toggle', authenticate, toggleDailyTask);
router.delete('/tasks/:id', authenticate, deleteDailyTask);

export default router;
