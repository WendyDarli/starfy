const logger = require('../../../lib/logger');

function spotifyLogin(){
    logger.info({action: 'spotifyLogin'}, 'Logging user with Spotify');

    const scope = [
        'user-read-private',
        'user-read-email',
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-library-read',
        'user-library-modify',
    ].join(' ');

    const auth_query_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope,
        redirect_uri: process.env.REDIRECT_URI,
    });
    
    return `https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`;
}

module.exports = spotifyLogin;