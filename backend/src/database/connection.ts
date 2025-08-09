// src/database/connection.ts
import mariadb from 'mariadb';

// Default values if environment variables are not set
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'job_platform';
const DB_POOL_SIZE = process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE) : 5;

// Create connection pool
export const pool = mariadb.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  connectionLimit: DB_POOL_SIZE,
  multipleStatements: true,
  bigIntAsNumber: true,
  connectTimeout: 10000, // 10 seconds
  acquireTimeout: 10000, // 10 seconds
});

// Test connection function
export async function testConnection(): Promise<boolean> {
  let conn;
  try {
    conn = await pool.getConnection();
    // logger.info(`DB Connected successfully (thread ID: ${conn.threadId})`);
    return true;
  } catch (error) {
    // logger.error('DB Connection failed', { error });
    return false;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

// Initialize connection testing
testConnection()
  .then(success => {
    if (!success) {
      // logger.error('Initial database connection test failed');
    }
  })
  .catch(err => {
    // logger.error('Unexpected error during connection test', { error: err });
  });