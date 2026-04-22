const { default: axios } = require('axios');
const spotifyClient = require('../api/axiosConfig');
const formatSpotifyData = require('../utils/formatSpotifyData');
const asyncHandler = require('../utils/asyncHandler')
const getTrack = require('../services/spotify/tracks/getTrack');

const track_get = asyncHandler(async (req, res) => {
    const response = await getTrack(req.params.id);
    return res.json(response);
});

async function track_audio_get(req, res, next){
    try{
        if(!req.params.isrc) return
        const isrcId = req.params.isrc;
 
        const audioRes = await axios.get(`https://api.deezer.com/track/isrc:${isrcId}`);
        const previewUrl = audioRes.data.preview;

       res.json(previewUrl)

    } catch(err){
        console.error('error in the song_audio_get ', err.message);
        res.status(500).json({ error: 'Failed get song audio', details: err.message });
    }

}

async function put_favorite_track(req, res){
    try{
        const { id } = req.body;
        const saveFavoriteSong = await spotifyClient.put('/me/tracks', {
            ids: [id]
        });
        res.json(saveFavoriteSong.data);

    } catch(err){
        console.error('error in the put_favorite_song', err.message)
        res.status(500).json({ error: 'Failed to save favorite song', details: err.message });
    };
};

async function delete_favorite_track(req, res){
    try{
        const id = req.body.id;
        const deleteFavoriteSong = await spotifyClient.delete('/me/tracks', {
            data: { ids: [id] },
        });
        res.json(deleteFavoriteSong.data);

    } catch(err){
        console.error('error in the delete_favorite_song', err.message)
        res.status(500).json({ error: 'Failed to remove favorite song', details: err.message });
    };
};

module.exports = { track_get, track_audio_get, put_favorite_track , delete_favorite_track };
