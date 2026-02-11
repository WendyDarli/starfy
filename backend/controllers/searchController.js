const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

async function search_get(req, res) {
    try{
        const query = req.params.query;
        const page = parseInt(req.query._page) || 0;
        
        const searchResultsRes = await spotifyApi.get('/search', {
            params: {
                q: query, 
                type: 'track',
                limit: 20,
                offset: page * 20
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

        res.json({
            ...response,
            pagination: {
                currentPage: page,
                hasMore: searchResultsRes?.data?.tracks?.next !== null
            }
        });
        
    }catch(err) {
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