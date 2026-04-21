const spotifyClient = require('../../../api/axiosConfig');
const getLoggerContext = require('../../../utils/getLoggerContext');


async function getUserProfile() {
    const logger = getLoggerContext({ action: 'getUserTracks' });
    logger.info('Fetching user profile from Spotify');

    const userProfile = await spotifyClient.get('me');
    return userProfile.data;
};

module.exports = getUserProfile;