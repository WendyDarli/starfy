const axios = require('axios');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

async function playlist_get(req, res){
    try{
        const id = req.params.id;
        const accessToken = req.user.tokens.access_token;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const playlistData = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, { headers });
        const playlistTracks = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`, { headers });
        
        const items = playlistTracks.data.items.map(i => ({
            ...i.track,
            artists: i.track.artists.map(a => ({
                name: a.name,
                id:a.id
            })),
            added_at: i.added_at,
            albumOrShow: i.track.album, 
            imageUrl: i.track.album.images[0].url 
        }));

        const response = formatSpotifyData({
            title: 'Playlist',
            name: playlistData.data.name,
            images: playlistData.data.images,
            owner: playlistData.data.owner?.display_name,
            total: playlistTracks.data.total,
            followers: null,
            items: items,
        });
        return res.json(response);
    } catch(err){
        return res
        .status(err.response?.status || 500)
        .json({
           message: err.response?.data?.error || err.message ||  'Error fetching user playlist songs.',
        });
    }
};

module.exports = { playlist_get };