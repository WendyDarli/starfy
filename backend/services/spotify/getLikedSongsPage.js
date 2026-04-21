const formatSpotifyData = require('../../utils/formatSpotifyData');
const formatSpotifyItems = require('../../utils/formatSpotifyItems');
const getLoggerContext = require('../../utils/getLoggerContext');

const getUserTracks = require('./getUserTracks');
const getUserProfile = require('./getUserProfile');

async function getLikedSongsPage(){
    const logger = getLoggerContext({action: 'getLikedSongsPage'})
    logger.info('Fetching user liked songs page data');

    const [me, userTracks] = await Promise.all([
        getUserProfile(),
        getUserTracks()
    ]);

    const items = formatSpotifyItems(userTracks?.items, item => ({
        isFavorite: true
    }));

    const response = formatSpotifyData({
        title: 'Playlist',
        name: 'Liked Songs',
        images: [],
        owner: me?.display_name ?? 'User',
        total: userTracks?.total ?? 0,
        followers: null,
        playlistId: 'tracks',
        items,
    });

    return response;
}

module.exports = getLikedSongsPage;