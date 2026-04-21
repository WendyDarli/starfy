const getLoggerContext = require('../../utils/getLoggerContext');
const spotifyClient = require('../../api/axiosConfig');


async function getUserTracks(){
    const logger = getLoggerContext({action: 'getUserTracks'});
    logger.info('Fetching user tracks from Spotify');

    const userTracks = await spotifyClient.get('/me/tracks');
    return userTracks.data;
}

module.exports = getUserTracks;