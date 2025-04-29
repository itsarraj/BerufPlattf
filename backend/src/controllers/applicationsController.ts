// src/controllers/applicationsController.ts
import { Request, Response } from 'express';
import { pool } from '../database/connection';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '@/interfaces/authRequest';

export const applyToJob = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  try {
    const matchScore = Math.floor(Math.random() * (100 - 70 + 1)) + 70;

    await conn.execute(
      `INSERT INTO applications
       (user_id, job_id, status, match_score, matched_on)
       VALUES (?, ?, 'pending', ?, CURRENT_DATE())`,
      [req.user!.id, req.params.id, matchScore]
    );

    res.status(201).json({ message: 'Application submitted' });
    return;
  } catch (error) {
    logger.error('Job application failed', { error });
    res.status(500).json({ error: 'Application failed' });
    return;
  } finally {
    conn.release();
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ error: 'Status is required' });
    return;
  }

  try {
    await conn.execute(
      'UPDATE applications SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    res.json({ message: 'Status updated' });
    return;
  } catch (error) {
    logger.error('Status update failed', { error });
    res.status(500).json({ error: 'Update failed' });
    return;
  } finally {
    conn.release();
  }
};

export const getUserApplications = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  try {
    const applications = await conn.execute(
      `SELECT a.*, j.title as job_title, c.name as company_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON j.company_id = c.id
       WHERE a.user_id = ?`,
      [req.user!.id]
    );

    res.json(applications);
    return;
  } catch (error) {
    logger.error('Failed to fetch applications', { error });
    res.status(500).json({ error: 'Failed to fetch applications' });
    return;
  } finally {
    conn.release();
  }
};