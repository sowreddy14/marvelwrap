import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Initialize connection pool with dynamic SSL configurations for cloud databases
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } // Required for hosting platforms like Render/Heroku
    : false
});

pool.connect((err: any, client: any, release: any) => {
  if (err) {
    return console.error('❌ Error acquiring database client:', err.stack);
  }
  console.log('🐘 Successfully connected to the secure PostgreSQL Cloud Database!');
  release();
});

export default pool;