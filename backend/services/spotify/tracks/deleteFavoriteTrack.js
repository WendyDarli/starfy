const spotifyClient = require('../../../api/axiosConfig');
const logger = require('../../../utils/logger');

async function deleteFavoriteTrack(id) {
    logger.info({trackId: id, action: 'deleteFavoriteTrack'}, 'Deleting track from Spotify favorites');

    const deleteTrack = await spotifyClient.delete('/me/tracks', {
        data: { ids: [id] }
    });
    
    return { success: true }
}

module.exports = deleteFavoriteTrack;