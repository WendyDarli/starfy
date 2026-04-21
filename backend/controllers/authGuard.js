const als = require('../utils/alsContext');
const {ensureValidSpotifyToken} = require('../services/spotify/spotifyService')

// Ensure user has a valid Spotify token and attach the token to this request (refresh if expired)
module.exports = async (req, res, next) => {
    const currentCtx = als.getStore();
    const userId = req.session?.userId;
    if (!userId) return res.redirect('/login');
    
  try{
    const validToken =  await ensureValidSpotifyToken(userId)
    const token = { token: validToken };
    als.enterWith({ 
      ...currentCtx,           // Keep existing traceId, reqId, userId
      token: validToken        // Add token
    });
    next();

  } catch(err){
    console.error("Spotify context middleware error:", err.message);
    res.redirect('/login');
  }
};