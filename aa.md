› tree -I node_modules -L 2
.
├── aa.md
├── ai_microservice
│   ├── app
│   ├── Dockerfile
│   ├── README.md
│   └── requirements.txt
├── backend
│   ├── aa.md
│   ├── dist
│   ├── logs
│   ├── nodemon.json
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   ├── tsconfig.json
│   └── uploads
├── docker-compose.yml
├── docker-docs.md
├── Dockerfile
├── frontend-next
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── public
│   ├── README.md
│   ├── src
│   └── tsconfig.json
├── LICENSE
├── package-lock.json
└── Untitled.ipynb

11 directories, 24 files
› cd backend/
aa.md              .env.example       nodemon.json       src/
dist/              logs/              package.json       tsconfig.json
.env               node_modules/      package-lock.json  uploads/
› cd backend/
› cat package.json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@tsconfig/node22": "^22.0.0",
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.1",
    "@types/jsonwebtoken": "^9.0.9",
    "@types/multer": "^1.4.12",
    "@types/node": "^22.14.1",
    "express": "^5.1.0",
    "nodemon": "^3.1.9",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "@types/morgan": "^1.9.9",
    "bcrypt": "^5.1.1",
    "colors": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "jsonwebtoken": "^9.0.2",
    "mariadb": "^3.4.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.2",
    "uuid": "^11.1.0",
    "winston": "^3.17.0",
    "winston-daily-rotate-file": "^5.0.0"
  }
}
› cd
aa.md              .env.example       nodemon.json       src/
dist/              logs/              package.json       tsconfig.json
.env               node_modules/      package-lock.json  uploads/
› cd src/
benchmark/   controllers/ interfaces/  models/      server.ts    utils/
config/      database/    middlewares/ routes/      services/
› cd src/
› cat server.ts
// src/server.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { morganStream } from "./utils/logger";
import { requestLogger } from "./middlewares/logging/requestLogger";
import { metricsLogger } from "./middlewares/logging/metricsLogger";
import { errorLogger } from "./middlewares/logging/errorLogger";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config();

import { initializeDatabase } from './database/init';
import router from './routes/routes';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();
    console.log('✅ Database connection established');

    const app = express();
    const PORT = process.env.PORT || 8000;

    // Basic middleware
    app.use(express.json());
    app.use(cors());

    // Logging setup
    app.use(morgan('combined', { stream: morganStream }));
    app.use(requestLogger());
    app.use(metricsLogger());

    // Routes
    app.use('/api', router);

    // Error handling (must be last middleware)
    app.use(errorLogger);

    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer().catch(err => {
  console.error('❌ Unhandled error during server startup:', err);
  process.exit(1);
});
› cat
benchmark/   controllers/ interfaces/  models/      server.ts    utils/
config/      database/    middlewares/ routes/      services/
› cat database/
connection.ts  init.sql       init.ts
› cat database/init.ts
import fs from 'fs';
import path from 'path';
import { pool } from './connection';

// Function to auto-run init.sql if tables are missing
export async function initializeDatabase() {
    const connection = await pool.getConnection();

    try {
        // Check if "users" table exists
        const [rows, fields] = await connection.query(`SHOW TABLES LIKE 'users'`);

        if (!Array.isArray(rows) || rows.length === 0) {
            console.log('No tables found. Initializing database...');

            const initSQL = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
            await connection.query(initSQL, { multipleStatements: true });

            console.log('✅ Database initialized.');
        } else {
            console.log('✅ Database already initialized.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        connection.release();
    }
}
› cat database/init.sql
-- Core User Table (Minimal Structure)

CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    refresh_token VARCHAR(512) NOT NULL,
    device_info VARCHAR(255),
    ip_address VARCHAR(45),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_token (refresh_token)
);


-- Indexes
-- CREATE UNIQUE INDEX idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS user_event_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    event_type ENUM(
        'login', 'logout', 'failed_login', 'register', 'refresh_token', 'password_reset', 'profile_update', 'other'
    ) NOT NULL,
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    device_info VARCHAR(255),
    user_agent VARCHAR(512),
    location VARCHAR(255),
    metadata JSON,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_event_user_time (user_id, event_time)
);

-- Recommended Related Tables (Using Foreign Keys)
-- 1. Phone Numbers (1:1 or 1:Many)
CREATE TABLE IF NOT EXISTS user_phones (
    user_id CHAR(36) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, phone),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for phone lookups
-- CREATE INDEX idx_user_phones_number ON user_phones(phone);

-- 2. Authentication Methods (Supports OAuth/Social Logins)
CREATE TABLE IF NOT EXISTS auth_providers (
    user_id CHAR(36) NOT NULL,
    provider ENUM('email', 'google', 'linkedin') NOT NULL,
    provider_id VARCHAR(255), -- External provider's user ID
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    PRIMARY KEY (user_id, provider),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Profile Data (1:1 Relationship)

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id CHAR(36) PRIMARY KEY,
    full_name VARCHAR(255),
    avatar_url VARCHAR(512),
    timezone VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
› cat database/connection.ts
// src/database/connection.ts
import mariadb from 'mariadb';
import logger from '../utils/logger';

// Default values if environment variables are not set
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'job_platform';
const DB_POOL_SIZE = process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE) : 5;

// Create connection pool
export const pool = mariadb.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  connectionLimit: DB_POOL_SIZE,
  multipleStatements: true,
  bigIntAsNumber: true,
  connectTimeout: 10000, // 10 seconds
  acquireTimeout: 10000, // 10 seconds
});

// Test connection function
export async function testConnection(): Promise<boolean> {
  let conn;
  try {
    conn = await pool.getConnection();
    logger.info(`DB Connected successfully (thread ID: ${conn.threadId})`);
    return true;
  } catch (error) {
    logger.error('DB Connection failed', { error });
    return false;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

// Initialize connection testing
testConnection()
  .then(success => {
    if (!success) {
      logger.error('Initial database connection test failed');
    }
  })
  .catch(err => {
    logger.error('Unexpected error during connection test', { error: err });
  });› ^C
› cat
benchmark/   controllers/ interfaces/  models/      server.ts    utils/
config/      database/    middlewares/ routes/      services/
› cat routes/
authRoutes.ts  routes.ts
› cat routes/routes.ts
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

export default router;› ^C
› cat routes/
authRoutes.ts  routes.ts
› cat routes/authRoutes.ts
import { Router } from 'express';
import { registerUser, loginUser, refreshToken, logoutUser } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout',  logoutUser);

export default router;
› cat con
config/      controllers/
› cat controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/connection';
import { hashPassword, validatePassword } from '../utils/helpers';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '../interfaces/authRequest';

// Helper for logging user events
async function logUserEvent(
  conn: any,
  userId: string | null,
  eventType: string,
  req: Request,
  metadata: object = {}
) {
  await conn.execute(
    `INSERT INTO user_event_logs
      (user_id, event_type, ip_address, device_info, user_agent, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userId,
      eventType,
      req?.ip || null,
      req?.headers['x-device-info'] || null,
      req?.headers['user-agent'] || null,
      JSON.stringify(metadata),
    ]
  );
}

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    // Check if email exists - directly get rows array
    const rows = await conn.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    // Handle MariaDB result (array of rows)
    if (Array.isArray(rows) && rows.length > 0) {
      res.status(409).json({ error: 'Email already registered.' });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      res.status(500).json({ error: 'Password processing failed' });
      return;
    }

    // Generate UUID
    const userId = uuidv4();

    // Insert new user
    await conn.execute(
      'INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)',
      [userId, email, hashedPassword]
    );

    await logUserEvent(conn, userId, 'register', req);

    logger.info('New user registered', { email });
    res.status(201).json({ id: userId, email });
  } catch (error) {
    logger.error('Registration failed', { error, email });
    res.status(500).json({ error: 'Registration failed.' });
  } finally {
    conn.release();
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { email, password } = req.body;
  const deviceInfo = req.headers['x-device-info'] || req.headers['user-agent'] || 'unknown';
  const ipAddress = req.ip;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    // Directly get array of users
    const users = await conn.execute(
      'SELECT id, password_hash FROM users WHERE email = ?',
      [email]
    );

    // Handle MariaDB result (array of rows)
    if (!Array.isArray(users) || users.length === 0) {
      await logUserEvent(conn, null, 'failed_login', req, { reason: 'User not found', email });
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    // Get first user (should be only one due to unique email)
    const user = users[0];
    const isValid = await validatePassword(password, user.password_hash);

    if (!isValid) {
      await logUserEvent(conn, user.id, 'failed_login', req, { reason: 'Invalid password' });
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    // Store refresh token for this device
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await conn.execute(
      `INSERT INTO user_refresh_tokens
        (user_id, refresh_token, device_info, ip_address, expires_at)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         refresh_token = VALUES(refresh_token),
         expires_at = VALUES(expires_at),
         last_used_at = CURRENT_TIMESTAMP`,
      [user.id, refreshToken, deviceInfo, ipAddress, expiresAt]
    );

    await logUserEvent(conn, user.id, 'login', req);

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken
    });
  } catch (error) {
    logger.error('Login failed', { error });
    res.status(500).json({ error: 'Login failed.' });
  } finally {
    conn.release();
  }
};

// REFRESH TOKEN
export const refreshToken = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token required.' });
    return;
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string; };

    // Check token in DB and not expired - directly get rows array
    const rows = await conn.execute(
      `SELECT id FROM user_refresh_tokens
        WHERE user_id = ? AND refresh_token = ? AND expires_at > NOW()`,
      [decoded.id, refreshToken]
    );

    // Handle MariaDB result (array of rows)
    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(401).json({ error: 'Invalid or expired refresh token.' });
      return;
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1h' }
    );

    // Update last_used_at
    await conn.execute(
      `UPDATE user_refresh_tokens SET last_used_at = CURRENT_TIMESTAMP WHERE user_id = ? AND refresh_token = ?`,
      [decoded.id, refreshToken]
    );

    await logUserEvent(conn, decoded.id, 'refresh_token', req);

    res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token.' });
  } finally {
    conn.release();
  }
};

// LOGOUT
export const logoutUser = async (req: AuthenticatedRequest, res: Response) => {
  let conn = await pool.getConnection();
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token required.' });
    return;
  }
  try {
    // Verify and decode refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string; };
    } catch (err) {
      res.status(401).json({ error: 'Invalid refresh token.' });
      return;
    }

    // Check if refresh token exists for this user
    const rows = await conn.execute(
      'SELECT id FROM user_refresh_tokens WHERE user_id = ? AND refresh_token = ?',
      [decoded.id, refreshToken]
    );

    if (!rows || !Array.isArray(rows) || rows.length === 0 || !rows[0].id) {
      res.status(400).json({ error: 'Refresh token not found or already logged out.' });
      return;
    }

    // Remove this device's refresh token
    await conn.query(
      'DELETE FROM user_refresh_tokens WHERE user_id = ? AND refresh_token = ?',
      [decoded.id, refreshToken]
    );

    await logUserEvent(conn, decoded.id, 'logout', req);

    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    logger.error('Logout failed', { error });
    res.status(500).json({ error: 'Logout failed.' });
  } finally {
    conn.release();
  }
};
› ^C
› cd ..
›  cd ..
› pwd
/home/plutonium/personal/BerufPlattf
› cd frontend-next/
› ls
Dockerfile         next.config.ts  node_modules  package-lock.json   public     src
eslint.config.mjs  next-env.d.ts   package.json  postcss.config.mjs  README.md  tsconfig.json
› cat package.json
{
  "name": "frontend-next-test-only-2",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "sideEffects": false,
  "dependencies": {
    "@reduxjs/toolkit": "^2.8.2",
    "@types/redux-persist": "^4.0.0",
    "axios": "^1.9.0",
    "chart.js": "^4.4.9",
    "jsonwebtoken": "^9.0.2",
    "jwt-decode": "^4.0.0",
    "lucide": "^0.513.0",
    "lucide-react": "^0.513.0",
    "next": "15.3.1",
    "react": "^19.0.0",
    "react-chartjs-2": "^5.3.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.4",
    "react-icons": "^5.5.0",
    "react-redux": "^9.2.0",
    "redux-persist": "^6.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4.1.8",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^9",
    "eslint-config-next": "15.3.1",
    "postcss": "^8.5.4",
    "sass": "^1.87.0",
    "tailwindcss": "^4.1.8",
    "typescript": "^5"
  }
}
› cat src/
app/        components/ lib/        types/
› cat src/app/
dashboard/     global.d.ts    (job-seeker)/  not-found.tsx  (recruiting)/
env.d.ts       globals.css    layout.tsx     page.tsx       settings/
error.tsx      homepage/      loading.tsx    (readiness)/
› cd src/lib/
› #!/bin/bash

# Change this to your project root if needed
ROOT_DIR="."
IGNORE_DIRS="node_modules .next"

# Create find command excluding specified directories
FIND_CMD="find \"$ROOT_DIR\""
for dir in $IGNORE_DIRS; do
    FIND_CMD+=" -path \"$ROOT_DIR/$dir\" -prune -o"
done
FIND_CMD+=" -type f -print"

# Evaluate the command to get file list
eval "$FIND_CMD" | while IFS= read -r file; do
    echo "===================="
    echo "FILE: $file"
    echo "--------------------"
    cat "$file"
    echo -e "\n"
done
====================
FILE: ./api/authApi.ts
--------------------


====================
FILE: ./api/axiosConfig.ts
--------------------


====================
FILE: ./hooks/redux.ts
--------------------


====================
FILE: ./store/store.ts
--------------------


====================
FILE: ./store/middleware.ts
--------------------


====================
FILE: ./store/index.ts
--------------------


====================
FILE: ./slices/authSlice.ts
--------------------


› cd ..
› cd ..
› cd
Dockerfile          eslint.config.mjs   next-env.d.ts       postcss.config.mjs  tsconfig.json
.dockerignore       .gitignore          node_modules/       public/
.env.example        .next/              package.json        README.md
.env.local          next.config.ts      package-lock.json   src/
› cd src/components/
layout/    providers/ ui/
› cd src/components/
› #!/bin/bash

# Change this to your project root if needed
ROOT_DIR="."
IGNORE_DIRS="node_modules .next"

# Create find command excluding specified directories
FIND_CMD="find \"$ROOT_DIR\""
for dir in $IGNORE_DIRS; do
    FIND_CMD+=" -path \"$ROOT_DIR/$dir\" -prune -o"
done
FIND_CMD+=" -type f -print"

# Evaluate the command to get file list
eval "$FIND_CMD" | while IFS= read -r file; do
    echo "===================="
    echo "FILE: $file"
    echo "--------------------"
    cat "$file"
    echo -e "\n"
done
====================
FILE: ./ui/JobCard.tsx
--------------------
import React from 'react';
import { Button } from '@/components/ui/Button';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  employmentType: string;
  onApply: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  employmentType,
  onApply
}) => {
  return (
    <div className="card-style flex flex-col items-center gap-4">
      <h3 className="text-heading-4 text-center">{title}</h3>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-body">{company}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-body">{location}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <span className="tag-style">{salary}</span>
        <span className="tag-style">{employmentType}</span>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={onApply}
        className="w-full max-w-[160px]"
      >
        Apply
      </Button>
    </div>
  );
};

====================
FILE: ./ui/ToastContainer.tsx
--------------------
'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux'
import { removeToast } from '@/lib/slices/uiSlice'
import Toast from './Toast'

export default function ToastContainer() {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector((state) => state.ui.toasts)

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toasts[0].id))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [toasts, dispatch])

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  )
}

====================
FILE: ./ui/Select.tsx
--------------------
import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string; }[];
  label?: string;
  error?: string;
  fullWidth?: boolean | null ;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    options = [
      { value: 'default1', label: 'Default Option 1' },
      { value: 'default2', label: 'Default Option 2' },
    ],
    label = 'Choose an Option',
    error = '', fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="font-normal text-sm text-pure-white">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`input-default w-full appearance-none ${className}`}
            {...props}
          >
            <option value="">Pick an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-fire">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

====================
FILE: ./ui/Toast.tsx
--------------------
import { FiX, FiCheck, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi'

interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  onClose: (id: string) => void
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheck className="h-5 w-5 text-green-500" />
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-red-500" />
      case 'info':
        return <FiInfo className="h-5 w-5 text-blue-500" />
      case 'warning':
        return <FiAlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <FiInfo className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div
      className={`${getBgColor()} border rounded-lg shadow-lg p-4 min-w-[300px] max-w-md flex items-start`}
    >
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-4 text-gray-400 hover:text-gray-500"
      >
        <FiX className="h-5 w-5" />
      </button>
    </div>
  )
}

====================
FILE: ./ui/Button.tsx
--------------------
import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconLeft = <></>,
  iconRight = <></>,
  children = <></>,
  ...props
}) => {
  const baseClasses = [
    'font-bold',
    'font-edge-display',
    'rounded-lg',
    'px-4',
    'gap-2',
    'focus:outline-none',
    'hover:opacity-90',
    'active:scale-[0.98]',
    'inline-flex',
    'items-center',
    'justify-center',
    'transition-all',
    'duration-150',
    'shadow-[var(--shadow-button)]',
    'active:shadow-none',
    'active:translate-y-0.5',
    'active:translate-x-0.5'
  ].join(' ');

  const variantClasses = {
    primary: 'bg-gold-sun text-charcoal-gray',
    secondary: 'bg-charcoal-gray text-pure-white',
    outline: 'bg-transparent border border-charcoal-gray text-charcoal-gray',
    danger: 'bg-red-fire text-pure-white'
  }[variant];

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg',
    xl: 'h-14 text-xl'
  }[size];

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = loading || props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = [
    baseClasses,
    variantClasses,
    sizeClasses,
    widthClass,
    disabledClass
  ].join(' ');

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={buttonClasses}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-2">{iconRight}</span>}
      {loading && <Spinner />}
    </button>
  );
}
);

const Spinner = () => (
  <svg
    className="ml-2 animate-spin h-5 w-5 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

====================
FILE: ./ui/Input.tsx
--------------------
import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      iconLeft,
      iconRight,
      error,
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    // Fixed background color and focus styles
    const baseClasses = [
      'flex items-center',
      'transition-all duration-150 ease-linear',
      'outline-none',
      'bg-charcoal-gray',
      'rounded-[var(--radius-lg)]',
      'focus-within:shadow-[var(--shadow-focus)]',
      error ? 'border border-red-fire' : '',
      className,
    ].join(' ');

    const sizeClasses = {
      sm: 'h-10 text-sm',
      md: 'h-12 text-base',
      lg: 'h-14 text-lg'
    }[size];

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={`flex flex-col gap-1 ${widthClass}`}>
        {label && (
          <label className="font-normal text-sm text-pure-white">
            {label}
          </label>
        )}
        <div className={`relative ${baseClasses} ${sizeClasses}`}>
          {iconLeft && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-transparent border-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none ${iconLeft ? 'pl-10' : 'pl-4'} ${iconRight ? 'pr-10' : 'pr-4'} active:translate-y-0.5 active:translate-x-0.5 active:shadow-none`}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-fire">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

====================
FILE: ./ui/Textarea.tsx
--------------------
import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="font-normal text-sm text-pure-white">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`input-default w-full min-h-[100px] ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-fire">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

====================
FILE: ./ui/Divider.tsx
--------------------
import React from 'react';

export const Divider: React.FC = () => (
  <div className="h-px w-full bg-charcoal-gray my-4" />
);

====================
FILE: ./ui/BackButton.tsx
--------------------
import React from 'react';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  href,
  label = 'Back'
}) => (
  <Link href={href} className="flex items-center gap-2 text-gold-sun">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="#FCC636" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-normal text-lg">{label}</span>
  </Link>
);

====================
FILE: ./providers/ReduxProvider.tsx
--------------------
'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { makeStore, AppStore } from '@/lib/store/store'

export default function ReduxProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  const persistorRef = useRef<any>(null)

  if (typeof window !== 'undefined' && !storeRef.current) {
    storeRef.current = makeStore()
    persistorRef.current = persistStore(storeRef.current)
  }

  return (
    <Provider store={storeRef.current!}>
      {persistorRef.current ? (
        <PersistGate loading={null} persistor={persistorRef.current}>
          {children}
        </PersistGate>
      ) : children}
    </Provider>
  )
}

====================
FILE: ./providers/AuthGuard.tsx
--------------------


› cd ..
› cat
cat     catman
› cat
app/        components/ lib/        types/
› cat app/
dashboard/     global.d.ts    (job-seeker)/  not-found.tsx  (recruiting)/
env.d.ts       globals.css    layout.tsx     page.tsx       settings/
error.tsx      homepage/      loading.tsx    (readiness)/
› cat app/page.tsx
'use client'
import './globals.css';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Divider } from '@/components/ui/Divider';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
// import { useRouter } from 'next/navigation';

export default async function Home() {

  // const router = useRouter();
  return (
    <div className="container-padding flex flex-col items-center justify-center gap-12 min-h-screen">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-heading-1 ">
          Your search for the next dream job is over 🚀
        </h1>
        <p className="text-body text-light-gray">
          Discover thousands of job opportunities from top companies around the world.
          Tailor your search to find the perfect match for your skills and career goals.
        </p>
        <Link href="/homepage">
          <Button
            variant="primary"
            size="xl"
          >
            Start Searching
          </Button>
        </Link>
        <BackButton href="/back"/>
        <Divider/>
        <Select fullWidth={true}/>
        <Input  fullWidth={true}/>
        <Textarea fullWidth={true}/>
      </div>

      <div className="mt-8">
        {/* <Image
          src="/assets/root-logos.png"
          alt="Featured companies"
          width={800}
          height={300}
          className="max-w-full"
        /> */}
      </div>
    </div>
  );
}› ^C
› cat app/
dashboard/     global.d.ts    (job-seeker)/  not-found.tsx  (recruiting)/
env.d.ts       globals.css    layout.tsx     page.tsx       settings/
error.tsx      homepage/      loading.tsx    (readiness)/
› cat app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import ReduxProvider from '@/components/providers/ReduxProvider';
import ToastContainer from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'BerufPlattf - Job Search Platform',
  description: 'Find your dream job with our advanced job search platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-coal text-pure-white antialiased">
        <div className="min-h-screen flex flex-col">
          <ReduxProvider>
            {children}
            <ToastContainer />
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}› cat app/
dashboard/     global.d.ts    (job-seeker)/  not-found.tsx  (recruiting)/
env.d.ts       globals.css    layout.tsx     page.tsx       settings/
error.tsx      homepage/      loading.tsx    (readiness)/
› cat app/loading.tsx
"use client"
import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-coal text-pure-white">
      <div className="flex flex-col items-center gap-6">
        <FiLoader className="animate-spin text-gold-sun text-4xl" />
        <h2 className="text-heading-2 font-bold">Loading Application</h2>
        <p className="text-body text-light-gray text-center">
          Preparing your personalized job search experience
        </p>
        <div className="mt-4 w-64 h-2 bg-charcoal-gray rounded-full overflow-hidden">
          <div className="animate-pulse h-full bg-gold-sun w-1/2"></div>
        </div>
      </div>
    </div>
  );
}› ^C
› cat app/not-found.tsx
import Link from 'next/link';
import { FiArrowLeft, FiFrown } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-coal text-pure-white container-padding">
      <div className="flex flex-col items-center gap-8 text-center ">
        <div className="relative">
          <div className="absolute inset-0 bg-gold-sun rounded-full blur-xl opacity-20 animate-pulse"></div>
          <FiFrown className="relative text-8xl text-gold-sun mx-auto" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-heading-1 font-bold text-gradient">
            Page Not Found
          </h1>
          <p className="text-body text-light-gray">
            The page you're looking for doesn't exist or has been moved.
            Don't worry though - we'll help you get back on track.
          </p>
        </div>

        <div className="mt-6">
          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              iconLeft={<FiArrowLeft className="text-charcoal-gray" />}
            >
              Return to Homepage
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-gray-light w-full">
          <p className="text-sm text-light-gray">
            Need help? <a href="mailto:support@berufplattf.com" className="text-gold-sun hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}› cat app/
dashboard/     global.d.ts    (job-seeker)/  not-found.tsx  (recruiting)/
env.d.ts       globals.css    layout.tsx     page.tsx       settings/
error.tsx      homepage/      loading.tsx    (readiness)/
› cat app/globals.css
@import "tailwindcss";

@theme {
    /* Brand colors */
    /* --color-gold-sun: #FCC636;
    --color-old-sun-50: rgba(252, 198, 54, 0.5);
    --color-dark-coal: #1F1F1F;
    --color-charcoal-gray: #2B2B2B;
    --color-midnight-black: #000000;
    --color-pure-white: #FFFFFF;
    --color-red-fire: #F5001E;
    --color-blue-sapphire: #5424FD; */

  /* Enhanced Brand Colors */
  --color-gold-sun: #FCC636;
  --color-gold-sun-hover: #E6B22F;
  --color-gold-sun-light: #FDD65C;
  --color-old-sun-50: rgba(252, 198, 54, 0.5);
  --color-old-sun-10: rgba(252, 198, 54, 0.1);
  --color-old-sun-20: rgba(252, 198, 54, 0.2);

  --color-dark-coal: #1F1F1F;
  --color-charcoal-gray: #2B2B2B;
  --color-charcoal-gray-hover: #333333;
  --color-charcoal-gray-light: #3A3A3A;
  --color-midnight-black: #000000;
  --color-pure-white: #FFFFFF;
  --color-red-fire: #F5001E;
  --color-blue-sapphire: #5424FD;

  /* Additional Semantic Colors */
  --color-dark-gray: #1A1A1A;
  --color-light-gray: #3A3A3A;
  --color-success: #00C853;
  --color-success-light: #4CAF50;
  --color-warning: #FFAB00;
  --color-warning-light: #FFC107;
  --color-error: #F44336;
  --color-info: #2196F3;

  /* Text Colors */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B0B0B0;
  --color-text-muted: #808080;
  --color-text-accent: #FCC636;
  --color-text-error: #F5001E;

  /* Typography */
  --font-edge-display: "Edge Display", system-ui, sans-serif;

  /* Enhanced Spacing Scale */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 80px;
  --spacing-5xl: 96px;

  /* Enhanced Shadows */
  --shadow-default: 2px 2px 0px 0px var(--color-midnight-black);
  --shadow-focus: 2px 2px 0px 0px var(--color-gold-sun);
  --shadow-button: 2px 2px 0px 0px var(--color-midnight-black);
  --shadow-button-hover: 4px 4px 0px 0px var(--color-midnight-black);
  --shadow-card: 0px 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-modal: 0px 8px 32px rgba(0, 0, 0, 0.3);

  /* Enhanced Border Radius */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;

  /* Layout Dimensions */
  --container-max-width: 1200px;
  --sidebar-width: 280px;
  --header-height: 72px;

  /* Animation Timings */
  --ease-fast: 150ms;
  --ease-normal: 250ms;
  --ease-slow: 350ms;

  /* Breakpoints */
  --breakpoint-3xl: 120rem;
}

@layer base {
  /* Font Face Declarations */
  @font-face {
    font-family: 'Edge Display';
    src: url('/fonts/edge-display/EdgeDisplay-Bold.otf') format('opentype');
    font-weight: 700;
  }

  @font-face {
    font-family: 'Edge Display';
    src: url('/fonts/edge-display/EdgeDisplay-Regular.otf') format('opentype');
    font-weight: 400;
  }

  /* Global Base Styles */
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: var(--color-dark-coal);
    color: var(--color-text-primary);
    font-family: var(--font-edge-display);
    line-height: 1.625;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography Hierarchy */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-edge-display);
    font-weight: 700;
    line-height: 1.25;
  }

  h1 { font-size: 2.25rem; }
  h2 { font-size: 1.875rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.125rem; }
  h6 { font-size: 1rem; }

  @media (min-width: 768px) {
    h1 { font-size: 3rem; }
    h2 { font-size: 2.25rem; }
    h3 { font-size: 1.875rem; }
    h4 { font-size: 1.5rem; }
    h5 { font-size: 1.25rem; }
    h6 { font-size: 1.125rem; }
  }

  p {
    line-height: 1.625;
  }

  /* Focus Styles */
  *:focus {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid var(--color-gold-sun);
    outline-offset: 2px;
  }

  /* Selection Styles */
  ::selection {
    background-color: var(--color-gold-sun);
    color: var(--color-charcoal-gray);
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--color-charcoal-gray);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-light-gray);
    border-radius: var(--radius-full);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-gold-sun);
  }
}

@layer components {
  /* Layout Components */
  .container-padding {
    padding: var(--spacing-2xl) var(--spacing-lg);
  }

  .page-container {
    background-color: var(--color-dark-coal);
    border-radius: var(--radius-3xl);
    padding: var(--spacing-2xl) var(--spacing-lg);
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
  }

  .page-container-wide {
    background-color: var(--color-dark-coal);
    border-radius: var(--radius-3xl);
    padding: var(--spacing-2xl) var(--spacing-lg);
    width: 100%;
    max-width: 56rem;
    margin: 0 auto;
  }

  /* Card Components */
  .card-base {
    background-color: var(--color-charcoal-gray);
    border-radius: var(--radius-3xl);
    transition: all var(--ease-fast) ease;
  }

  .card-default {
    background-color: var(--color-charcoal-gray);
    border-radius: var(--radius-3xl);
    padding: var(--spacing-lg);
    transition: all var(--ease-fast) ease;
  }

  .card-hover {
    background-color: var(--color-charcoal-gray);
    border-radius: var(--radius-3xl);
    padding: var(--spacing-lg);
    transition: all var(--ease-fast) ease;
    cursor: pointer;
  }

  .card-hover:hover {
    background-color: var(--color-charcoal-gray-hover);
    box-shadow: var(--shadow-card);
  }

  /* Button Components */
  .btn-base {
    font-weight: 700;
    font-family: var(--font-edge-display);
    border-radius: var(--radius-lg);
    padding: 0 var(--spacing-md);
    gap: var(--spacing-sm);
    outline: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all var(--ease-fast) ease;
    cursor: pointer;
  }

  .btn-base:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: var(--color-gold-sun);
    color: var(--color-charcoal-gray);
    box-shadow: var(--shadow-button);
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--color-gold-sun-hover);
    box-shadow: var(--shadow-button-hover);
  }

  .btn-primary:active:not(:disabled) {
    box-shadow: none;
    transform: translate(2px, 2px);
  }

  .btn-secondary {
    background-color: var(--color-charcoal-gray);
    color: var(--color-text-primary);
    box-shadow: var(--shadow-button);
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--color-charcoal-gray-hover);
    box-shadow: var(--shadow-button-hover);
  }

  .btn-secondary:active:not(:disabled) {
    box-shadow: none;
    transform: translate(2px, 2px);
  }

  /* Button Sizes */
  .btn-sm { height: 2rem; font-size: 0.875rem; padding: 0 0.75rem; }
  .btn-md { height: 2.5rem; font-size: 1rem; padding: 0 1rem; }
  .btn-lg { height: 3rem; font-size: 1.125rem; padding: 0 1.5rem; }
  .btn-xl { height: 3.5rem; font-size: 1.25rem; padding: 0 2rem; }

  /* Form Components */
  .input-default {
    background-color: var(--color-charcoal-gray);
    border-radius: var(--radius-lg);
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--color-text-primary);
    border: none;
    outline: none;
    transition: all var(--ease-fast) ease;
  }

  .input-default::placeholder {
    color: var(--color-text-muted);
  }

  .input-default:focus {
    box-shadow: var(--shadow-focus);
  }

  /* Utility Components */
  .text-gradient {
    background: linear-gradient(to right, var(--color-gold-sun), var(--color-gold-sun-light));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* Navigation Components */
  .nav-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--color-text-secondary);
    border-radius: var(--radius-lg);
    transition: all var(--ease-fast) ease;
  }

  .nav-link:hover {
    color: var(--color-text-accent);
    background-color: var(--color-old-sun-10);
  }

  .nav-link-active {
    color: var(--color-text-accent);
    background-color: var(--color-old-sun-10);
  }

  /* Status Components */
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .status-success {
    background-color: rgba(0, 200, 83, 0.2);
    color: var(--color-success-light);
  }

  .status-warning {
    background-color: rgba(255, 171, 0, 0.2);
    color: var(--color-warning-light);
  }

  .status-error {
    background-color: rgba(244, 67, 54, 0.2);
    color: var(--color-error);
  }

  .status-info {
    background-color: rgba(33, 150, 243, 0.2);
    color: var(--color-info);
  }
}

@layer utilities {
  /* Custom Utility Classes */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .safe-area-top {
    padding-top: env(safe-area-inset-top);
  }

  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Keyframe Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .page-container {
    padding: var(--spacing-xl) var(--spacing-md);
    border-radius: var(--radius-2xl);
  }

  .container-padding {
    padding: var(--spacing-xl) var(--spacing-md);
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}›


complete the entire frontend of auth