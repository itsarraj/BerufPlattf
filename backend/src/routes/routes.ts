// src/routes/routes.ts
import { Router } from 'express';
import usersRoutes from './usersRoutes';
import applicationsRoutes from './applicationsRoutes';
import jobsRoutes from './jobsRoutes';
import companiesRoutes from './companiesRoutes';
import authRoutes from './authRoutes';
import { auth } from '../middlewares/auth';

const router = Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/jobs', jobsRoutes);

// Protected routes
router.use('/users', usersRoutes);
router.use('/applications', applicationsRoutes);
router.use('/companies', companiesRoutes);

// Add a simple test route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;