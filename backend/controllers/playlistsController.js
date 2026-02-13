const spotifyApi = require('../config/axiosConfig');
const { formatSpotifyData } = require('../utils/formatSpotifyData');
const formatSpotifyItems = require('../utils/formatSpotifyItems');

async function playlist_get(req, res){
    try{
        const id = req.params.id;
        const playlistData = await spotifyApi.get(`/playlists/${id}`, {
            params: { fields: 'name,images,owner.display_name,tracks.total' }
        });
        const playlistTracks = await spotifyApi.get(`/playlists/${id}/tracks?limit=50`, {
            params: { fields: 'items(added_at,track(id,name,artists(name,id),album(id,name,images),duration_ms,external_ids))' }
        });

        let items = formatSpotifyItems(playlistTracks.data.items, item => ({
            isFavorite: false
        }));

        const response = formatSpotifyData({
            title: 'Playlist',
            name: playlistData.data.name,
            images: playlistData.data.images,
            owner: playlistData.data.owner?.display_name,
            total: playlistTracks.data.total,
            followers: null,
            items: items,
        });

        return res.json(response);

    } catch(err){
        console.error('error in playlist_get: ', err)
        return res
        .status(err.response?.status || 500)
        .json({
           message: err.response?.data?.error || err.message ||  'Error fetching user playlist songs.',
        });
    }
};

module.exports = { playlist_get };