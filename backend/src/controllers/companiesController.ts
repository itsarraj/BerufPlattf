// src/controllers/companiesController.ts
import { Request, Response } from 'express';
import { pool } from '../database/connection';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '@/interfaces/authRequest';

export const createCompany = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();
  const { name, description, website } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Company name is required' });
    return;
  }

  try {
    const result = await conn.execute(
      `INSERT INTO companies (name, description, website)
       VALUES (?, ?, ?)`,
      [name, description || null, website || null]
    );

    await conn.execute(
      'UPDATE recruiters SET company_id = ? WHERE id = ?',
      [result.insertId, req.user!.id]
    );

    res.status(201).json({ id: result.insertId.toString() });
    return;
  } catch (error) {
    logger.error('Company creation failed', { error });
    res.status(500).json({ error: 'Company creation failed' });
    return;
  } finally {
    conn.release();
  }
};

export const getCompanyProfile = async (req: AuthenticatedRequest, res: Response) => {
  const conn = await pool.getConnection();

  try {
    const company = await conn.execute(
      'SELECT id, name, description, website FROM companies WHERE id = ?',
      [req.user!.company_id]
    );

    console.log(company)
    if (company.length === 0) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    res.json(company[0]);
    return;
  } catch (error) {
    logger.error('Get company failed', { error });
    res.status(500).json({ error: 'Failed to fetch company' });
    return;
  } finally {
    conn.release();
  }
};