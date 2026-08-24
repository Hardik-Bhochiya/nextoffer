import { Router } from 'express';
import { getRoadmaps, toggleTopic, toggleEnrollRoadmap } from '../controllers/roadmapController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getRoadmaps);
router.post('/:roadmapId/enroll', authenticate, toggleEnrollRoadmap);
router.patch('/:roadmapId/topic/:topicId', authenticate, toggleTopic);

export default router;
