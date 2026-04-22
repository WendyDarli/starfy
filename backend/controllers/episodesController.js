const getEpisode = require('../services/spotify/episodes/getEpisode');

async function episode_get(req, res){
    const response = await getEpisode(req.params.id);
    return res.json(response);
}

module.exports = { episode_get };