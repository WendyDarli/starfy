const getEpisode = require('../services/spotify/episodes/getEpisode');
const asyncHandler = require('../utils/asyncHandler');

const episode_get = asyncHandler(async (req, res, next) => {
    const response = await getEpisode(req.params.id);
    return res.json(response);
});

module.exports = { episode_get };