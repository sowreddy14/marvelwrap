import pkg from 'pg';
import dotenv from 'dotenv';
import { createMoviesTableQuery } from './models/Movie.js';
import { createCharactersTableQuery } from './models/Character.js';
import { createMovieCharactersJunctionQuery } from './models/MovieCharacter.js';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.connect(async (err: any, client: any, release: any) => {
  if (err) {
    return console.error('❌ Error acquiring database client:', err.stack);
  }
  console.log('🐘 Successfully connected to the secure PostgreSQL Cloud Database!');
  
  try {
    // Run migrations in precise order to preserve foreign key constraints
    await pool.query(createMoviesTableQuery);
    await pool.query(createCharactersTableQuery);
    await pool.query(createMovieCharactersJunctionQuery);
    
    console.log('🛡️ All relational system models (Movies, Characters, Junctions) validated and ready.');
  } catch (migrationErr: any) {
    console.error('❌ Relational schema migration failed:', migrationErr.message);
  }

  release();
});

export default pool;