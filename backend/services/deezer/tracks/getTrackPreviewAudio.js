const getLoggerContext = require('../../../utils/getLoggerContext');
const axios = require('axios');

async function getTrackPreviewAudio(isrc){
    const logger = getLoggerContext({action: 'getTrackPreviewAudio '});
    logger.info('Fetching track preview audio from Deezer');

    const previewAudio = await axios.get(`https://api.deezer.com/track/isrc:${isrc}`);
    
    return previewAudio?.data.preview;
}

module.exports = getTrackPreviewAudio;