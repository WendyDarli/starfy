const getLoggerContext = require('../../../utils/getLoggerContext');
const spotifyClient = require('../../../api/axiosConfig');

async function deleteFavoriteTrack(id){
    const logger = getLoggerContext({trackId: id, action: 'deleteFavoriteTrack'});
    logger.info('Deleting track from Spotify favorites');

    const deleteTrack = await spotifyClient.delete('/me/tracks', {
        data: { ids: [id] }
    });
    
    return { success: true }
}

module.exports = deleteFavoriteTrack;