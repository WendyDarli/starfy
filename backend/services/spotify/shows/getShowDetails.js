const spotifyClient = require('../../../api/axiosConfig');
const checkFavoriteStatus = require('../../../utils/checkFavoriteStatus');
const formatSpotifyData = require('../../../utils/formatSpotifyData');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');
const logger = require('../../../utils/logger');

async function getShowDetails(id) {
    logger.info({showId: id, action: 'getShowDetails'}, 'Fetching show from Spotify');

    const [showData, showEpisodes] = await Promise.all([
        spotifyClient.get(`/shows/${id}`),
        spotifyClient.get(`/shows/${id}/episodes?limit=50`)
    ]);

    let items = formatSpotifyItems(showEpisodes.data.items, item => ({
        isFavorite: false
    }));

    const response = formatSpotifyData({
        title: 'Podcast Show',
        name: showData?.data?.name ?? 'Show Name',
        images: showData?.data?.images ?? [],
        owner: showData?.data?.publisher ?? 'Unknow',
        total: showEpisodes.data?.total ?? items?.length ?? 0,
        followers: null,
        items: items,
    });

    return response;
};

module.exports = getShowDetails;