// src/routes/routes.ts
import { Router, Request, Response } from 'express';

import carrerRoutes from './carrerRoutes';

const router = Router();

// Public routes
router.use('/career', carrerRoutes);

// -------------------- Health Check --------------------
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


export default router;