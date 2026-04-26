const logger = require('../../../utils/logger');
const axios = require('axios');

async function getTrackPreviewAudio(isrc){
    logger.info({action: 'getTrackPreviewAudio '}, 'Fetching track preview audio from Deezer');

    const previewAudio = await axios.get(`https://api.deezer.com/track/isrc:${isrc}`);
    
    return previewAudio?.data.preview;
}

module.exports = getTrackPreviewAudio;