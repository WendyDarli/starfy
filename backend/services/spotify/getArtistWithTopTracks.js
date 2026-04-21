const spotifyClient = require("../../api/axiosConfig");
const checkFavoriteStatus = require('../../utils/checkFavoriteStatus');
const formatSpotifyData = require('../../utils/formatSpotifyData');
const formatSpotifyItems = require('../../utils/formatSpotifyItems');
const getLoggerContext = require('../../utils/getLoggerContext');

async function getArtistWithTopTracks(id){
    const logger = getLoggerContext({ artistId: id, action: 'getArtistWithTopTracks' });
    logger.info('Fetching artist data from Spotify');

    
    const [artistData, artistTopTracks] = await Promise.all([
        spotifyClient.get(`/artists/${id}`),
        spotifyClient.get(`/artists/${id}/top-tracks?market=US`)
    ]);

    let items = formatSpotifyItems(artistTopTracks?.data?.tracks, item => ({
        isFavorite: false
    }));

    items = await checkFavoriteStatus(items);

        const response = formatSpotifyData({
            title: 'Artist',
            name: artistData?.data?.name ?? 'Unknown',
            images: artistData?.data?.images ?? [],
            owner: artistData?.data?.name ?? 'Unknown',
            total: null,
            followers: artistData?.data?.followers?.total ?? 0,
            items,
        });
    return response;
};



module.exports = getArtistWithTopTracks;
