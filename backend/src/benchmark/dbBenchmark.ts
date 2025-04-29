// benchmark/dbBenchmark.ts
import { pool } from '../database/connection';

async function insertUsingPoolQuery(n: number) {
  const start = performance.now(); // Use performance.now() for more precision

  for (let i = 0; i < n; i++) {
    await pool.query(
      'INSERT INTO benchmark_users (name, email) VALUES (?, ?)',
      [`UserPool${i}`, `pool${i}@example.com`]
    );
  }

  const duration = performance.now() - start; // Calculate time with higher precision
  console.log(`Direct pool.query: Inserted ${n} rows in ${duration.toFixed(3)} ms`);
}

async function insertUsingGetConnection(n: number) {
  const start = performance.now(); // Use performance.now() for more precision
  const conn = await pool.getConnection();

  try {
    for (let i = 0; i < n; i++) {
      await conn.query(
        'INSERT INTO benchmark_users (name, email) VALUES (?, ?)',
        [`UserConn${i}`, `conn${i}@example.com`]
      );
    }
  } finally {
    conn.release();
  }

  const duration = performance.now() - start; // Calculate time with higher precision
  console.log(`Using getConnection.query: Inserted ${n} rows in ${duration.toFixed(3)} ms`);
}

async function insertUsingPoolExecute(n: number) {
  const start = performance.now(); // Use performance.now() for more precision

  for (let i = 0; i < n; i++) {
    await pool.execute(
      'INSERT INTO benchmark_users (name, email) VALUES (?, ?)',
      [`UserExec${i}`, `exec${i}@example.com`]
    );
  }

  const duration = performance.now() - start; // Calculate time with higher precision
  console.log(`Direct pool.execute: Inserted ${n} rows in ${duration.toFixed(3)} ms`);
}

async function insertUsingGetConnectionExecute(n: number) {
  const start = performance.now(); // Use performance.now() for more precision
  const conn = await pool.getConnection();

  try {
    for (let i = 0; i < n; i++) {
      await conn.execute(
        'INSERT INTO benchmark_users (name, email) VALUES (?, ?)',
        [`UserConnExec${i}`, `connexec${i}@example.com`]
      );
    }
  } finally {
    conn.release();
  }

  const duration = performance.now() - start; // Calculate time with higher precision
  console.log(`Using getConnection.execute: Inserted ${n} rows in ${duration.toFixed(3)} ms`);
}

export async function runBenchmark() {
  const n = 1;

  console.log('Starting benchmark...\n');

  await insertUsingPoolQuery(n);
  await insertUsingGetConnection(n);
  await insertUsingPoolExecute(n);
  await insertUsingGetConnectionExecute(n);

  console.log('\nBenchmark completed.');
  process.exit(0);
}
