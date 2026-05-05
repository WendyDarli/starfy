const redisClient = require('../../infrastructure/redis/redisClient');
const axios = require('axios');
const { UnauthorizedError } = require('../../errors/appError');

async function refreshSpotifyToken(userId) {
    try {
        const refreshToken = await redisClient.get(`tokens:user:${userId}:refresh_token`);

        if (!refreshToken) {
            throw new UnauthorizedError('No refresh token found. Please log in again.');
        }

        const params = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        });

        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const newAccessToken = response.data.access_token;
        await redisClient.set(`tokens:user:${userId}:access_token`, newAccessToken, { EX: 3600 });
        return newAccessToken;

    } catch (err) {
        if (err instanceof UnauthorizedError) throw err;
        throw new UnauthorizedError('Session expired. Please log in again.');
    }
}

module.exports = { refreshSpotifyToken };