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

async function songs_post(req, res){
    try{ 
        const id = req.body.id;
        const type = req.body.type;

        const accessToken = req.user.tokens.access_token;
        const headers = { Authorization: `Bearer ${accessToken}` };
        const me = await axios.get('https://api.spotify.com/v1/me', { headers });

        switch(type) {
            case 'tracks':
                const tracksRes = await axios.get('https://api.spotify.com/v1/me/tracks?limit=50', { headers });
                return res.json({
                    playlist: {
                    id: 'tracks',
                    name: 'Liked Songs',
                    images: [],
                    owner: me.data.display_name,
                    total: tracksRes.data.total,
                    },
                    items: tracksRes.data.items,
                });

            case 'episodes':
                const episodesRes = await axios.get('https://api.spotify.com/v1/me/episodes?limit=50', { headers });
                return res.json({
                    playlist: {
                    id: 'episodes',
                    name: 'Your Episodes',
                    images: [],
                    owner: me.data.display_name,
                    total: episodesRes.data.total,
                    },
                    items: episodesRes.data.items,
                });

            case 'playlist':
                const playlistData = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, { headers });
                const playlistTracks = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`, { headers });
                return res.json({
                playlist: {
                id: playlistData.data.id,
                name: playlistData.data.name,
                images: playlistData.data.images,
                owner: playlistData.data.owner?.display_name,
                total: playlistData.data.tracks.total,
                },
                items: playlistTracks.data.items,
            });
        }
        
    } catch(error){
        return res
        .status(error.response?.status || 500)
        .json({
            message: error.response?.data?.error || 'Error fetching user playlist songs.',
        });
    }
}

module.exports = { playlists_get, songs_post };