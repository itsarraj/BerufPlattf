import { pool } from './connection';

export async function seedDummyData() {
  try {
    console.log('🌱 Seeding dummy data...');

    // Insert companies
    await pool.query(`
      INSERT INTO companies (name, description, website)
      VALUES
        ('OpenAI Inc.', 'Artificial intelligence research lab', 'https://openai.com'),
        ('TechNova Solutions', 'Software development agency', 'https://technova.io');
    `);

    // Insert recruiters (assuming company_id 1 and 2)
    await pool.query(`
      INSERT INTO recruiters (name, email, password, company_id)
      VALUES
        ('Alice Johnson', 'alice@openai.com', 'hashed_password1', 1),
        ('Bob Smith', 'bob@technova.io', 'hashed_password2', 2);
    `);

    // Insert users
    await pool.query(`
      INSERT INTO users (name, email, password, resume_data)
      VALUES
        ('John Doe', 'john.doe@example.com', 'hashed_password3', 'Resume content here...'),
        ('Jane Doe', 'jane.doe@example.com', 'hashed_password4', 'Another resume content...');
    `);

    // Insert jobs
    await pool.query(`
      INSERT INTO jobs (company_id, title, description, location, salary_min, salary_max)
      VALUES
        (1, 'AI Researcher', 'Work on cutting-edge AI projects.', 'San Francisco', 100000, 150000),
        (2, 'Full Stack Developer', 'Develop modern web applications.', 'Remote', 70000, 120000);
    `);

    // Insert applications
    await pool.query(`
      INSERT INTO applications (user_id, job_id, status, match_score, matched_on)
      VALUES
        (1, 1, 'pending', 95.50, CURDATE()),
        (2, 2, 'pending', 88.75, CURDATE());
    `);

    console.log('✅ Dummy data seeded successfully.');
  } catch (error) {
    console.error('❌ Error seeding dummy data:', error);
  }
}
