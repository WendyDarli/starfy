const axios = require('axios');

async function playlists_get(req, res){
    try {
        const accessToken = req.user.tokens.access_token;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const [playlistsRes, tracksRes, episodesRes] = await Promise.all([
        axios.get('https://api.spotify.com/v1/me/playlists', { headers }),
        axios.get('https://api.spotify.com/v1/me/tracks', { headers }),
        axios.get('https://api.spotify.com/v1/me/episodes', { headers }),
        ]);

        const response = {
        episodes: {
            href: episodesRes.data.href,
            total: episodesRes.data.total,
        },
        tracks: {
            href: tracksRes.data.href,
            total: tracksRes.data.total,
        },
        playlists: playlistsRes.data.items,
        };

        res.json(response);
    } catch(error){
        return res
        .status(error.response?.status || 500)
        .json({
            message: error.response?.data?.error || 'Error fetching user playlists.',
        });
    }
}

module.exports = { playlists_get };