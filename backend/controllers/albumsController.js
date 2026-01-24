const { formatSpotifyData } = require('../utils/formatSpotifyData');
const spotifyApi = require('../config/axiosConfig');

async function album_get(req, res){
    try{
        const id = req.params.id;
                
        const albumData = await spotifyApi.get(`/albums/${id}`);
        const albumTracks = await spotifyApi.get(`/albums/${id}/tracks?limit=50`);
        
        const items = albumTracks.data.items.map(i => ({
            ...i,
            artists: i.artists.map(a => ({
                name: a.name,
                id:a.id
            })),
            added_at: null,
            albumOrShow: null, 
            imageUrl: null 
        }));

        const response = formatSpotifyData({
            title: 'Album',
            name: albumData.data.name,
            images: albumData.data.images,
            owner: albumData.data.artists?.[0]?.name,
            total: albumTracks.data.total,
            followers: null,
            items: items
        });
        return res.json(response);
        
    }catch(err){
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || err.message || 'Error fetching albums.',
        });
    };
};

module.exports = { album_get };