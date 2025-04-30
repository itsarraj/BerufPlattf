// src/middlewares/auth.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../database/connection';
import { AuthenticatedRequest } from '../interfaces/authRequest';
import logger from '../utils/logger';

export const auth = (role: 'user' | 'recruiter' | 'both') => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
        id: string,
        role: 'user'|'recruiter',
        iat: number
      };

      // Check token revocation
      const conn = await pool.getConnection();
      try {
        const revoked = await conn.query(
          'SELECT id FROM revoked_tokens WHERE token = ?',
          [token]
        );

        if (Array.isArray(revoked) && revoked.length > 0) {
          res.status(401).json({ error: 'Token revoked' });
          return;
        }

        // Role validation
        if (role !== 'both' && decoded.role !== role) {
          res.status(403).json({ error: 'Insufficient permissions' });
          return;
        }

        // Attach user to request
        req.user = {
          id: parseInt(decoded.id),
          role: decoded.role,
          company_id: decoded.role === 'recruiter' ? await getRecruiterCompany(parseInt(decoded.id)) : null
        };

        next();
      } catch (error) {
        logger.error('Database error during authentication', { error });
        res.status(500).json({ error: 'Internal server error' });
        return;
      } finally {
        conn.release();
      }
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
  };
};

async function getRecruiterCompany(recruiterId: number): Promise<number | null> {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      'SELECT company_id FROM recruiters WHERE id = ?',
      [recruiterId]
    );

    if (Array.isArray(rows) && rows.length > 0 && rows[0].company_id) {
      return rows[0].company_id;
    }
    return null;
  } catch (error) {
    logger.error('Error getting recruiter company', { error, recruiterId });
    return null;
  } finally {
    conn.release();
  }
}