// src/utils/multerConfig.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for physical storage option
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = crypto.randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// Configure memory storage for in-memory processing
const memStorage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  // Accept only PDF, DOC, and DOCX
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'), false);
  }
};

// Create multer instances
export const diskUpload = multer({
  storage: diskStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  }
});

export const memoryUpload = multer({
  storage: memStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  }
});

export default {
  disk: diskUpload,
  memory: memoryUpload
};