const spotifyClient = require('../../../api/axiosConfig');
const logger = require('../../../utils/logger');


async function getUserTracks() {
    logger.info({action: 'getUserTracks'}, 'Fetching user tracks from Spotify');

    const userTracks = await spotifyClient.get('/me/tracks?limit=50');
    return userTracks.data;
}

module.exports = getUserTracks;