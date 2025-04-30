import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';

export const requestLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Log request details
    logger.debug('Request Details', {
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body
    });

    // Capture response body
    const oldSend = res.send;
    res.send = function(body: any): any {
      res.locals.body = body;
      return oldSend.apply(res, arguments as unknown as [any?]);
    };

    // Log response details
    res.on('finish', () => {
      logger.debug('Response Details', {
        status: res.statusCode,
        body: res.locals.body
      });
    });

    next();
  };
};