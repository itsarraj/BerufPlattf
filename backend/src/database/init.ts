import fs from 'fs';
import path from 'path';
import { pool } from './connection';

// Function to auto-run init.sql if tables are missing
export async function initializeDatabase() {
    const connection = await pool.getConnection();

    try {
        // Check if "users" table exists
        const [rows, fields] = await connection.query(`SHOW TABLES LIKE 'users'`);

        if (!Array.isArray(rows) || rows.length === 0) {
            console.log('No tables found. Initializing database...');

            const initSQL = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
            await connection.query(initSQL, { multipleStatements: true });

            console.log('✅ Database initialized.');
        } else {
            console.log('✅ Database already initialized.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        connection.release();
    }
}
