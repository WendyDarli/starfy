const spotifyClient = require('../api/axiosConfig');
const getUserCollection = require('../services/spotify/getUserCollection');
const asyncHandler = require('../utils/asyncHandler');
const { formatSpotifyData } = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');

// Fetch user library summary for sidebar (playlists, tracks, episodes)
const collection_get = asyncHandler(async (req, res, next) => {
    const response = await getUserCollection();
    return res.json(response);
});

//user library related fetches
//get saved favorite songs
async function tracks_get(req, res){
    try{
        const me = await spotifyClient.get('/me');

        const tracksRes = await spotifyClient.get('/me/tracks?limit=50');

        const items = formatSpotifyItems(tracksRes.data.items, item => ({
            isFavorite: true
        }));

        const response = formatSpotifyData({
            title: 'Playlist',
            name: 'Liked Songs',
            images: [],
            owner: me.data.display_name,
            total: items.length,
            followers: null,
            playlistId: 'tracks',
            items,
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
        const me = await spotifyClient.get('/me');
        
        const episodesRes = await spotifyClient.get('/me/episodes?limit=50');
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