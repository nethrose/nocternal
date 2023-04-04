const { BasicTracerProvider } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Define your service name
const serviceName = 'nocternal-backend'; // Change this to 'nocternal-main' for the main service

// Tracer setup
const traceProvider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
  }),
});

// Configure the OTLPTraceExporter with the appropriate endpoint
const traceCollectorOptions = {
  endpoint: 'https://your-opentelemetry-collector-endpoint:port', // Replace with your OpenTelemetry Collector endpoint and port
};

const otlpTraceExporter = new OTLPTraceExporter(traceCollectorOptions);
traceProvider.addSpanProcessor(new BatchSpanProcessor(otlpTraceExporter));
traceProvider.register();

// Custom tracer
const tracer = traceProvider.getTracer(serviceName);

module.exports = { tracer };
