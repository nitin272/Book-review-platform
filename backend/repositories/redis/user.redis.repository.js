import { client } from '../../infrasturcture/redisConnection.js';

export async function storeUserDataRedis(email, userData) {
  try {
    const redisKey = `user:${email}`;

    await client.hSet(redisKey, {
      _id: userData._id.toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  } catch (error) {
    console.error('Error storing user data:', error);
  }
}



export async function getUserDataFromRedis(email) {
  try {
    const redisKey = `user:${email}`;
    const userData = await client.hGetAll(redisKey);

    if (Object.keys(userData).length === 0) {
      return null;
    }

    return {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      password: userData.password
    };
  } catch (error) {
    console.error('Error retrieving user data from Redis:', error);
    return null;
  }
}
