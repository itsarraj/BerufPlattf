import { Router } from 'express';
import { registerUser, loginUser, refreshToken, logoutUser } from '../controllers/authController';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

// Protected route
router.post('/logout',  logoutUser);

export default router;
