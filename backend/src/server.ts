import express from 'express';
import cors from 'cors';
import pool from './db.js';
import { getMovies, getMovieDetails, addMovie } from './movieController.js';
import { getAllCharacters, getCharacterDetails, addCharacter, linkCharacterToMovie } from './characterController.js';

const app = express();

// Relax CORS policy configurations explicitly so your live UI can communicate seamlessly
app.use(cors({
  origin: '*', 
  credentials: true
}));

app.use(express.json());

// Movie endpoints
app.get('/api/movies', getMovies);
app.get('/api/movies/:id', getMovieDetails);
app.post('/api/movies', addMovie);

// Character endpoints
app.get('/api/characters', getAllCharacters);
app.get('/api/characters/:id', getCharacterDetails);
app.post('/api/characters', addCharacter);

// Relation bridge endpoint
app.post('/api/movies/link-character', linkCharacterToMovie);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`⚡ Server running successfully at port: ${PORT}`);
});