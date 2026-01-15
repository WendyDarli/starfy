function formatSpotifyData({
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
            items
        },
    };
};

module.exports = { formatSpotifyData };