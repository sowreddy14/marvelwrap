export interface IMovie {
  id?: number;
  title: string;
  phase: string;
  release_year: number;
  description: string;
  created_at?: Date;
}

export const createMoviesTableQuery = `
  CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    phase VARCHAR(50) NOT NULL,
    release_year INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;