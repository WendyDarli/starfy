const spotifyStore = require('../utils/context');
const axios = require('axios');

//global interceptor for spotify api
const spotifyApi = axios.create({ baseURL: 'https://api.spotify.com/v1' });

spotifyApi.interceptors.request.use(async (config) => {
  const store = spotifyStore.getStore(); 
  const token = await store?.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

  } else {
    console.warn("WARNING: No token found in AsyncLocalStorage");
  }

  return config;
});

module.exports = spotifyApi;