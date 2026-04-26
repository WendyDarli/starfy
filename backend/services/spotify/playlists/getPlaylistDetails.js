const spotifyClient = require('../../../api/axiosConfig');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');
const formatSpotifyData = require('../../../utils/formatSpotifyData');
const checkFavoriteStatus = require('../../../utils/checkFavoriteStatus');
const logger = require('../../../utils/logger');

async function getPlaylistDetails(id) {
    logger.info({playlistId: id, action: 'getPlaylistDetails'}, 'Fetching playlist data from Spotify');

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