const axios = require('axios');
require('dotenv').config();
const { fetchSpotifyProfile } = require('../utils/fetchSpotifyProfile')
const redisClient = require('../redis');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;


async function login_get(req, res){
    const scope = `
        user-read-private
        user-read-email
        playlist-read-private
        playlist-read-collaborative
        user-library-read
        `;

    const auth_query_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri
    });
    res.redirect(`https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`);
}

async function login_callback_get(req, res){
    //fetches tokens from spotify
    //fetches user profile using access_token
    //creates redis userID using spotify profile ID
    //saves auth tokens and userId in redis 
    //redirects to main page

    const code = req.query.code || null;

    try{
        const tokensResponse = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
                client_id: client_id,
                client_secret: client_secret
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        const { access_token, refresh_token } = tokensResponse.data;

        const profileResponse = await fetchSpotifyProfile(access_token);
        const userId = profileResponse.id;
        req.session.userId = userId;
        

        //store tokens in redis
        await redisClient.set(`tokens:user:${userId}:access_token`, access_token, { EX: 3600 });
        await redisClient.set(`tokens:user:${userId}:refresh_token`, refresh_token);

        res.redirect('http://127.0.0.1:5173');


    } catch (error){
          return res
            .status(error.response?.status || 500)
            .json({
                message: error.response?.data?.error || 'Authentication failed',
            });
    } 
}

//check if user is authenticated by fetching spotify profile
async function isAuthenticated_get(req, res){
    try{
        //TODO: check expiry before use
        //if expired use refresh token to get a new access token
        const accessToken = req.user.tokens.access_token;

        //fetch user profile using access token
        const profile = await fetchSpotifyProfile(accessToken);
        res.json(profile);

    } catch(err){
        res.status(err.response?.status || 500).json({ error: 'User not authenticated.' });
    }
    
}

module.exports =  { login_get, login_callback_get, isAuthenticated_get };
