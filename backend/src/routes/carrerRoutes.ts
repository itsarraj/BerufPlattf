import { RequestHandler, Router } from 'express';
import { readinessAnalysis } from '../controllers/scoreController';

const router = Router();

router.post('/analysis', readinessAnalysis as RequestHandler);

export default router;

