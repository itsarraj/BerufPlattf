// src/routes/companiesRoutes.ts
import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { createCompany, getCompanyProfile } from '../controllers/companiesController';

const router = Router();

router.post('/', auth('recruiter'), createCompany);
router.get('/', auth('recruiter'), getCompanyProfile);

export default router;