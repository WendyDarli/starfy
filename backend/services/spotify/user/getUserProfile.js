const spotifyClient = require('../../../api/spotifyClient');
const logger = require('../../../lib/logger');
const als = require('../../../utils/alsContext');

async function getUserProfile(access_token = null) {
    logger.info({ action: 'getUserProfile' }, 'Fetching user profile from Spotify');

    // During login callback, ALS isn't set up yet so we pass token directly
    const config = access_token
        ? { headers: { Authorization: `Bearer ${access_token}` } }
        : {};

    const userProfile = await spotifyClient.get('me', config);
    return userProfile.data;
}

module.exports = getUserProfile;