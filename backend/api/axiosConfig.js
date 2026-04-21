const als = require('../utils/alsContext');
const axios = require('axios');
const normalizeError = require('../errors/normalizeError');

//global interceptor for spotify api
//this adds the authorization header and default timeout of 20s
const spotifyClient = axios.create({ baseURL: process.env.SPOTIFY_URL });

spotifyClient.interceptors.request.use(async (config) => {
  const store = als.getStore(); 
  const token = await store?.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.timeout = 20000;
  } else {
    console.warn("WARNING: No token found in AsyncLocalStorage");
  }
  return config;
});

spotifyClient.interceptors.response.use(
  (response) => response,
  (err) => { throw(normalizeError(err)) }
);

module.exports = spotifyClient;