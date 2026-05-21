import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import './db.js';    // 👈 REMOVE THE EXTENSION (.js) HERE
import './redis.js';

import pool from './db.js'; // 👈 REMOVE THE EXTENSION (.js) HERE

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to let our server process incoming JSON payloads
app.use(express.json());

// 1. Baseline Server Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: "healthy", 
    message: "MarvelWrap Backend engine is active and responding smoothly!" 
  });
});

// 2. Database Tables Initialization Route (POST Method)
app.post('/api/db/init', async (req: Request, res: Response) => {
  try {
    // Create Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create MCU Movies Metadata Registry
    await pool.query(`
      CREATE TABLE IF NOT EXISTS mcu_movies (
        id INT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        phase VARCHAR(20) NOT NULL,
        runtime_minutes INT NOT NULL,
        poster_path VARCHAR(255),
        release_date DATE
      );
    `);

    // Create User Watch History Junction Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_watch_history (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        movie_id INT REFERENCES mcu_movies(id) ON DELETE CASCADE,
        watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, movie_id)
      );
    `);

    res.json({ 
      success: true, 
      message: "All relational PostgreSQL tables initialized successfully!" 
    });
  } catch (error: any) {
    console.error("Database initialization error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

import redis from './redis.js'; // Ensure redis is imported at the top of your file

// 3. High-Performance Cache-Aside Wrap Metrics Route
app.get('/api/users/:id/wrap', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const cacheKey = `user:wrap:${userId}`;

  try {
    // 1. Attempt to pull calculations from fast Redis memory cache
    const cachedMetrics = await redis.get(cacheKey);

    if (cachedMetrics) {
      console.log(`🎯 >>> CACHE HIT! Serving metrics for User #${userId} from Redis RAM memory.`);
      return res.json({
        source: "Redis Cache Layer",
        data: JSON.parse(cachedMetrics)
      });
    }

    // 2. CACHE MISS: Simulated heavy relational database math query to PostgreSQL
    console.log(`🐢 >>> CACHE MISS! Re-calculating heavy database metrics from PostgreSQL for User #${userId}...`);
    
    // (In a complete application, we would run: await pool.query(...) here)
    // We will generate an interview-grade mock computation payload for testing:
    const calculatedMetrics = {
      userId: Number(userId),
      total_watch_time_minutes: 4280, // Around 71 hours of MCU content
      favorite_phase: "Phase 3 (Infinity Saga)",
      top_hero_persona: "Iron Man (Strategic Technologist)",
      movies_logged_count: 23,
      generated_at: new Date().toISOString()
    };

    // 3. Save a copy of this result inside Redis with a 60-second Time-to-Live (TTL)
    // We use 60 seconds here so you can easily witness it expire during testing!
    await redis.setex(cacheKey, 60, JSON.stringify(calculatedMetrics));

    // 4. Return the freshly calculated data to the user
    res.json({
      source: "PostgreSQL Database Compute",
      data: calculatedMetrics
    });

  } catch (error: any) {
    console.error("Metrics engine failure:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start listening for incoming web requests
app.listen(PORT, () => {
  console.log(`⚡ Server running successfully at: http://localhost:${PORT}`);
});