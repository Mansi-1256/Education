import Redis from 'ioredis';

// Create a Redis client
const redisURL = process.env.REDIS_ENDPOINT
// const redisClient = new Redis(redisURL);
export default redisURL;