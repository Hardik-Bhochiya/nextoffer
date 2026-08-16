import { Router } from 'express';
import { getRoadmaps, toggleTopic } from '../controllers/roadmapController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getRoadmaps);
router.patch('/:roadmapId/topic/:topicId', authenticate, toggleTopic);

export default router;
