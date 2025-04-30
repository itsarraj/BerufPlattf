// src/controllers/usersController.ts
import { Request, Response } from 'express';
import { pool } from '../database/connection';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '@/interfaces/authRequest';

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  try {
    const user = await conn.execute(
      'SELECT id, name, email, resume_data FROM users WHERE id = ?',
      [req.user!.id]
    );

    if (user.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user[0]);
  } catch (error) {
    logger.error('Get user profile failed', { error });
    res.status(500).json({ error: 'Failed to fetch profile' });
    return;
  } finally {
    conn.release();
  }
};

export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' });
    return;
  }

  try {
    await conn.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, req.user!.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    logger.error('Update profile failed', { error });
    res.status(500).json({ error: 'Profile update failed' });
    return;
  } finally {
    conn.release();
  }
};

export const parseResume = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  try {
    const resumeText = req.file.buffer.toString();
    await conn.execute(
      'UPDATE users SET resume_data = ? WHERE id = ?',
      [resumeText, req.user!.id]
    );

    res.json({ message: 'Resume processed successfully' });
  } catch (error) {
    logger.error('Resume processing failed', { error });
    res.status(500).json({ error: 'Resume processing failed' });
    return;
  } finally {
    conn.release();
  }
};