const axios = require('axios');
const getLoggerContext = require('../../utils/getLoggerContext');

async function getLyrics(query) {
    const logger = getLoggerContext({action: 'getLyrics'});
    logger.info('Fetching track lyrics from irclib');

    const lyrics = await axios.get('https://lrclib.net/api/get', {
                       params: query,
                    });

    return lyrics?.data?.plainLyrics;
};

module.exports = getLyrics;