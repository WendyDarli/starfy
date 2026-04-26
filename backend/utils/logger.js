const pino = require('pino');
const REDACT_PATHS = require('../config/logRedadct');

const isDev = process.env.NODE_ENV !== 'production';

const targets = isDev
  ? [
      {
        target: "pino-pretty",
        level: "debug",
        options: { colorize: true },
      },
    ]
  : [
      {
        target: "pino-datadog-transport",
        level: "info",
        options: {
          apiKey: process.env.DD_API_KEY,
          service: "api-gateway",
          source: "nodejs",
        },
      },
    ];

const transport = pino.transport({
  targets,
});

const logger = pino(
  {
    level: isDev ? 'debug' : 'info',
    serializers: {
      err: pino.stdSerializers.err,
    },
    redact: REDACT_PATHS,
  },
  transport,
);

module.exports = logger;