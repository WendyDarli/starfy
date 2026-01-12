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

        function buildPlaylistResponse({
            title, 
            name, 
            images, 
            owner, 
            total, 

            //specific to artists
            followers,

            //ui options
            isArtistPage = false, 
            showAlbum = true, 
            showDateAdded = true, 

            items,
        }) {
            return {
                header: {
                    title,
                    name,
                    images,
                    owner,
                    total,
                    followers,
                },
                tracksHeader: {
                    isArtistPage,
                    showAlbum,
                    showDateAdded,
                },
                tracks: {
                    items,
                },
            };
        };

        switch(type) {
            case 'tracks': {
                const tracksRes = await axios.get('https://api.spotify.com/v1/me/tracks?limit=50', { headers });
                const response = buildPlaylistResponse({
                    title: 'Playlist',
                    name: 'Liked Songs',
                    images: [],
                    owner: me.data.display_name,
                    total: tracksRes.data.total,
                    followers: null,
                    isArtistPage: false,
                    showAlbum: true,
                    showDateAdded: true,
                    items: tracksRes.data.items,
                });

                return res.json(response);
            }

            case 'episodes': {
                const episodesRes = await axios.get('https://api.spotify.com/v1/me/episodes?limit=50', { headers });
                const response = buildPlaylistResponse({
                    title: 'Playlist',
                    name: 'Episodes',
                    images: [],
                    owner: me.data.display_name,
                    total: episodesRes.data.total,
                    followers: null,
                    isArtistPage: false,
                    showAlbum: false,
                    showDateAdded: true,
                    items: episodesRes.data.items,
                });
                return res.json(response);
            }

            case 'playlist':
                const playlistData = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, { headers });
                const playlistTracks = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`, { headers });
                const response = buildPlaylistResponse({
                    title: 'Playlist',
                    name: playlistData.data.name,
                    images: playlistData.data.images,
                    owner: playlistData.data.owner?.display_name,
                    total: playlistTracks.data.total,
                    followers: null,
                    isArtistPage: false,
                    showAlbum: true,
                    showDateAdded: true,
                    items: playlistTracks.data.items,
                });
                return res.json(response);

            case 'album': {
                const albumData = await axios.get(`https://api.spotify.com/v1/albums/${id}`, { headers });
                const albumTracks = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks?limit=50`, { headers });
                const response = buildPlaylistResponse({
                    title: 'Album',
                    name: albumData.data.name,
                    images: albumData.data.images,
                    owner: albumData.data.artists?.[0]?.name,
                    total: albumTracks.data.total,
                    followers: null,
                    isArtistPage: false,
                    showAlbum: false,
                    showDateAdded: false,
                    items: albumTracks.data.items,
                });
                return res.json(response);
            }    
            
            case 'artist': {
                const artistData = await axios.get(`https://api.spotify.com/v1/artists/${id}`, { headers });
                const artistTopTracks = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, { headers });
                const response = buildPlaylistResponse({
                    title: 'Artist',
                    name: artistData.data.name,
                    images: artistData.data.images,
                    owner: artistData.data.name,
                    total: null,
                    followers: artistData.data.followers.total,
                    isArtistPage: false,
                    showAlbum: true,
                    showDateAdded: false,
                    items: artistTopTracks.data.tracks,
                });
                return res.json(response);
            }                
            case 'song': {
                const songData = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, { headers });
                const response = buildPlaylistResponse({
                    title: 'Song',
                    name: songData.data.name,
                    images: songData.data.album.images,
                    owner: songData.data.artists?.[0]?.name,
                    total: null,
                    followers: null,
                    isArtistPage: false,
                    showAlbum: false,
                    showDateAdded: false,
                    items: [
                        {
                            track: songData.data
                        }
                    ],
                });
                return res.json(response);
            }

            default:
                return res.status(400).json({ message: 'Invalid type parameter.' });
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