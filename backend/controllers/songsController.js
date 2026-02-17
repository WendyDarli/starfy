const { default: axios } = require('axios');
const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

async function song_get(req, res){
    try{
        const id = req.params.id;
        const songData = await spotifyApi.get(`/tracks/${id}`);
        
        const items = [{
            ...songData.data,
            artists: songData.data.artists.map(a => ({ name: a.name, id: a.id })),
            added_at: null,
            albumOrShow: songData.data.album,
            imageUrl: songData.data.album.images[0]?.url
            }];

        const response = formatSpotifyData({
            title: 'Song',
            name: songData.data.name,
            images: songData.data.album.images,
            owner: songData.data.artists?.[0]?.name,
            total: null,
            followers: null,
            items: items,
        });
        return res.json(response);
        
    }catch(err){
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || 'Error fetching user playlist songs.',
        });
    };
};

async function song_audio_get(req, res, next){
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

async function put_favorite_song(req, res){
    try{
        const { id } = req.body;
        const saveFavoriteSong = await spotifyApi.put('/me/tracks', {
            ids: [id]
        });
        res.json(saveFavoriteSong.data);

    } catch(err){
        console.error('error in the put_favorite_song', err.message)
        res.status(500).json({ error: 'Failed to save favorite song', details: err.message });
    };
};

async function delete_favorite_song(req, res){
    try{
        const id = req.body.id;
        const deleteFavoriteSong = await spotifyApi.delete('/me/tracks', {
            data: { ids: [id] },
        });
        res.json(deleteFavoriteSong.data);

    } catch(err){
        console.error('error in the delete_favorite_song', err.message)
        res.status(500).json({ error: 'Failed to remove favorite song', details: err.message });
    };
};

module.exports = { song_get, song_audio_get, put_favorite_song , delete_favorite_song };
