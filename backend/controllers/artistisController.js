const asyncHandler = require('../utils/asyncHandler');
const getArtistWithTopTracks = require('../services/spotify/artists/getArtistWithTopTracks');

const artist_get = asyncHandler(async (req, res, next) => {
    const response = await getArtistWithTopTracks(req.params.id);
    return res.json(response);
});

module.exports = { artist_get };