import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Redis client using your environment URL configurations
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redis.on('connect', () => {
  console.log('⚡ Successfully connected to the ultra-fast Redis Cache!');
});

redis.on('error', (err) => {
  console.error('❌ Redis Connection Error:', err);
});

export default redis;