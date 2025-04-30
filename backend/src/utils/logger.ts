import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';

// Create logs directory structure
const logDir = path.join(process.cwd(), 'logs');
const archiveDir = path.join(logDir, 'archive');

// Ensure directories exist
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

// Custom log format for files
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Custom log format for console
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(
    ({ timestamp, level, message, ...metadata }) =>
      `${timestamp} [${level}]: ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`
  )
);

const transports: winston.transport[] = [
  new DailyRotateFile({
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    maxSize: '20m',
    maxFiles: '14d', // Keep logs for 14 days
    zippedArchive: true,
    format: fileFormat
  }),
  new DailyRotateFile({
    level: 'error',
    filename: 'errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    maxSize: '20m',
    maxFiles: '30d', // Keep error logs for 30 days
    zippedArchive: true,
    format: fileFormat
  })
];

// Only add console transport in development
if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat
    })
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
  transports,
  exceptionHandlers: [
    new DailyRotateFile({
      filename: 'exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      maxSize: '20m',
      maxFiles: '30d'
    })
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: 'rejections-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      maxSize: '20m',
      maxFiles: '30d'
    })
  ]
});

// Morgan integration stream
export const morganStream = {
  write: (message: string) => {
    // Log HTTP messages with proper level
    const status = parseInt(message.split(' ')[3]);
    if (status >= 500) {
      logger.error(message.trim());
    } else if (status >= 400) {
      logger.warn(message.trim());
    } else {
      logger.info(message.trim());
    }
  }
};

export default logger;