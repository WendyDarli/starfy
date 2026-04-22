const asyncHandler = require('../utils/asyncHandler');
const getAlbumDetails = require('../services/spotify/albums/getAlbumDetails');

const album_get = asyncHandler(async (req, res, next) => {
    const response = await getAlbumDetails(req.params.id);
    return res.json(response);
});

module.exports = { album_get };