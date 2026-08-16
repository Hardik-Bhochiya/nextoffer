import { Router } from 'express';
import { getRevisions, createRevision, toggleRevision, deleteRevision } from '../controllers/revisionController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getRevisions);
router.post('/', authenticate, createRevision);
router.patch('/:id/toggle', authenticate, toggleRevision);
router.delete('/:id', authenticate, deleteRevision);

export default router;
