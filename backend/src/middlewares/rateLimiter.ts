import { Request, Response, NextFunction } from 'express';
import { pool } from '../database/connection';

export const rateLimiter = (maxHits: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const endpoint = req.path;

    // Cleanup old entries
    // await pool.query(
    //   'DELETE FROM rate_limits WHERE last_hit < NOW() - INTERVAL 1 HOUR'
    // );

    await pool.query(
      'DELETE FROM rate_limits WHERE last_hit < NOW() - INTERVAL 10 SECOND'
    );

    // Check current hits
    const results = await pool.query(
      'SELECT hits FROM rate_limits WHERE ip = ? AND endpoint = ?',
      [ip, endpoint]
    );

    if(results.length > 0 && results[0].hits >= maxHits) {
      res.status(429).json({
        error: 'Too many requests'
      });
      return;
    }

    // Update hits
    await pool.query(`
      INSERT INTO rate_limits (ip, endpoint, hits, last_hit)
      VALUES (?, ?, 1, NOW())
      ON DUPLICATE KEY UPDATE hits = hits + 1, last_hit = NOW()
    `, [ip, endpoint]);

    next();
  };
};