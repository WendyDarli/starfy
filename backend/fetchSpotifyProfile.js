const axios = require('axios');

async function fetchSpotifyProfile(accessToken) {
  const res = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
}

module.exports = { fetchSpotifyProfile };