const spotifyApi = require('../config/axiosConfig');
const formatSpotifyData = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');

async function episode_get(req, res){
    try{
        const id = req.params.id;        
        const episodeData = await spotifyApi.get(`/episodes/${id}`);
        
        let items = formatSpotifyItems([episodeData.data], item => ({
            isFavorite: false
        }));
        

        const response = formatSpotifyData({
            title: 'Podcast Episode',
            name: episodeData.data.name,
            images: episodeData.data.images,
            owner: episodeData.data.show.publisher,
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
}

module.exports = { episode_get };