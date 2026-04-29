const logger = require('../../utils/logger');
const redisClient = require('../../infrastructure/redis/redisClient');

async function storeSpotifyTokens(userId, access_token, refresh_token ){
    await Promise.all([
        redisClient.set(`tokens:user:${userId}:access_token`, access_token, { EX: 3600 }),
        redisClient.set(`tokens:user:${userId}:refresh_token`, refresh_token),
    ]);
};

module.exports = storeSpotifyTokens;