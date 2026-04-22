const asyncHandler = require('../utils/asyncHandler');
const getPlaylistDetails = require('../services/spotify/playlists/getPlaylistDetails')

async function playlist_get(req, res, next){
    const response = await getPlaylistDetails(req.params.id);
    return res.json(response);
};

module.exports = { playlist_get };