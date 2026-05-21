export interface IMovieCharacter {
  movie_id: number;
  character_id: number;
}

export const createMovieCharactersJunctionQuery = `
  CREATE TABLE IF NOT EXISTS movie_characters (
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    character_id INT REFERENCES characters(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, character_id)
  );
`;