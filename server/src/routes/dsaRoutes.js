import { Router } from 'express';
import {
  getProblems,
  addProblem,
  updateProblem,
  deleteProblem,
  getProblemOfTheDay
} from '../controllers/dsaController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/potd', authenticate, getProblemOfTheDay);
router.get('/', authenticate, getProblems);
router.post('/', authenticate, addProblem);
router.put('/:id', authenticate, updateProblem);
router.delete('/:id', authenticate, deleteProblem);

export default router;
