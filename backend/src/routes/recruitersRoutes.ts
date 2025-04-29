// src/routes/recruitersRoutes.ts
import { Router } from 'express';
import { auth } from '../middlewares/auth';
import {
  createJob,
  getRecruiterJobs,
  getJobMatches
} from '../controllers/jobsController';
import { updateApplicationStatus } from '../controllers/applicationsController';
import { getCompanyProfile } from '../controllers/companiesController';

const router = Router();
router.use(auth('recruiter'));

router.post('/jobs', createJob);
router.get('/jobs', getRecruiterJobs);
router.get('/jobs/:id/matches', getJobMatches);
router.put('/applications/:id/status', updateApplicationStatus);
router.get('/company', getCompanyProfile);

export default router;