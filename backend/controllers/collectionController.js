const spotifyClient = require('../api/axiosConfig');
const getUserCollection = require('../services/spotify/collection/getUserCollection');
const getLikedSongsPage = require('../services/spotify/collection/getLikedSongsPage');
const getLikedEpisodesPage = require('../services/spotify/collection/getLikedEpisodesPage');

const asyncHandler = require('../utils/asyncHandler');
const formatSpotifyData = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');

// Get user library summary for sidebar (playlists, tracks, episodes)
const collection_get = asyncHandler(async (req, res, next) => {
    const response = await getUserCollection();
    return res.json(response);
});

// User library related fetches:

// Get saved favorite songs
const likedSongs_get = asyncHandler(async (req, res, next) => {
    const response = await getLikedSongsPage();
    return res.json(response);
});

// Get saved episodes 
const likedEpisodes_get = asyncHandler(async (req, res, next) => {
    const response = await getLikedEpisodesPage();
    return res.json(response);
});


module.exports = { collection_get, likedSongs_get, likedEpisodes_get };