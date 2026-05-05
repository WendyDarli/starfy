const spotifyClient = require('../../../api/spotifyClient');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');
const formatSpotifyData = require('../../../utils/formatSpotifyData');
const checkFavoriteStatus = require('../../../utils/checkFavoriteStatus');
const logger = require('../../../lib/logger');
const { withSpan } = require('../../../lib/telemetry');

async function getPlaylistDetails(id) {
    const playlistFields = 'name,images,owner(display_name), followers(total)';
    const tracksFields =
        'total,items(added_at,track(id,name,uri,duration_ms,artists(id,name),album(id,name,images)))';

    return withSpan('getPlaylistDetails', { 'playlist.id': id }, async (span) => {

        const [playlistData, playlistTracks] = await withSpan('spotify.getPlaylist', {}, () =>
            Promise.all([
                spotifyClient.get(`/playlists/${id}?fields=${playlistFields}`),
                spotifyClient.get(`/playlists/${id}/tracks?limit=50&fields=${tracksFields}`),
            ])
        );

    const items = await withSpan('formatItems', {}, () =>
        formatSpotifyItems(playlistTracks.data.items, () => ({ isFavorite: false }))
    );

    const enrichedItems = await withSpan('checkFavoriteStatus', {}, () =>
        checkFavoriteStatus(items)
    );

    span.setAttribute('playlist.trackCount', enrichedItems.length);

    return formatSpotifyData({
        title: 'Playlist',
        name: playlistData?.data?.name ?? 'Playlist Name',
        images: playlistData?.data?.images ?? [],
        owner: playlistData?.data?.owner?.display_name ?? 'Unknown',
        total: playlistTracks?.data?.total ?? 0,
        followers: playlistData?.data?.followers?.total ?? 0,
        playlistId: playlistData?.data?.id ?? null,
        items: enrichedItems,
    }); 
  });
}

module.exports = getPlaylistDetails;