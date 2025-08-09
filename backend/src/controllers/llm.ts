import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/connection';
import { hashPassword, validatePassword } from '../utils/helpers';
import logger from '../utils/logger';

// Helper for logging user events
async function logUserEvent(
  conn: any,
  userId: string | null,
  eventType: string,
  req: Request,
  metadata: object = {}
) {
  await conn.execute(
    `INSERT INTO user_event_logs
      (user_id, event_type, ip_address, device_info, user_agent, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userId,
      eventType,
      req?.ip || null,
      req?.headers['x-device-info'] || null,
      req?.headers['user-agent'] || null,
      JSON.stringify(metadata),
    ]
  );
}

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    // Check if email exists - directly get rows array
    const rows = await conn.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    // Handle MariaDB result (array of rows)
    if (Array.isArray(rows) && rows.length > 0) {
      res.status(409).json({ error: 'Email already registered.' });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      res.status(500).json({ error: 'Password processing failed' });
      return;
    }

    // Generate UUID
    const userId = uuidv4();

    // Insert new user
    await conn.execute(
      'INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)',
      [userId, email, hashedPassword]
    );

    await logUserEvent(conn, userId, 'register', req);

    logger.info('New user registered', { email });
    res.status(201).json({ id: userId, email });
  } catch (error) {
    logger.error('Registration failed', { error, email });
    res.status(500).json({ error: 'Registration failed.' });
  } finally {
    conn.release();
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { email, password } = req.body;
  const deviceInfo = req.headers['x-device-info'] || req.headers['user-agent'] || 'unknown';
  const ipAddress = req.ip;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    // Directly get array of users
    const users = await conn.execute(
      'SELECT id, password_hash FROM users WHERE email = ?',
      [email]
    );

    // Handle MariaDB result (array of rows)
    if (!Array.isArray(users) || users.length === 0) {
      await logUserEvent(conn, null, 'failed_login', req, { reason: 'User not found', email });
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    // Get first user (should be only one due to unique email)
    const user = users[0];
    const isValid = await validatePassword(password, user.password_hash);

    if (!isValid) {
      await logUserEvent(conn, user.id, 'failed_login', req, { reason: 'Invalid password' });
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    // Store refresh token for this device
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await conn.execute(
      `INSERT INTO user_refresh_tokens
        (user_id, refresh_token, device_info, ip_address, expires_at)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         refresh_token = VALUES(refresh_token),
         expires_at = VALUES(expires_at),
         last_used_at = CURRENT_TIMESTAMP`,
      [user.id, refreshToken, deviceInfo, ipAddress, expiresAt]
    );

    await logUserEvent(conn, user.id, 'login', req);

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken
    });
  } catch (error) {
    logger.error('Login failed', { error });
    res.status(500).json({ error: 'Login failed.' });
  } finally {
    conn.release();
  }
};

// REFRESH TOKEN
export const refreshToken = async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token required.' });
    return;
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string; };

    // Check token in DB and not expired - directly get rows array
    const rows = await conn.execute(
      `SELECT id FROM user_refresh_tokens
        WHERE user_id = ? AND refresh_token = ? AND expires_at > NOW()`,
      [decoded.id, refreshToken]
    );

    // Handle MariaDB result (array of rows)
    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(401).json({ error: 'Invalid or expired refresh token.' });
      return;
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1h' }
    );

    // Update last_used_at
    await conn.execute(
      `UPDATE user_refresh_tokens SET last_used_at = CURRENT_TIMESTAMP WHERE user_id = ? AND refresh_token = ?`,
      [decoded.id, refreshToken]
    );

    await logUserEvent(conn, decoded.id, 'refresh_token', req);

    res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token.' });
  } finally {
    conn.release();
  }
};

// LOGOUT
export const logoutUser = async (req: Request, res: Response) => {
  let conn = await pool.getConnection();
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token required.' });
    return;
  }
  try {
    // Verify and decode refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string; };
    } catch (err) {
      res.status(401).json({ error: 'Invalid refresh token.' });
      return;
    }

    // Check if refresh token exists for this user
    const rows = await conn.execute(
      'SELECT id FROM user_refresh_tokens WHERE user_id = ? AND refresh_token = ?',
      [decoded.id, refreshToken]
    );

    if (!rows || !Array.isArray(rows) || rows.length === 0 || !rows[0].id) {
      res.status(400).json({ error: 'Refresh token not found or already logged out.' });
      return;
    }

    // Remove this device's refresh token
    await conn.query(
      'DELETE FROM user_refresh_tokens WHERE user_id = ? AND refresh_token = ?',
      [decoded.id, refreshToken]
    );

    await logUserEvent(conn, decoded.id, 'logout', req);

    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    logger.error('Logout failed', { error });
    res.status(500).json({ error: 'Logout failed.' });
  } finally {
    conn.release();
  }
};
