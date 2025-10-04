import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST ,
    port: parseInt(process.env.REDIS_PORT) 
  },
  username: process.env.REDIS_USERNAME ,
  password: process.env.REDIS_PASSWORD 
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('ready', () => {
  console.log('Redis client ready');
});

async function connectRedis() {
  try {
    if (!client.isOpen) {
      await client.connect();
      console.log('Connected to Redis Cloud successfully');
  
      await client.set('connection_test', 'success');
      const testResult = await client.get('connection_test');
      console.log('Redis connection test:', testResult);
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error;
  }
}

export {client, connectRedis};
