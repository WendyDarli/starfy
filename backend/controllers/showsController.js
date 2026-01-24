const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

async function show_get(req, res){
    try{
        const id = req.params.id;
        const showData = await spotifyApi.get(`/shows/${id}`);
        const showEpisodes = await spotifyApi.get(`/shows/${id}/episodes?limit=50`);
        
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