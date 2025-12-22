// Attach authenticated user data from Redis to req.user for all downstream middlewares and routes
const redisClient = require('./redis');

async function attachUser(req, res, next) {
  const userId = req.session?.userId;
  if (!userId) return next();

  try{
    const raw = await redisClient.get(`tokens:user:${userId}`);
    if (!raw) return next();

    const tokens = JSON.parse(raw);
    req.user = {
      id: userId,
      tokens,
      access_token: tokens.access_token,  
      refresh_token: tokens.refresh_token,
    };
    next();
  } catch (err){
    next(err);
  }
}


module.exports = attachUser;