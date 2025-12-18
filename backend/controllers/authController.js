const axios = require('axios');
require('dotenv').config();

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
    const code = req.query.code || null;

    try{
        const response = await axios({
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

        const { access_token, refresh_token, expires_in } = response.data;

        res.redirect(`http://localhost:5173/?access_token=${access_token}&refresh_token=${refresh_token}`);
    } catch (error) {
        res.send(error);
    } 
}

module.exports =  { login_get, login_callback_get };
