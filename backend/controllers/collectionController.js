const spotifyClient = require('../api/axiosConfig');
const getUserCollection = require('../services/spotify/getUserCollection');
const getLikedSongsPage = require('../services/spotify/getLikedSongsPage');

const asyncHandler = require('../utils/asyncHandler');
const { formatSpotifyData } = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');

// Get user library summary for sidebar (playlists, tracks, episodes)
const collection_get = asyncHandler(async (req, res, next) => {
    const response = await getUserCollection();
    return res.json(response);
});

// User library related fetches:

// Get saved favorite songs
const likedSongs_get = asyncHandler(async (req, res, next) => {
    const response = await getLikedSongsPage();
    return res.json(response);
});

// Get saved episodes 
async function likedEpisodes_get(req, res){
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


module.exports = { collection_get, likedSongs_get, likedEpisodes_get };