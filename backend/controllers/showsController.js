const getShowDetails = require('../services/spotify/shows/getShowDetails');
const asyncHandler = require('../lib/asyncHandler');

const show_get = asyncHandler(async (req, res, next) => {
    const response = await getShowDetails(req.params.id);
    return res.json(response);
});

module.exports = { show_get };