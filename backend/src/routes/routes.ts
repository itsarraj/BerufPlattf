// src/routes/routes.ts
import { Router } from 'express';
import authRoutes from './authRoutes';

const router = Router();

// Public routes
router.use('/auth', authRoutes);

// Add a simple test route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;