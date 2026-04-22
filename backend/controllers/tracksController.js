const { default: axios } = require('axios');
const spotifyClient = require('../api/axiosConfig');
const formatSpotifyData = require('../utils/formatSpotifyData');
const asyncHandler = require('../utils/asyncHandler')
const getTrack = require('../services/spotify/tracks/getTrack');
const getTrackPreviewAudio = require('../services/deezer/tracks/getTrackPreviewAudio.js');
const deleteFavoriteTrack = require('../services/spotify/tracks/deleteFavoriteTrack.js')
const putFavoriteTrack = require('../services/spotify/tracks/putFavoriteTrack.js')

const track_get = asyncHandler(async (req, res, next) => {
    const response = await getTrack(req.params.id);
    return res.json(response);
});

// Get 30s Preview URL
const track_audio_get = asyncHandler(async (req, res, next) => {
    const response = await getTrackPreviewAudio(req.params.isrc);
    return res.json(response);
});

const put_favorite_track = asyncHandler(async (req, res, next) => {  
    const response = await putFavoriteTrack(req.body.id);
    return res.json(response);
});

const delete_favorite_track = asyncHandler(async (req, res, next) => {
    const response = await deleteFavoriteTrack(req.body.id);
    return res.json(response);
});

module.exports = { track_get, track_audio_get, put_favorite_track , delete_favorite_track };
