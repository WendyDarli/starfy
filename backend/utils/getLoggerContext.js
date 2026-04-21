const als = require('./alsContext');
const logger = require('./logger');

// Child logger that auto-injects context
function getLoggerContext(bindings) {
  const ctx = als.getStore();
  return logger.child({
    reqId: ctx?.reqId,
    traceId: ctx?.traceId,
    userId: ctx?.userId,
    ...bindings,
  });
}

module.exports = getLoggerContext;