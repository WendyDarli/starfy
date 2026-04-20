const session = require('express-session');
const { RedisStore } = require('connect-redis'); 
const redisClient = require('./redisClient');


function sessionMiddleware() {
    return session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: false //set to TRUE in production and add app.set('trust proxy', 1);
        }
    })    
};

module.exports = sessionMiddleware;