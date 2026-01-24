const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

async function episode_get(req, res){
    try{
        const id = req.params.id;        
        const episodeData = await spotifyApi.get(`/episodes/${id}`);
        
        const items = [{
            ...episodeData.data,
            artists: [{ name: episodeData.data.show.name, id: episodeData.data.show.id }],
            added_at: null,
            albumOrShow: episodeData.data.show,
            imageUrl: episodeData.data.images[0]?.url,
        }];

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