const asyncHandler = require('../utils/asyncHandler');
const getAlbumDataWithTracks = require('../services/spotify/getAlbumDataWithTracks');

const album_get = asyncHandler(async (req, res, next) => {
    const response = await getAlbumDataWithTracks(req.params.id);
    return res.json(response);
});

module.exports = { album_get };