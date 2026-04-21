const formatSpotifyData = require('../../utils/formatSpotifyData');
const formatSpotifyItems = require('../../utils/formatSpotifyItems');
const getLoggerContext = require('../../utils/getLoggerContext');

const getUserEpisodes = require('./getUserEpisodes');
const getUserProfile = require('./getUserProfile');

async function getLikedEpisodesPage(){
    const logger = getLoggerContext({action: 'getLikedEpisodesPage'})
    logger.info('Fetching user liked episodes page data');

    const [me, userEpisodes] = await Promise.all([
        getUserProfile(),
        getUserEpisodes()
    ]);

    const items = formatSpotifyItems(userEpisodes?.items, item => ({
        isFavorite: true
    }));

    const response = formatSpotifyData({
        title: 'Playlist',
        name: 'Your Episodes',
        images: [],
        owner: me?.display_name,
        total: userEpisodes?.total,
        followers: null,
        isArtistPage: false,
        showAlbum: false,
        showDateAdded: true,
        items: items,   
    });

    return response;
}

module.exports = getLikedEpisodesPage;