function formatSpotifyData({
    title, 
    name, 
    images, 
    owner, 
    total, 

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
        },
        tracks: {
            items
        },
    };
};

module.exports = { formatSpotifyData };