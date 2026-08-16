import { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getNotes);
router.post('/', authenticate, createNote);
router.put('/:id', authenticate, updateNote);
router.delete('/:id', authenticate, deleteNote);

export default router;
