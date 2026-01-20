const axios = require('axios');
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
        
        res.json(searchResultsRes.data.tracks);
    }catch(err) {
        return res
            .status(err.response?.status || 500)
            .json({
                message: err.response?.data?.error || err.message ||  'Error searching songs.',
            });
    }
};

module.exports = { search_get };