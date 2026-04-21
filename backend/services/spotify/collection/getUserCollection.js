const getLoggerContext = require('../../../utils/getLoggerContext');

const spotifyClient = require('../../../api/axiosConfig');
const getUserTracks = require('../tracks/getUserTracks');
const getUserEpisodes = require('../episodes/getUserEpisodes');

// Fetches user playlists and aggregates with tracks and episodes
async function getUserCollection(){
    const logger = getLoggerContext({action: 'getUserCollection'});
    logger.info('Fetching user collection from Spotify');

    const [playlists, tracks, episodes] = await Promise.all([
        spotifyClient.get('/me/playlists'),
        getUserTracks(),
        getUserEpisodes()
    ]);

    const response = {
        episodes: {
            href: episodes?.href ?? null,
            total: episodes?.total ?? 0,
    },
        tracks: {
            href: tracks?.href ?? null,
            total: tracks?.total ?? 0,
    },
        playlists: playlists?.data?.items ?? [],
    };

    return response;
};

module.exports = getUserCollection;