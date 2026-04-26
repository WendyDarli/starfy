const spotifyClient = require('../../../api/axiosConfig');
const logger = require('../../../utils/logger');


async function getUserProfile() {
    logger.info({action: 'getUserProfile'}, 'Fetching user profile from Spotify');

    const userProfile = await spotifyClient.get('me');
    return userProfile.data;
};

module.exports = getUserProfile;