const spotifyClient = require('../../../api/axiosConfig');
const checkFavoriteStatus = require('../../../utils/checkFavoriteStatus');
const formatSpotifyData = require('../../../utils/formatSpotifyData');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');
const getLoggerContext = require('../../../utils/getLoggerContext');

async function searchTracks(query, page){
    const logger = getLoggerContext({action: 'searchTracks'});
    logger.info('Searching tracks from Spotify');

    const searchResults = await spotifyClient.get('/search', {
        params: {
            q: query, 
            type: 'track',
            limit: 20,
            offset: page * 20
        }
    });

    let items = formatSpotifyItems(searchResults?.data?.tracks?.items, item => ({
        isFavorite: false
    }));

    items = await checkFavoriteStatus(items);
    const response = formatSpotifyData({
        items: items
    });
    
    return {
        ...response,
        pagination: {
            currentPage: page,
            hasMore: searchResults?.data?.tracks?.next !== null
    }};
};

module.exports = searchTracks;