const { formatSpotifyData } = require('../utils/formatSpotifyData');
const spotifyApi = require('../config/axiosConfig');
const formatSpotifyItems = require('../utils/formatSpotifyItems');
const checkFavoriteStatus = require('../utils/checkFavoriteStatus')

async function album_get(req, res){
    try{
        const id = req.params.id;
                
        const albumData = await spotifyApi.get(`/albums/${id}`);
        const albumTracks = await spotifyApi.get(`/albums/${id}/tracks?limit=50`);
        
        let items = formatSpotifyItems(albumTracks.data.items, item => ({
            isFavorite: false
        }));
        items = await checkFavoriteStatus(items);

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
        console.error('error at album_get:', err);
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || err.message || 'Error fetching albums.',
        });
    };
};

module.exports = { album_get };