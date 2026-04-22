const asyncHandler = require('../utils/asyncHandler');
const getArtistDetails = require('../services/spotify/artists/getArtistDetails');

const artist_get = asyncHandler(async (req, res, next) => {
    const response = await getArtistDetails(req.params.id);
    return res.json(response);
});

module.exports = { artist_get };