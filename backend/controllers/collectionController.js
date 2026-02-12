const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');

//fetches user playlists for sidebar
async function collection_get(req, res){
    try {
        const [playlistsRes, tracksRes, episodesRes] = await Promise.all([
            spotifyApi.get('/me/playlists'),
            spotifyApi.get('/me/tracks'),
            spotifyApi.get('/me/episodes'),
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

//user library related fetches
async function tracks_get(req, res){
    try{
        const me = await spotifyApi.get('/me');

        const tracksRes = await spotifyApi.get('/me/tracks?limit=50');
        const items = tracksRes.data.items.map(i => ({
            ...i.track,
            artists: i.track.artists.map(a => ({
                name: a.name,
                id:a.id
            })),
            added_at: i.added_at,
            albumOrShow: i.track.album, 
            imageUrl: i.track.album.images[0].url 
        }));
                    
        const response = formatSpotifyData({
            title: 'Playlist',
            name: 'Liked Songs',
            images: [],
            owner: me.data.display_name,
            total: tracksRes.data.total,
            followers: null,
            items: items
        });
        return res.json(response);

    } catch(err){
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || 'Error fetching user playlist songs.',
        });
    }

};

async function episodes_get(req, res){
    try{
        const me = await spotifyApi.get('/me');
        
        const episodesRes = await spotifyApi.get('/me/episodes?limit=50');
        const items = episodesRes.data.items.map(i => ({
            ...i.episode,
            artists: [i.episode.show].map(a => ({
                name: a.name,
                id:a.id
            })),
            added_at: i.added_at,
            albumOrShow: null, 
            imageUrl: i.episode.images[0].url 
        }));

        const response = formatSpotifyData({
            title: 'Playlist',
            name: 'Your Episodes',
            images: [],
            owner: me.data.display_name,
            total: episodesRes.data.total,
            followers: null,
            isArtistPage: false,
            showAlbum: false,
            showDateAdded: true,
            items: items,   
        });
        return res.json(response);
    } catch (err){
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || 'Error fetching user playlist songs.',
        });
    }
};


module.exports = { collection_get, tracks_get, episodes_get };