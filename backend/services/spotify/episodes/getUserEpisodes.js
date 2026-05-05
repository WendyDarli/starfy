const spotifyClient = require('../../../api/spotifyClient');
const logger = require('../../../lib/logger');


async function getUserEpisodes() {
    logger.info({action: 'getUserEpisodes'}, 'Fetching user episodes from Spotify');

    const userEpisodes = await spotifyClient.get('/me/episodes');
    return userEpisodes.data;
}

module.exports = getUserEpisodes;