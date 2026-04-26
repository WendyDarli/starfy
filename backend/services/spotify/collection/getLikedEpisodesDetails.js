const formatSpotifyData = require('../../../utils/formatSpotifyData');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');
const logger = require('../../../utils/logger');

const getUserEpisodes = require('../episodes/getUserEpisodes');
const getUserProfile = require('../user/getUserProfile');

async function getLikedEpisodesDetails() {
    logger.info({action: 'getLikedEpisodesDetails'}, 'Fetching user liked episodes page data');

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

module.exports = getLikedEpisodesDetails;