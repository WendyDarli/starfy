const getLoggerContext = require('../../../utils/getLoggerContext');
const spotifyClient = require('../../../api/axiosConfig');
const formatSpotifyData = require('../../../utils/formatSpotifyData');
const formatSpotifyItems = require('../../../utils/formatSpotifyItems');

async function getEpisode(id){
    const logger = getLoggerContext({episodeId: id, action: 'getEpisode'});
    logger.info('Fetching episode from Spotify');

    const episode = await spotifyClient.get(`/episodes/${id}`);

    let items = formatSpotifyItems([episode.data], item => ({
        isFavorite: false
    }));

    const response = formatSpotifyData({
        title: 'Podcast Episode',
        name: episode?.data?.name ?? 'Episode Name',
        images: episode?.data?.images ?? [],
        owner: episode?.data?.show?.publisher ?? null,
        total: null,
        followers: null,
        items: items,
    });

    return response;
}

module.exports = getEpisode;