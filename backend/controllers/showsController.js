const spotifyApi = require('../config/axiosConfig');
const formatSpotifyData = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');

async function show_get(req, res){
    try{
        const id = req.params.id;
        const showData = await spotifyApi.get(`/shows/${id}`);
        const showEpisodes = await spotifyApi.get(`/shows/${id}/episodes?limit=50`);
        
        let items = formatSpotifyItems(showEpisodes.data.items, item => ({
            isFavorite: false
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
        console.error('error in show_get: ', err)
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || 'Error fetching user playlist songs.',
        });
    };
};

module.exports = { show_get };