const getLyrics = require('../services/lrclib/getLyrics');
const asyncHandler = require('../lib/asyncHandler');

const lyrics_get = asyncHandler(async (req, res, next) => {
    const response = await getLyrics(req.query);
    return res.json(response);
});

module.exports = { lyrics_get };