import { Router } from 'express';
import { getCompanyArchives } from '../controllers/companyController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getCompanyArchives);

export default router;
