import { Router } from 'express';
import {
  getRoadmaps,
  toggleTopic,
  toggleEnrollRoadmap,
  enrollBatchRoadmaps
} from '../controllers/roadmapController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getRoadmaps);
router.post('/enroll-batch', authenticate, enrollBatchRoadmaps);
router.post('/:roadmapId/enroll', authenticate, toggleEnrollRoadmap);
router.patch('/:roadmapId/topic/:topicId', authenticate, toggleTopic);

export default router;
