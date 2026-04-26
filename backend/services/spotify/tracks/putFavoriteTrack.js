const spotifyClient = require('../../../api/axiosConfig');
const logger = require('../../../utils/logger');

async function putFavoriteTrack(id) {
    logger.info({trackId: id, action: 'putFavoriteTrack'}, 'Adding track to Spotify favorites');

    const putTrack = await spotifyClient.put('/me/tracks', {
        ids: [id]
    });
    
    return { success: true };
}

module.exports = putFavoriteTrack;