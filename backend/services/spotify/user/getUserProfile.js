const spotifyClient = require('../../../api/axiosConfig');
const logger = require('../../../utils/logger');


async function getUserProfile(access_token) {
    logger.info({action: 'getUserProfile'}, 'Fetching user profile from Spotify');

    const userProfile = await spotifyClient.get('me', {
       headers: { Authorization: `Bearer ${access_token}` },
    });
    return userProfile.data;
};

module.exports = getUserProfile;