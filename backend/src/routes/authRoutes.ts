import { Router } from 'express';
// import { loginUser, refreshToken, logoutUser, registerUser} from '../controllers/authController';
import { registerUser, loginUser, refreshToken, logoutUser } from '../controllers/authController';
import { rateLimiter } from '../middlewares/rateLimiter';
import { auth } from '../middlewares/auth';

const router = Router();

// Public routes
router.post('/register', rateLimiter(5), registerUser);
router.post('/login/user', rateLimiter(5), loginUser);
router.post('/login/recruiter', rateLimiter(5), loginUser);
router.post('/refresh-token', rateLimiter(5), refreshToken);

// Protected routes
router.post('/logout', rateLimiter(5), auth('both'), logoutUser);

export default router;