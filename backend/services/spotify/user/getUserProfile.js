const spotifyClient = require('../../../api/spotifyClient');
const logger = require('../../../lib/logger');
const als = require('../../../utils/alsContext');
const { withSpan } = require('../../../lib/telemetry');
const redisClient = require('../../../infrastructure/redis/redisClient');

async function getUserProfile(access_token = null) {
    logger.info({ action: 'getUserProfile' }, 'Fetching user profile from Spotify');

    return withSpan('getUserProfile', {}, async (span) => {
        const { userId } = als.getStore() ?? {};
        const cacheKey = `user:${userId}:profile`;

        // Skip cache during login callback (no ALS/userId yet)
        if (userId) {
            const cached = await redisClient.get(cacheKey);
            if (cached) {
                span.setAttribute('cache', 'hit');
                return JSON.parse(cached);
            }
        }

        const config = access_token
            ? { headers: { Authorization: `Bearer ${access_token}` } }
            : {};

        const userProfile = await withSpan('spotify.getUserProfile',
            {}, () => spotifyClient.get('/me', config));

        if (userId) {
            await redisClient.setEx(cacheKey, 300, JSON.stringify(userProfile.data)); // 5 min
            span.setAttribute('cache', 'miss');
        }

        return userProfile.data;
    });
}

module.exports = getUserProfile;