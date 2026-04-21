const als = require('../utils/alsContext');
const axios = require('axios');
const normalizeError = require('../errors/normalizeError');

//global interceptor for spotify api
//this only adds the authorization header
const spotifyClient = axios.create({ baseURL: 'https://api.spotify.com/v1' });

spotifyClient.interceptors.request.use(async (config) => {
  const store = als.getStore(); 
  const token = await store?.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("WARNING: No token found in AsyncLocalStorage");
  }
  return config;
});

spotifyClient.interceptors.response.use(
  (response) => response,
  normalizeError
);

module.exports = spotifyClient;