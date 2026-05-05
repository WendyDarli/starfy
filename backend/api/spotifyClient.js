const als = require('../utils/alsContext');
const axios = require('axios');
const normalizeError = require('../errors/normalizeError');
const { refreshSpotifyToken } = require('../services/spotify/refreshSpotifyToken');

//global interceptor for spotify api
//this adds the authorization header and default timeout of 20s
const spotifyClient = axios.create({ baseURL: process.env.SPOTIFY_URL });

spotifyClient.interceptors.request.use(async (config) => {
    const { token, userId } = als.getStore() ?? {};

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.timeout = 20000;
    } else {
        console.warn('WARNING: No token found in AsyncLocalStorage');
    }
    return config;
});

spotifyClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const { userId } = als.getStore() ?? {};

            // No userId = session is gone, can't refresh, force re-login
            if (!userId) {
                return Promise.reject(new Error('Session not found. Please log in again.'));
            }

            try {
                const newAccessToken = await refreshSpotifyToken(userId);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return spotifyClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        throw normalizeError(error);
    }
);

module.exports = spotifyClient;