import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
// import { morganStream } from "./utils/logger";
// import { requestLogger } from "./middlewares/logging/requestLogger";
// import { metricsLogger } from "./middlewares/logging/metricsLogger";
// import { errorLogger } from "./middlewares/logging/errorLogger";

dotenv.config();
import { initializeDatabase } from './database/init';
import router from './routes/routes';

async function startServer() {
  await initializeDatabase();
  // runBenchmark();
  const app = express();

  // Basic middleware
  app.use(express.json());
  app.use(cors());

  // Logging setup
  // app.use(morgan('combined', { stream: morganStream }));
  // app.use(requestLogger());
  // app.use(metricsLogger());

  // Routes
  app.use('/api', router);

  // Error handling (must be last middleware)
  // app.use(errorLogger);

  app.listen(3000, () => console.log('Server running on port 3000'));
}

startServer();