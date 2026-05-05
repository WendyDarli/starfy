const als = require('../utils/alsContext');
const redisClient = require('../infrastructure/redis/redisClient');
const { refreshSpotifyToken } = require('../services/spotify/refreshSpotifyToken');

module.exports = async (req, res, next) => {
    const userId = req.session?.userId;
    if (!userId) return res.redirect('/login');

    try {
        const key = `tokens:user:${userId}:access_token`;
        let token = await redisClient.get(key);

        const ttl = await redisClient.ttl(key);
        // Check TTL, refresh proactively if under 5 minutes left
        if (!token || ttl < 0 || ttl < 300) {
            token = await refreshSpotifyToken(userId);
        }

        als.enterWith({ userId, token });
        next();
    } catch (err) {
        console.error('authGuard error:', err.message);
        res.redirect('/login');
    }
};