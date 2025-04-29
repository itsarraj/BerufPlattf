import { ErrorRequestHandler } from 'express';
import logger from '../../utils/logger';

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  logger.error('Server Error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  res.status(500).send('Internal Server Error');
};