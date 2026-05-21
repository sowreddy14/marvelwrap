import { Request, Response } from 'express';
import pool from './db.js';

export const getMovies = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM movies ORDER BY release_year ASC, id ASC');
    return res.status(200).json(result.rows);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMovieDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movieResult = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
    if (movieResult.rows.length === 0) {
      return res.status(404).json({ error: 'Movie variants not found.' });
    }

    const charactersResult = await pool.query(`
      SELECT c.* FROM characters c
      JOIN movie_characters mc ON c.id = mc.character_id
      WHERE mc.movie_id = $1
    `, [id]);

    return res.status(200).json({
      ...movieResult.rows[0],
      characters: charactersResult.rows
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const addMovie = async (req: Request, res: Response) => {
  const { title, phase, year, description, passcode } = req.body;

  if (passcode !== 'SHIELD_2026') {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO movies (title, phase, release_year, description)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `, [title, phase, parseInt(year), description]);

    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};