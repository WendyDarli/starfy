const logger = require('../../../lib/logger');
const axios = require('axios');

async function getSpotifyTokens(code){
    logger.info({action: 'getSpotifyTokens'}, 'Getting Spotify access and refresh Tokens');

    const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    return response.data;
};

module.exports = getSpotifyTokens;