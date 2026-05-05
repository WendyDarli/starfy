const asyncHandler = require('../lib/asyncHandler');
const spotifyLogin = require('../services/spotify/auth/spotifyLogin');
const getSpotifyTokens = require('../services/spotify/auth/getSpotifyTokens');
const getUserProfile = require('../services/spotify/user/getUserProfile');
const storeSpotifyTokens = require('../services/redis/storeSpotifyTokens');

const login_get = asyncHandler(async (req, res) => {
    const url = spotifyLogin();
    return res.redirect(url);
});

const login_callback_get = asyncHandler(async (req, res) => {
    const code = req.query.code || null;
    const { access_token, refresh_token } = await getSpotifyTokens(code);

    const { id: userId } = await getUserProfile(access_token);
    req.session.userId = userId;

    await storeSpotifyTokens(userId, access_token, refresh_token);
    res.redirect(process.env.VITE_FRONTEND_URL);
});

const isAuthenticated_get = asyncHandler(async (req, res) => {
    const userProfile = await getUserProfile();
    return res.json(userProfile);
});

const logout_post = asyncHandler(async (req, res) => {
    await new Promise((resolve, reject) => {
        req.session.destroy(err => err ? reject(err) : resolve());
    });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
});

module.exports = { login_get, login_callback_get, isAuthenticated_get, logout_post };