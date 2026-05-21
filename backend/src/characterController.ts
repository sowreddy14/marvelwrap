import { Request, Response } from 'express';
import pool from './db.js';

// 1. GET: Fetch all characters for the admin dropdown lists
export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM characters ORDER BY char_name ASC');
    return res.status(200).json(result.rows);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// 2. GET: Fetch deep character details + all movies they acted in
export const getCharacterDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const charResult = await pool.query('SELECT * FROM characters WHERE id = $1', [id]);
    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    const moviesResult = await pool.query(`
      SELECT m.* FROM movies m
      JOIN movie_characters mc ON m.id = mc.movie_id
      WHERE mc.character_id = $1
      ORDER BY m.release_year ASC
    `, [id]);

    return res.status(200).json({
      ...charResult.rows[0],
      movies: moviesResult.rows
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// 3. POST: Securely add a new character profile
export const addCharacter = async (req: Request, res: Response) => {
  const { char_name, actor_name, biography, passcode } = req.body;

  if (passcode !== 'SHIELD_2026') {
    return res.status(401).json({ error: 'Unauthorized credentials.' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO characters (char_name, actor_name, biography)
      VALUES ($1, $2, $3) RETURNING *;
    `, [char_name, actor_name, biography]);

    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// 4. POST: Securely link a character to a movie inside the junction table
export const linkCharacterToMovie = async (req: Request, res: Response) => {
  const { movie_id, character_id, passcode } = req.body;

  if (passcode !== 'SHIELD_2026') {
    return res.status(401).json({ error: 'Unauthorized credentials.' });
  }

  try {
    await pool.query(`
      INSERT INTO movie_characters (movie_id, character_id)
      VALUES ($1, $2) ON CONFLICT DO NOTHING;
    `, [movie_id, character_id]);

    return res.status(201).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};