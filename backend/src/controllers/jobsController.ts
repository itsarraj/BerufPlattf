// src/controllers/jobsController.ts
import { Request, Response } from 'express';
import { pool } from '../database/connection';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '@/interfaces/authRequest';


export const createJob = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();
  const { title, description, location, salary_min, salary_max } = req.body;

  // Validate inputs
  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
    return;
  }

  if (!req.user!.company_id) {
    res.status(400).json({ error: 'You must be associated with a company' });
    return;
  }

  try {
    const result = await conn.execute(
      `INSERT INTO jobs
       (company_id, title, description, location, salary_min, salary_max)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user!.company_id,
        title,
        description,
        location || null,
        salary_min || null,
        salary_max || null
      ]
    );

    res.status(201).json({
      id: result.insertId.toString(),
      message: 'Job created successfully'
    });
  } catch (error) {
    logger.error('Job creation failed', { error });
    res.status(500).json({ error: 'Failed to create job' });
    return;
  } finally {
    conn.release();
  }
};

export const getRecruiterJobs = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  try {
    const jobs = await conn.execute(
      'SELECT * FROM jobs WHERE company_id = ?',
      [req.user!.company_id]
    );

    res.json(jobs);
  } catch (error) {
    logger.error('Failed to fetch recruiter jobs', { error });
    res.status(500).json({ error: 'Failed to fetch jobs' });
    return;
  } finally {
    conn.release();
  }
};

export const getJobMatches = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  try {
    // Verify the job belongs to the recruiter's company
    const job = await conn.execute(
      'SELECT * FROM jobs WHERE id = ? AND company_id = ?',
      [req.params.id, req.user!.company_id]
    );

    if (job.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    // Get matches
    const matches = await conn.execute(
      `SELECT a.*, u.name, u.email, u.resume_data
       FROM applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.job_id = ?
       ORDER BY a.match_score DESC`,
      [req.params.id]
    );

    res.json(matches);
  } catch (error) {
    logger.error('Failed to fetch job matches', { error });
    res.status(500).json({ error: 'Failed to fetch job matches' });
    return;
  } finally {
    conn.release();
  }
};

export const listPublicJobs = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();

  try {
    const jobs = await conn.execute(
      'SELECT id, title, description, location FROM jobs'
    );
    res.json(jobs);
  } catch (error) {
    logger.error('Failed to list public jobs', { error });
    res.status(500).json({ error: 'Failed to fetch jobs' });
    return;
  } finally {
    conn.release();
  }
};

export const getJobDetails = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();

  try {
    const jobs = await conn.execute(
      `SELECT j.*, c.name as company_name
       FROM jobs j
       JOIN companies c ON j.company_id = c.id
       WHERE j.id = ?`,
      [req.params.id]
    );

    if (jobs.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json(jobs[0]);
  } catch (error) {
    logger.error('Failed to fetch job details', { error });
    res.status(500).json({ error: 'Failed to fetch job details' });
    return;
  } finally {
    conn.release();
  }
};
