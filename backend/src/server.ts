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
