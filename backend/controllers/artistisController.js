const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');

async function artist_get(req, res){
    try{
        const id = req.params.id;        
        const artistData = await spotifyApi.get(`/artists/${id}`);
        const artistTopTracks = await spotifyApi.get(`/artists/${id}/top-tracks?market=US`);
        
        let items = formatSpotifyItems(artistTopTracks.data.tracks, item => ({
            isFavorite: false
        }));

        const response = formatSpotifyData({
            title: 'Artist',
            name: artistData.data.name,
            images: artistData.data.images,
            owner: artistData.data.name,
            total: null,
            followers: artistData.data.followers.total,
            items: items,
        });
        return res.json(response);
        
    }catch(err){
        console.error('error in artist_get: ', err);
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || 'Error fetching user playlist songs.',
        });
    };
};

module.exports = { artist_get };