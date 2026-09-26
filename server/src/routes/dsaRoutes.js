import { Router } from 'express';
import {
  getProblems,
  addProblem,
  updateProblem,
  deleteProblem,
  getProblemOfTheDay,
  getTopics,
  addTopic
} from '../controllers/dsaController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/topics', authenticate, getTopics);
router.post('/topics', authenticate, addTopic);
router.get('/potd', authenticate, getProblemOfTheDay);
router.get('/', authenticate, getProblems);
router.post('/', authenticate, addProblem);
router.put('/:id', authenticate, updateProblem);
router.delete('/:id', authenticate, deleteProblem);

export default router;
