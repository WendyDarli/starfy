const spotifyStore = require('../utils/context');
const {ensureValidSpotifyToken} = require('../services/spotifyService')

// Ensure user has a valid Spotify token and attach the token to this request (refresh if expired)
module.exports = async (req, res, next) => {
    const userId = req.session?.userId;
    if (!userId) return res.redirect('/login');
    
  try{
    const validToken =  await ensureValidSpotifyToken(userId)
    const context = { token: validToken };
    spotifyStore.run(context, () => next());

  } catch(err){
    console.error("Spotify context middleware error:", err.message);
    res.redirect('/login');
  }
};