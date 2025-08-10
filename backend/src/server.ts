import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

import router from './routes/routes';

async function startServer() {
  try {
    const app = express();
    const PORT = process.env.PORT || 8000;

    // Basic middleware
    app.use(express.json());
    app.use(cors());

    app.use('/api', router);

    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer().catch((err) => {
  console.error('❌ Unhandled error during server startup:', err);
  process.exit(1);
});
