import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';

export const metricsLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info('Request Performance', {
        method: req.method,
        path: req.url,
        duration: `${duration}ms`,
        status: res.statusCode
      });
    });

    next();
  };
};