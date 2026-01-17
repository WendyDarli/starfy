const axios = require('axios');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

async function show_get(req, res){
    try{
        const id = req.params.id;
        const accessToken = req.user.tokens.access_token;
        const headers = { Authorization: `Bearer ${accessToken}` };
        
        const showData = await axios.get(`https://api.spotify.com/v1/shows/${id}`, { headers });
        const showEpisodes = await axios.get(`https://api.spotify.com/v1/shows/${id}/episodes?limit=50`, { headers });
        
        const items = showEpisodes.data.items.map(episode => ({
            ...episode,
            artists: [{ name: showData.data.name, id: showData.data.id }],
            added_at: null,
            albumOrShow: null,
            imageUrl: episode.images?.[0]?.url,
        }));

        const response = formatSpotifyData({
            title: 'Podcast Show',
            name: showData.data.name,
            images: showData.data.images,
            owner: showData.data.publisher,
            total: showEpisodes.data.total || items.length,
            followers: null,
            isArtistPage: false,
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

module.exports = { show_get };