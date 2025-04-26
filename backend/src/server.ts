import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Load environment variables

dotenv.config();
import router from './routes/routes';
import './database/connection';

import { initializeDatabase } from './database/init'; // <- whatever your file is called

async function startServer() {
    await initializeDatabase();

    // Then your server setup like:
    const app = express();
    app.listen(3000, () => console.log('Server running on port 3000'));
}

startServer();
