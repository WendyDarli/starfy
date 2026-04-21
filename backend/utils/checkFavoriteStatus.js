const spotifyApi = require('../api/axiosConfig');

//enrich songs with isFavorite
async function checkFavoriteStatus(songs){
    //extracts ids
    const ids = songs.map(s => s.id);

    //check is its an episode or track

    //calls spotify
    const res = await spotifyApi.get(`/me/tracks/contains?ids=${ids}`);
    const favoriteStatuses = res.data;

    //update isFavorite property
    return songs.map((s, index) => ({
        ...s,
        isFavorite:  favoriteStatuses[index]
    }))
}

module.exports = checkFavoriteStatus;