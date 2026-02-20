function formatSpotifyData({
    title, 
    name, 
    images, 
    owner, 
    total, 
    playlistId,
    //specific to artists
    followers,
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
            playlistId,
        },
        tracks: {
            items
        },
    };
};

module.exports = { formatSpotifyData };