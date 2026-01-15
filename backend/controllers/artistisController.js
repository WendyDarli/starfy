const axios = require('axios');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

async function artist_get(req, res){
    try{
        const id = req.params.id;
        const accessToken = req.user.tokens.access_token;
        const headers = { Authorization: `Bearer ${accessToken}` };
        
        const artistData = await axios.get(`https://api.spotify.com/v1/artists/${id}`, { headers });
        const artistTopTracks = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, { headers });
        
        const items = artistTopTracks.data.tracks.map(i => ({
            ...i,
            artists: i.artists.map(a => ({
                name: a.name,
                id:a.id
            })),
            added_at: null,
            albumOrShow: null, 
            imageUrl: i.album?.images?.[0]?.url || null 
        }));

        const response = formatSpotifyData({
            title: 'Artist',
            name: artistData.data.name,
            images: artistData.data.images,
            owner: artistData.data.name,
            total: null,
            followers: artistData.data.followers.total,
            isArtistPage: true,
            showAlbum: false,
            showDateAdded: false,
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

module.exports = { artist_get };