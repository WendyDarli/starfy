const redisClient =  require('../../infrastructure/redis/redisClient');
const axios = require('axios');

//this fn checks if token is valid, if not it refreshes the token and saves it to redis
async function ensureValidSpotifyToken(userId){
  const accessToken = await redisClient.get(`tokens:user:${userId}:access_token`);
  const refreshToken = await redisClient.get(`tokens:user:${userId}:refresh_token`);

  try{
      await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return accessToken;

  } catch(err){

    try{
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      });

      const response = await axios.post('https://accounts.spotify.com/api/token', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const new_access_token = response.data.access_token;
      await redisClient.set(`tokens:user:${userId}:access_token`, new_access_token, 'EX', 3600);
      return new_access_token;
    }catch(err){
      throw new AppError('Session expired. Please log in again.', 401);
    }
  }
};

module.exports = { ensureValidSpotifyToken };