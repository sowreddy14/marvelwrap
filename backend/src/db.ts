import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Initialize a connection pool to manage simultaneous database queries efficiently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection automatically when the app starts with strict explicit typing
pool.connect((err: Error | null, client: any, release: (err?: boolean | Error) => void) => {
  if (err) {
    return console.error('❌ Error acquiring database client:', err.stack);
  }
  console.log('🐘 Successfully connected to the PostgreSQL Database!');
  release();
});

export default pool;