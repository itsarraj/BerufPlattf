// src/routes/usersRoutes.ts
import { Router } from 'express';
import { auth } from '../middlewares/auth';
import {
  getUserProfile,
  updateUserProfile,
  parseResume
} from '../controllers/usersController';
import {
  applyToJob,
  getUserApplications
} from '../controllers/applicationsController';
import upload from '../utils/multerConfig';

const router = Router();
router.use(auth('user'));

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/upload-resume', upload.single('resume'), parseResume);
router.get('/applications', getUserApplications);
router.post('/jobs/:id/apply', applyToJob);

export default router;