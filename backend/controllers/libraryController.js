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

async function songs_get(req, res){
    try{ 
        const playlistId = req.params.id;
        const accessToken = req.user.tokens.access_token;
        const headers = { Authorization: `Bearer ${accessToken}` };

        switch(playlistId) {
            case 'tracks':
                const tracksRes = await axios.get('https://api.spotify.com/v1/me/tracks?limit=50', { headers });
                return res.json(tracksRes.data.items);

            case 'episodes':
                const episodesRes = await axios.get('https://api.spotify.com/v1/me/episodes?limit=50', { headers });
                return res.json(episodesRes.data.items);

            default:
                const playlistRes = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, { headers });
                return res.json(playlistRes.data.items);
        }
        
    } catch(error){
        return res
        .status(error.response?.status || 500)
        .json({
            message: error.response?.data?.error || 'Error fetching user playlist songs.',
        });
    }
}

module.exports = { playlists_get, songs_get };