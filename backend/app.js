const express = require('express');
const authRouter = require('./routes/authRouter');
const cors = require('cors');
const attachUser = require('./attachUser');
require('dotenv').config();

//redis
const session = require('express-session');
const { RedisStore } = require('connect-redis'); 
const redisClient = require('./redis');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true,
}));

//redis
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false //set to TRUE in production
    }
  })
);

app.use(attachUser);
app.use('/', authRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on http://localhost:3000');
});
