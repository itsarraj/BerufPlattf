// src/controllers/applicationsController.ts
import { Response } from 'express';
import { pool } from '../database/connection';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '../interfaces/authRequest';

export const applyToJob = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  try {
    // Check if job exists first
    const jobCheck = await conn.query(
      `SELECT id FROM jobs WHERE id = ?`,
      [req.params.id]
    );

    if (!Array.isArray(jobCheck) || jobCheck.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    // Check if user has already applied - safer query approach
    const existingApplication = await conn.query(
      `SELECT id FROM applications WHERE user_id = ? AND job_id = ?`,
      [req.user!.id, req.params.id]
    );

    // Safer check for existing application
    const hasExistingApplication = Array.isArray(existingApplication) && existingApplication.length > 0;
    if (hasExistingApplication) {
      res.status(409).json({ error: 'You have already applied to this job' });
      return;
    }

    // Basic match score calculation (will be replaced with AI matching later)
    const matchScore = Math.floor(Math.random() * (100 - 70 + 1)) + 70;

    const result = await conn.execute(
      `INSERT INTO applications
       (user_id, job_id, status, match_score, matched_on)
       VALUES (?, ?, 'pending', ?, CURRENT_DATE())`,
      [req.user!.id, req.params.id, matchScore]
    );

    res.status(201).json({
      message: 'Application submitted successfully',
      match_score: matchScore
    });
  } catch (error) {
    logger.error('Job application failed', { error, userId: req.user!.id, jobId: req.params.id });
    res.status(500).json({ error: 'Application submission failed' });
  } finally {
    conn.release();
  }
};

export const updateApplicationStatus = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();
  const { status } = req.body;
  const applicationId = req.params.id;

  // Validate status value
  const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({ error: 'Valid status is required', validOptions: validStatuses });
    return;
  }

  try {
    // Verify that this recruiter has access to this application - safer approach
    const accessCheck = await conn.query(
      `SELECT a.id
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.id = ? AND j.company_id = ?`,
      [applicationId, req.user!.company_id]
    );

    const hasAccess = Array.isArray(accessCheck) && accessCheck.length > 0;
    if (!hasAccess) {
      res.status(403).json({ error: 'You do not have permission to modify this application' });
      return;
    }

    await conn.execute(
      'UPDATE applications SET status = ? WHERE id = ?',
      [status, applicationId]
    );

    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    logger.error('Status update failed', { error, applicationId });
    res.status(500).json({ error: 'Status update failed' });
  } finally {
    conn.release();
  }
};

export const getUserApplications = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  try {
    const applications = await conn.query(
      `SELECT a.id, a.job_id, a.status, a.match_score, a.matched_on, a.created_at,
       j.title as job_title, c.name as company_name, j.location
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON j.company_id = c.id
       WHERE a.user_id = ?
       ORDER BY a.created_at DESC`,
      [req.user!.id]
    );

    // Ensure we always return an array
    res.json(Array.isArray(applications) ? applications : []);
  } catch (error) {
    logger.error('Failed to fetch applications', { error, userId: req.user!.id });
    res.status(500).json({ error: 'Failed to fetch applications' });
  } finally {
    conn.release();
  }
};

export const getApplicationDetails = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();
  const applicationId = req.params.id;

  try {
    let query;
    let params;

    // Different query based on user role
    if (req.user!.role === 'user') {
      // User can only see their own applications
      query = `
        SELECT a.*, j.title as job_title, c.name as company_name
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        JOIN companies c ON j.company_id = c.id
        WHERE a.id = ? AND a.user_id = ?
      `;
      params = [applicationId, req.user!.id];
    } else {
      // Recruiter can only see applications for their company's jobs
      query = `
        SELECT a.*, u.name as applicant_name, u.email as applicant_email,
        j.title as job_title
        FROM applications a
        JOIN users u ON a.user_id = u.id
        JOIN jobs j ON a.job_id = j.id
        WHERE a.id = ? AND j.company_id = ?
      `;
      params = [applicationId, req.user!.company_id];
    }

    const application = await conn.query(query, params);

    // Safer check for empty results
    const hasApplication = Array.isArray(application) && application.length > 0;
    if (!hasApplication) {
      res.status(404).json({ error: 'Application not found' });
    }

    res.json(application[0]);
  } catch (error) {
    logger.error('Failed to fetch application details', { error, applicationId });
    res.status(500).json({ error: 'Failed to fetch application details' });
  } finally {
    conn.release();
  }
};