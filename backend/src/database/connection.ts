import mariadb from 'mariadb';

export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  multipleStatements: true,
  bigIntAsNumber: true,
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    if (conn) {
      // Print connection thread
      console.log(`Connected! (id=${conn.threadId})`);
    }
  }
  catch (error) {
    console.log(error);
  }
  finally {
    if (conn) conn.release(); //release to pool
  }
}

asyncFunction();