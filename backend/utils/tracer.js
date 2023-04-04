const { BasicTracerProvider } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Tracer setup
const traceProvider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'your-service-name',
  }),
});
const traceExporter = new OTLPTraceExporter(traceCollectorOptions);
traceProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
traceProvider.register();

// Custom tracer
const tracer = traceProvider.getTracer('your-service-name');

module.exports = { tracer };
