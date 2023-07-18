import { createClient } from 'redis';
import { promisify } from 'util';

const isRedisEnabled =false;

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export const redisSetAsync = () => {
  if (isRedisEnabled) {
    return promisify(redisClient.set).bind(redisClient);
  }
  return () => null;
};
export const redisGetAsync = () => {
  if (isRedisEnabled) {
    return promisify(redisClient.get).bind(redisClient);
  }
  return () => null;
};
