import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

let redis: any = null;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
  
  redis.on('connect', () => {
    console.log('⚡ Successfully connected to the cloud Redis Cache!');
  });

  redis.on('error', (err: any) => {
    console.error('❌ Redis Error:', err);
  });
} else {
  console.warn('⚠️ No REDIS_URL provided. App is running without caching middleware layer.');
}

export default redis;