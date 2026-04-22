const spotifyClient = require('../../../api/axiosConfig');
const getLoggerContext = require('../../../utils/getLoggerContext');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');
const formatSpotifyData = require('../../../utils/formatSpotifyData');
const checkFavoriteStatus = require('../../../utils/checkFavoriteStatus');

async function getPlaylistDetails(id) {
    const logger = getLoggerContext({playlistId: id, action: 'getPlaylistDetails'})
    logger.info('Fetching playlist data from Spotify');

    const [playlistData, playlistTracks] = await Promise.all([
        await spotifyClient.get(`/playlists/${id}`),
        await spotifyClient.get(`/playlists/${id}/tracks?limit=50`)
    ]);


    let items = formatSpotifyItems(playlistTracks.data.items, item => ({
            isFavorite: false
    }));

    items = await checkFavoriteStatus(items);

    const response = formatSpotifyData({
        title: 'Playlist',
        name: playlistData?.data?.name ?? 'Playlist Name',
        images: playlistData?.data?.images ?? [],
        owner: playlistData?.data?.owner?.display_name ?? 'Unknow',
        total: playlistTracks?.data?.total ?? 0,
        followers: null,
        playlistId: playlistData?.data?.id ?? null,
        items: items,
    });
    
    return response;
};

module.exports = getPlaylistDetails;