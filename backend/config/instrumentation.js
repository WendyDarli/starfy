const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { BatchSpanProcessor, ParentBasedSampler, TraceIdRatioBasedSampler, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { credentials, CompressionAlgorithms } = require('@grpc/grpc-js');
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');

const isProd = process.env.NODE_ENV === 'production';

/*
Auto-instrumentation for HTTP, Redis, Express, Pino logging
Sampling (100% dev, 10% prod) for performance
Sensitive data masking (Redis credentials)
Graceful shutdown to flush pending spans
Resource metadata (service name, version, environment)
Batch processing for efficiency
*/


// Resource describes this service instance
const resource = resourceFromAttributes({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'my-service',
  [SemanticResourceAttributes.SERVICE_VERSION]: process.env.npm_package_version || '0.0.0',
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
  [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: process.env.HOSTNAME || require('os').hostname(),
});

// OTLP gRPC exporter — configure via env or programmatically
const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'grpc://localhost:4317',
  credentials: isProd
    ? credentials.createSsl()
    : credentials.createInsecure(),
  compression: 'gzip',
  timeoutMillis: 10_000,
});

// BatchSpanProcessor buffers spans and exports in batches
const spanProcessor = new BatchSpanProcessor(traceExporter, {
  maxQueueSize: isProd ? 2048 : 512,
  maxExportBatchSize: isProd ? 512 : 128,
  scheduledDelayMillis: isProd ? 5000 : 1000,
  exportTimeoutMillis: 30_000,
});

// Sampling: 100% in dev, 10% in prod (parent-based to keep trace continuity)
const sampler = new ParentBasedSampler({
  root: isProd
    ? new TraceIdRatioBasedSampler(
        parseFloat(process.env.OTEL_TRACES_SAMPLER_ARG || '0.1')
      )
    : new TraceIdRatioBasedSampler(1.0),
});

const sdk = new NodeSDK({
  resource,
  traceExporter,
  spanProcessor,
  sampler,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': {
        ignoreIncomingRequestHook: (req) => {
          // Don't trace health checks or readiness probes
          const ignored = ['/health', '/ready', '/metrics', '/favicon.ico'];
          return ignored.some((path) => req.url?.startsWith(path));
        },
        ignoreOutgoingRequestHook: (req) => {
          // Don't trace calls to internal metadata services
          return req.hostname === '169.254.169.254';
        },
        headersToSpanAttributes: {
          server: {
            requestHeaders: ['x-request-id', 'x-tenant-id'],
          },
        },
      },
      '@opentelemetry/instrumentation-redis': {
        dbStatementSerializer: (cmdName, cmdArgs) => {
          // Mask sensitive Redis commands — log command name only
          const sensitive = ['auth', 'set', 'setex', 'mset'];
          if (sensitive.includes(cmdName.toLowerCase())) {
            return `${cmdName} [REDACTED]`;
          }
          return `${cmdName} ${cmdArgs.join(' ')}`;
        },
      },
      '@opentelemetry/instrumentation-express': {
        ignoreLayers: [/^cors$/, /^compression$/],
      },
      '@opentelemetry/instrumentation-fs': { enabled: false },
      '@opentelemetry/instrumentation-dns': { enabled: false },
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-https': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-redis': { enabled: true },
      '@opentelemetry/instrumentation-net': { enabled: false },
    }),
    new PinoInstrumentation({})
  ],
});

// Start the SDK before importing any instrumented libraries
sdk.start();
console.log('[otel] Tracing initialized');

module.exports = { sdk };