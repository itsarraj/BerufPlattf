import { pool } from './connection';

export async function clearDummyData() {
  try {
    console.log('🧹 Clearing dummy data...');

    // Remove based on known dummy emails or names
    await pool.query(`
      DELETE FROM applications
      WHERE user_id IN (SELECT id FROM users WHERE email IN ('john.doe@example.com', 'jane.doe@example.com'));
    `);

    await pool.query(`
      DELETE FROM jobs
      WHERE title IN ('AI Researcher', 'Full Stack Developer');
    `);

    await pool.query(`
      DELETE FROM recruiters
      WHERE email IN ('alice@openai.com', 'bob@technova.io');
    `);

    await pool.query(`
      DELETE FROM users
      WHERE email IN ('john.doe@example.com', 'jane.doe@example.com');
    `);

    await pool.query(`
      DELETE FROM companies
      WHERE name IN ('OpenAI Inc.', 'TechNova Solutions');
    `);

    console.log('✅ Dummy data cleared successfully.');
  } catch (error) {
    console.error('❌ Error clearing dummy data:', error);
  }
}

clearDummyData();
