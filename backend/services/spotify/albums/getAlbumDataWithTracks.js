const formatSpotifyData = require('../../../utils/formatSpotifyData');
const spotifyClient = require('../../../api/axiosConfig');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');
const checkFavoriteStatus = require('../../../utils/checkFavoriteStatus')
const getLoggerContext = require('../../../utils/getLoggerContext');

async function getAlbumDataWithTracks(id){
    const logger = getLoggerContext({albumsId: id, action: 'getAlbumDataWithTracks'})
    logger.info('Fetching album data from Spotify');

    const [albumData, albumTracks] = await Promise.all([
        spotifyClient.get(`/albums/${id}`),
        spotifyClient.get(`/albums/${id}/tracks?limit=50`)
    ])
    
    let items = formatSpotifyItems(albumTracks.data.items, item => ({
        isFavorite: false
    }));

    items = await checkFavoriteStatus(items);

    const response = formatSpotifyData({
        title: 'Album',
        name: albumData?.data?.name ?? 'Unknow',
        images: albumData?.data?.images ?? [],
        owner: albumData?.data?.artists?.[0]?.name ?? 'Unknow',
        total: albumTracks?.data?.total ?? 0,
        followers: null,
        items: items
    });

    return response;
};

module.exports = getAlbumDataWithTracks;

