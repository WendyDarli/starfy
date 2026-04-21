const { randomUUID } = require('node:crypto');
const als = require('../utils/alsContext');

// Express middleware
function correlationMiddleware(req, res, next) {
  const traceId = (req.headers["x-trace-id"]) || randomUUID();
  const reqId = randomUUID();

  res.setHeader("x-trace-id", traceId);
  res.setHeader("x-request-id", reqId);

  als.enterWith({ reqId, traceId, userId: req.session?.userId });
  next()
};

module.exports = correlationMiddleware;