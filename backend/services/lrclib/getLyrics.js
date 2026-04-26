const axios = require('axios');
const logger = require('../../utils/logger');

async function getLyrics(query) {
    logger.info({action: 'getLyrics'}, 'Fetching track lyrics from irclib');

    const lyrics = await axios.get('https://lrclib.net/api/get', {
                       params: query,
                    });

    return lyrics?.data?.plainLyrics;
};

module.exports = getLyrics;