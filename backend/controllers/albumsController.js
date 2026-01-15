const axios = require('axios');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

async function album_get(req, res){
    try{
        const id = req.params.id;
        const accessToken = req.user.tokens.access_token;
        const headers = { Authorization: `Bearer ${accessToken}` };
        
        const albumData = await axios.get(`https://api.spotify.com/v1/albums/${id}`, { headers });
        const albumTracks = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks?limit=50`, { headers });
        
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
            isArtistPage: false,
            showAlbum: false,
            showDateAdded: false,
            items: items
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

module.exports = { album_get };