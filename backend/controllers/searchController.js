const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');
const checkFavoriteStatus = require('../utils/checkFavoriteStatus');

async function search_get(req, res) {
    const query = req.params.query;
    const page = parseInt(req.query._page) || 0;
    
    try{
        const searchResultsRes = await spotifyApi.get('/search', {
            params: {
                q: query, 
                type: 'track',
                limit: 20,
                offset: page * 20
            }
        });

        //format data
        let items = formatSpotifyItems(searchResultsRes.data.tracks.items, item => ({
            isFavorite: false
        }));
        items = await checkFavoriteStatus(items);
        
        const response = formatSpotifyData({
            items: items
        });

        res.json({
            ...response,
            pagination: {
                currentPage: page,
                hasMore: searchResultsRes?.data?.tracks?.next !== null
            }
        });
        
    }catch(err) {
        console.error('error in search_get: ', err)
        return res
            .status(err.response?.status || 500)
            .json({
                items: [],
                pagination: {
                    currentPage: page ?? 0,
                    hasMore: false,
                },
                error: err.message
            });

    }
};

module.exports = { search_get };