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

module.exports = { song_get };