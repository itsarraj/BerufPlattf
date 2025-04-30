// src/routes/usersRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { auth } from '../middlewares/auth';
import {
  getUserProfile,
  updateUserProfile,
  parseResume
} from '../controllers/usersController';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb: multer.FileFilterCallback) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX allowed.') as unknown as null, false);
    }
  }

});

const router = Router();

// User profile routes - add auth middleware
router.get('/profile', auth('user'), getUserProfile);
router.put('/profile', auth('user'), updateUserProfile);
router.post('/resume', auth('user'), upload.single('resume'), parseResume);

export default router;