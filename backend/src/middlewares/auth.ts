import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../database/connection';
import { AuthenticatedRequest } from '@/interfaces/authRequest';

export const auth = (role: 'user' | 'recruiter' | 'both') => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
        id: string,
        role: 'user'|'recruiter',
        iat: number
      };

      // Check token revocation
      const revoked = await pool.query(
        'SELECT * FROM revoked_tokens WHERE token = ?',
        [token]
      );

      if (revoked.length > 0) {
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
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

async function getRecruiterCompany(recruiterId: number): Promise<number | null> {
  const rows = await pool.query(
    'SELECT company_id FROM recruiters WHERE id = ?',
    [recruiterId]
  );
  return rows[0]?.company_id || null;
}
