let isShuttingDown = false;
const redisClient = require('../infrastructure/redis/redisClient');
const  logger = require('./logger');

async function gracefulShutdown(server, exitCode) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info('Graceful shutdown initiated', { exitCode });

  const shutdownTimeout = setTimeout(() => {
    logger.error("Shutdown timed out, forcing exit");
    process.exit(1);
  }, 10000);

  try {
    // Stop accepting new connections
    await new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err);
            resolve();
        });
    });

    // Drain existing work
    await redisClient?.quit?.().catch(() => {});

    logger.info("Clean shutdown complete");
    clearTimeout(shutdownTimeout);
    process.exit(exitCode);

  } catch (err) {
    logger.error("Error during shutdown", { error: err });
    clearTimeout(shutdownTimeout);
    process.exit(1);
  }
};

process.on("SIGTERM", () => gracefulShutdown(server, 0));
process.on("SIGINT", () => gracefulShutdown(server, 0));

module.exports = gracefulShutdown;