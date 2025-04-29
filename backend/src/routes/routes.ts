// src/routes/routes.ts
import express from 'express';
import authRoutes from './authRoutes';
import usersRoutes from './usersRoutes';
import jobsRoutes from './jobsRoutes';
import applicationsRoutes from './applicationsRoutes';
import companiesRoutes from './companiesRoutes';
import recruitersRoutes from './recruitersRoutes';

const router = express.Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/jobs', jobsRoutes);

// Protected routes
// router.use('/users', usersRoutes);
router.use('/applications', applicationsRoutes);
router.use('/companies', companiesRoutes);
router.use('/recruiters', recruitersRoutes);

export default router;