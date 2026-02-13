const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');

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
        console.error('error at collection_get:', err);
        return res
        .status(error.response?.status || 500)
        .json({
            message: error.response?.data?.error || 'Error fetching user playlists.',
        });
    }
}

//user library related fetches
//get saved favorite songs
async function tracks_get(req, res){
    try{
        const me = await spotifyApi.get('/me');

        const tracksRes = await spotifyApi.get('/me/tracks?limit=50');
        const items = formatSpotifyItems(tracksRes.data.items, item => ({
            isFavorite: true
        }));

        const response = formatSpotifyData({
            title: 'Playlist',
            name: 'Liked Songs',
            images: [],
            owner: me.data.display_name,
            total: tracksRes.data.total,
            followers: null,
            items: items,
        });

        return res.json(response);

    } catch(err){
        console.error('error at tracks_get:', err);
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || 'Error fetching user playlist songs.',
        });
    }
};

//get saved episodes
async function episodes_get(req, res){
    try{
        const me = await spotifyApi.get('/me');
        
        const episodesRes = await spotifyApi.get('/me/episodes?limit=50');
        const items = formatSpotifyItems(episodesRes.data.items, item => ({
            isFavorite: true
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
        console.error('error at episodes_get:', err);
        return res
        .status(err.response?.status || 500)
        .json({
            message: err.response?.data?.error || 'Error fetching user playlist songs.',
        });
        
    }
};


module.exports = { collection_get, tracks_get, episodes_get };