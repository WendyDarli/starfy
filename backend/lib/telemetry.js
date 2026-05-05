const { trace, SpanStatusCode } = require('@opentelemetry/api');

function getTracer() {
  return trace.getTracer('starfy', '1.0.0');
}

async function withSpan(name, attrs = {}, fn) {
  return getTracer().startActiveSpan(name, async (span) => {
    Object.entries(attrs).forEach(([k, v]) => span.setAttribute(k, v));
    try {
      return await fn(span);
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw err;
    } finally {
      span.end();
    }
  });
}

module.exports = { withSpan };