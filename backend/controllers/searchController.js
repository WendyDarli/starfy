const axios = require('axios');
const { formatSpotifyData } = require('../utils/formatSpotifyData');
//import { formatSpotifyData } from '../utils/formatSpotifyData';

async function search_get(req, res) {
    try{
        const query = req.params.query;
        const accessToken = req.user.tokens.access_token;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const searchResultsRes = await axios.get('https://api.spotify.com/v1/search', {
            headers,
            params: {
                q: query, 
                type: 'track',
                limit: 20,
                offset: 0
            }
        });

        //format data
        const items = searchResultsRes.data.tracks.items.map(track => ({
            ...track,
            artists: track.artists.map(a => ({
                name: a.name,
                id:a.id
            })),
            albumOrShow: track.album, 
            imageUrl: track.album.images[0].url ?? null
        }));

        const response = formatSpotifyData({
            items: items
        });
        res.json(response);
        
    }catch(err) {
        return res
            .status(err.response?.status || 500)
            .json({
                message: err.response?.data?.error || err.message ||  'Error searching songs.',
            });
    }
};

module.exports = { search_get };