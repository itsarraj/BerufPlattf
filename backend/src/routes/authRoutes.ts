import { Router } from 'express';
import { registerUser, loginUser, refreshToken, logoutUser } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout',  logoutUser);

export default router;
