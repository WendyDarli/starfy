const spotifyClient = require('../../../api/axiosConfig');
const logger = require('../../../utils/logger');


async function getUserEpisodes() {
    logger.info({action: 'getUserEpisodes'}, 'Fetching user episodes from Spotify');

    const userEpisodes = await spotifyClient.get('/me/episodes');
    return userEpisodes.data;
}

module.exports = getUserEpisodes;