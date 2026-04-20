if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
};

const express = require('express');
const indexRouter = require('./routes/indexRouter');

const cors = require('cors');
const sessionMiddleware = require("./infrastructure/redis/redisSession.js");

const { handleNotFound, errorHandler } = require('./middlewares/errorHandler');
const errorLogger = require('./utils/errorLogger.js')
const gracefulShutdown = require('./utils/gracefulShutdown.js');

const app = express();


app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true,
}));

app.use(sessionMiddleware());
app.use ('/', indexRouter);

app.use(handleNotFound);
app.use(errorHandler);

const server = app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on http://localhost:3000');
});

process.on('unhandledRejection', (reason) => {
  errorLogger.fatal("Unhandled rejection", {
    reason: reason instanceof Error ? reason.stack : String(reason),
  });
  // Throw to convert to uncaughtException for unified handling
  throw reason;
});

process.on('uncaughtException', (err) => {
  errorLogger.fatal("Uncaught exception, initiating shutdown...", {
    error: err.message,
    stack: err.stack,
  });
  gracefulShutdown(server, 1);
});