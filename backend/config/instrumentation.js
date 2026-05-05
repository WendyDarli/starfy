const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { credentials } = require('@grpc/grpc-js');
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');
const os = require('os');

const isProd = process.env.NODE_ENV === 'production';

const resource = resourceFromAttributes({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'starfy-backend',
  [SemanticResourceAttributes.SERVICE_VERSION]: process.env.npm_package_version || '0.0.0',
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
  [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: process.env.HOSTNAME || os.hostname(),
});

const traceExporter = new OTLPTraceExporter({
  credentials: isProd ? credentials.createSsl() : credentials.createInsecure(),
  compression: 'gzip',
  timeoutMillis: 10_000,
});

const spanProcessor = new BatchSpanProcessor(traceExporter, {
  maxQueueSize: isProd ? 2048 : 512,
  maxExportBatchSize: isProd ? 512 : 128,
  scheduledDelayMillis: isProd ? 5000 : 1000,
  exportTimeoutMillis: 30_000,
});

const sdk = new NodeSDK({
  resource,
  spanProcessors: [spanProcessor],
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': {
        enabled: true,
        ignoreIncomingRequestHook: (req) => {
          const ignored = ['/health', '/ready', '/metrics', '/favicon.ico'];
          return ignored.some((path) => req.url?.startsWith(path));
        },
        ignoreOutgoingRequestHook: (req) => req.hostname === '169.254.169.254',
        headersToSpanAttributes: {
          server: { requestHeaders: ['x-request-id', 'x-tenant-id'] },
        },
      },

      '@opentelemetry/instrumentation-redis': {
        enabled: true,
        dbStatementSerializer: (cmdName, cmdArgs) => {
          const sensitive = ['auth', 'set', 'setex', 'mset'];
          if (sensitive.includes(cmdName.toLowerCase())) return `${cmdName} [REDACTED]`;
          return `${cmdName} ${cmdArgs.join(' ')}`;
        },
      },

      '@opentelemetry/instrumentation-express': {
        enabled: true,
        ignoreLayers: [/^cors$/, /^compression$/],
      },
      '@opentelemetry/instrumentation-fs': { enabled: false },
      '@opentelemetry/instrumentation-dns': { enabled: false },
      '@opentelemetry/instrumentation-https': { enabled: true },
      '@opentelemetry/instrumentation-net': { enabled: false },
    }),
    new PinoInstrumentation({}),
  ],
});

sdk.start();
console.log('[otel] Tracing initialized');

// Graceful shutdown
process.on('SIGTERM', () => sdk.shutdown().finally(() => process.exit(0)));
process.on('SIGINT', () => sdk.shutdown().finally(() => process.exit(0)));

module.exports = { sdk };