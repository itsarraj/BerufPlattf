// src/routes/applicationsRoutes.ts
import { Router } from 'express';
import { auth } from '../middlewares/auth';
import {
  applyToJob,
  getUserApplications,
  updateApplicationStatus,
  getApplicationDetails
} from '../controllers/applicationsController';

const router = Router();

// User routes
router.get('/', auth('user'), getUserApplications);
router.post('/jobs/:id', auth('user'), applyToJob);

// Routes accessible by both user and recruiter
router.get('/:id', auth('both'), getApplicationDetails);

// Recruiter routes
router.put('/:id/status', auth('recruiter'), updateApplicationStatus);

export default router;