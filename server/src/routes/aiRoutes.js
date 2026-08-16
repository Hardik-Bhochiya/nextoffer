import { Router } from 'express';
import { askMentor, analyzeWeakness } from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/mentor', authenticate, askMentor);
router.get('/weakness', authenticate, analyzeWeakness);

export default router;
