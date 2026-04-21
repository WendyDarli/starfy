const pino = require('pino');
const REDACT_PATHS = require('../config/logRedadct');

const isDev = process.env.NODE_ENV !== 'production';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  serializers: {
    err: pino.stdSerializers.err,
  },
  redact: REDACT_PATHS,
  transport: isDev
    ? {
        target: "pino-pretty",
        options: { colorize: true },
      }
    : undefined,

});

module.exports = logger;