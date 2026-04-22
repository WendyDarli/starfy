const asyncHandler = require('../utils/asyncHandler');
const searchTracks = require('../services/spotify/search/searchTracks')

const search_get = asyncHandler(async (req, res, next) => {
    const query = req.params.query;
    const page = parseInt(req.query._page) || 0;
    
    const response = await searchTracks(query, page);
    res.json(response);
});

module.exports = { search_get };