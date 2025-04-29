// 📂 File: src/routes/jobs.ts
import { Router } from 'express';
import { auth } from '../middlewares/auth';
import {
  createJob,
  listPublicJobs,
  getJobDetails,
  getRecruiterJobs,
  getJobMatches
} from '../controllers/jobsController';

import { Request, Response, NextFunction } from 'express';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Recruiter-only routes
router.post('/recruiters', auth('recruiter'), createJob); // Create a job
router.get('/recruiters', auth('recruiter'), getRecruiterJobs); // List recruiter's jobs
router.get('/:id/recruiters/matches', auth('recruiter'), getJobMatches);       // Get matches for a job

// Public routes
router.get('/', listPublicJobs);                // List all jobs (public)
router.get('/:id', getJobDetails);              // Get specific job details (public)


export default router;
