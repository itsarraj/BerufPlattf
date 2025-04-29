import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Create logs directory structure
const logDir = path.join(process.cwd(), 'logs');
const archiveDir = path.join(logDir, 'archive');

// Ensure directories exist
import fs from 'fs';
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

// Configure transports
const transports = [
  // Universal transport (info and above)
  new DailyRotateFile({
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    maxSize: '10m',
    maxFiles: undefined, // Keep logs indefinitely
    zippedArchive: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }),

  // Error-only transport
  new DailyRotateFile({
    level: 'error',
    filename: 'errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    maxSize: '10m',
    maxFiles: undefined, // Keep error logs indefinitely
    zippedArchive: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }),

  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
];

// Create logger instance
const logger = winston.createLogger({
  // level: 'debug', // Change from 'info' to 'debug' when debugging API issues
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transports,
  exceptionHandlers: [
    new DailyRotateFile({
      filename: 'exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      maxSize: '10m'
    })
  ]
});

// Archive moved files using rotation hooks
transports.forEach(transport => {
  transport.on('rotate', (oldFilename: string) => {
    const archivePath = path.join(archiveDir, path.basename(oldFilename));
    fs.rename(oldFilename, archivePath, (err) => {
      if (err) logger.error('Archive move failed', { error: err });
      else logger.info('Moved to archive', { file: oldFilename });
    });
  });
});

// Morgan integration stream
export const morganStream = {
  write: (message: string) => {
    // Log HTTP messages with proper level
    const status = parseInt(message.split(' ')[3]);
    if (status >= 400) {
      logger.error(message.trim());
    } else {
      logger.info(message.trim());
    }
  }
};

export default logger;