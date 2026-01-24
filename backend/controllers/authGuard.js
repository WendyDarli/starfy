const spotifyStore = require('../utils/context');
const {ensureValidSpotifyToken} = require('../services/spotifyService')

module.exports = async (req, res, next) => {
    const userId = req.session?.userId;
  try{
    const validToken =  await ensureValidSpotifyToken(userId)
    const context = { token: validToken };
    spotifyStore.run(context, () => next());

  } catch(err){
    console.error("Spotify context middleware error:", err.message);
    res.redirect('/login');
  }
};