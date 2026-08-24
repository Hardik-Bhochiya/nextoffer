import { Router } from 'express';
import {
  askMentor,
  analyzeWeakness,
  scanResume,
  getMockQuestion,
  submitMockAnswer
} from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/mentor', authenticate, askMentor);
router.get('/weakness', authenticate, analyzeWeakness);
router.post('/scan-resume', authenticate, scanResume);
router.get('/mock-question', authenticate, getMockQuestion);
router.post('/submit-mock', authenticate, submitMockAnswer);

export default router;
