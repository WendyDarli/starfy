const getLoggerContext = require('../../../utils/getLoggerContext');
const spotifyClient = require('../../../api/axiosConfig');

async function putFavoriteTrack(id){
    const logger = getLoggerContext({trackId: id, action: 'putFavoriteTrack'});
    logger.info('Adding track to Spotify favorites');

    const putTrack = await spotifyClient.put('/me/tracks', {
        ids: [id]
    });
    
    return { success: true };
}

module.exports = putFavoriteTrack;