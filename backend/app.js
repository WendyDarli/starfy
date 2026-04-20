if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
};

const express = require('express');
const indexRouter = require('./routes/indexRouter');

const cors = require('cors');
const sessionMiddleware = require("./infrastructure/redis/redisSession.js");

const { handleNotFound, errorHandler } = require('./middlewares/errorHandler');
const errorLogger = require('./utils/errorLogger.js')

const app = express();


app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true,
}));

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1); 
});

app.use ('/', indexRouter),
app.use(sessionMiddleware());
app.use ('/', indexRouter);

app.use(handleNotFound);
app.use(errorHandler);

app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on http://localhost:3000');
});
