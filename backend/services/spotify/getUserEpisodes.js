const getLoggerContext = require('../../utils/getLoggerContext');
const spotifyClient = require('../../api/axiosConfig');


async function getUserEpisodes(){
    const logger = getLoggerContext({action: 'getUserEpisodes'});
    logger.info('Fetching user episodes from Spotify');

    const userEpisodes = await spotifyClient.get('/me/episodes');
    return userEpisodes.data;
}

module.exports = getUserEpisodes;