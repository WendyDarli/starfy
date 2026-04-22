const getUserCollection = require('../services/spotify/collection/getUserCollection');
const getLikedTracksDetails = require('../services/spotify/collection/getLikedTracksDetails');
const getLikedEpisodesDetails = require('../services/spotify/collection/getLikedEpisodesDetails');
const asyncHandler = require('../utils/asyncHandler');

// Get user library summary for sidebar (playlists, tracks, episodes)
const collection_get = asyncHandler(async (req, res, next) => {
    const response = await getUserCollection();
    return res.json(response);
});

// User library related fetches:

// Get saved favorite songs
const likedSongs_get = asyncHandler(async (req, res, next) => {
    const response = await getLikedTracksDetails();
    return res.json(response);
});

// Get saved episodes 
const likedEpisodes_get = asyncHandler(async (req, res, next) => {
    const response = await getLikedEpisodesDetails();
    return res.json(response);
});


module.exports = { collection_get, likedSongs_get, likedEpisodes_get };