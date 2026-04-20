const pino = require('pino');

const isDev = process.env.NODE_ENV !== 'production';

const errorLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  serializers: {
    err: pino.stdSerializers.err,
  },
  redact: ['req.headers.authorization', 'context.password'],
  transport: isDev
    ? {
        target: "pino-pretty",
        options: { colorize: true },
      }
    : undefined,

});

module.exports = errorLogger;