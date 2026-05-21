export interface ICharacter {
  id?: number;
  char_name: string;
  actor_name: string;
  biography: string;
  created_at?: Date;
}

export const createCharactersTableQuery = `
  CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    char_name VARCHAR(255) NOT NULL,
    actor_name VARCHAR(255) NOT NULL,
    biography TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;