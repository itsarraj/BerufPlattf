// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../database/connection';
import { hashPassword, validatePassword } from '../utils/helpers';
import logger from '../utils/logger';
import { AuthenticatedRequest } from '../interfaces/authRequest';


export const registerUser = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { name, email, password, type } = req.body;

  // Validate inputs
  if (!name || !email || !password || !type) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // Validate user type
  if (type !== 'user' && type !== 'recruiter') {
    res.status(400).json({ error: 'Invalid user type' });
    return;
  }

  // Determine table based on user type
  const table = type === 'recruiter' ? 'recruiters' : 'users';

  try {
    // Check if email exists
    const existing = await conn.execute(
      `SELECT id FROM ${table} WHERE email = ?`,
      [email]
    );

    if (existing.length > 0) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      res.status(500).json({ error: 'Password processing failed' });
      return;
    }

    // Insert new user
    const result = await conn.execute(
      `INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    logger.info(`New ${type} registered`, { email });
    // Return success without password
    res.status(201).json({
      id: result.insertId.toString(),
      name,
      email,
      type
    });
  } catch (error) {
    logger.error('Registration failed', { error, email });
    res.status(500).json({ error: 'Registration failed' });
  } finally {
    conn.release();
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { email, password, type } = req.body;

  // Validate inputs
  if (!email || !password || !type) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // Validate user type
  if (type !== 'user' && type !== 'recruiter') {
    res.status(400).json({ error: 'Invalid user type' });
    return;
  }

  const table = type === 'recruiter' ? 'recruiters' : 'users';

  try {
    const result = await conn.execute(
      `SELECT id, password FROM ${table} WHERE email = ?`,
      [email]
    );

    if (result[0].length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isValid = await validatePassword(password, result[0].password);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: result[0].id, role: type },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { id: result[0].id, role: type },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    // Store refresh token
    await conn.execute(
      `UPDATE ${table} SET refresh_token = ? WHERE id = ?`,
      [refreshToken, result[0].id]
    );

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken
    });
    return;
  } catch (error) {
    logger.error('Login failed', { error });
    res.status(500).json({ error: 'Login failed' });
    return;
  } finally {
    conn.release();
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token required' });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
      id: string;
      role: 'user' | 'recruiter';
    };

    const table = decoded.role === 'recruiter' ? 'recruiters' : 'users';

    // Verify token is still valid in database
    const result = await conn.execute(
      `SELECT id FROM ${table} WHERE id = ? AND refresh_token = ?`,
      [decoded.id, refreshToken]
    );

    if (result[0].length === 0) {
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken
    });
    return;
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
    return;
  } finally {
    conn.release();
  }
};

export const logoutUser = async (req: AuthenticatedRequest , res: Response) => {
  const conn = await pool.getConnection();
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Authorization token required' });
    return;
  }

  try {
    // Add token to revoked list
    await conn.execute(
      'INSERT INTO revoked_tokens (token) VALUES (?)',
      [token]
    );

    // Clear refresh token
    const table = req.user?.role === 'recruiter' ? 'recruiters' : 'users';
    await conn.execute(
      `UPDATE ${table} SET refresh_token = NULL, last_logout = NOW() WHERE id = ?`,
      [req.user?.id]
    );

    res.status(200).json({ message: 'Logged out successfully' });
    return;
  } catch (error) {
    logger.error('Logout failed', { error });
    res.status(500).json({ error: 'Logout failed' });
    return;
  } finally {
    conn.release();
  }
};