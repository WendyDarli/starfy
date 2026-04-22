const asyncHandler = require('../utils/asyncHandler');
const getPlaylistDataWithTracks = require('../services/spotify/playlists/getPlaylistDataWithTracks')

async function playlist_get(req, res, next){
    const response = await getPlaylistDataWithTracks(req.params.id);
    res.json(response);
};

module.exports = { playlist_get };