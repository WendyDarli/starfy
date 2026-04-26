const spotifyClient = require('../../../api/axiosConfig');
const formatSpotifyData = require('../../../utils/formatSpotifyData');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');
const logger = require('../../../utils/logger');

async function getTrack(id) {
    logger.info({trackId: id, action: 'getTrack'}, 'Fetching track from Spotify');

    const track = await spotifyClient.get(`/tracks/${id}`);

    const items = formatSpotifyItems(
        [track?.data],
        () => ({})
    );

    const response = formatSpotifyData({
        title: 'Song',
        name: track?.data?.name ?? 'Song Name',
        images: track?.data?.album.images ?? [],
        owner: track?.data?.artists?.[0]?.name ?? 'Unknow',
        total: null,
        followers: null,
        items: items,
    });
    return response;
}

module.exports = getTrack;