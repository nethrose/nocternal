const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { MeterProvider } = require('@opentelemetry/sdk-metrics-base');

// Initialize the Tracer Provider
const tracerProvider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'nocternal',
  }),
});

// Configure the console exporter and span processor
const consoleExporter = new ConsoleSpanExporter();
const consoleSpanProcessor = new SimpleSpanProcessor(consoleExporter);
tracerProvider.addSpanProcessor(consoleSpanProcessor);

// Configure the OTLP exporter and span processor
const otlpExporter = new CollectorTraceExporter();
const otlpSpanProcessor = new SimpleSpanProcessor(otlpExporter);
tracerProvider.addSpanProcessor(otlpSpanProcessor);

// Register the tracer provider
tracerProvider.register();

// Initialize the Meter Provider
const meterProvider = new MeterProvider();
const ingestRequestCounter = meter.createCounter('ingest_requests_total', {
  description: 'Total number of successful requests to the /ingest endpoint',
});

// Register the instrumentations
registerInstrumentations({
  tracerProvider,
  meterProvider,
  instrumentations: [
    getNodeAutoInstrumentations(),
  ],
});

console.log('Tracer and meter providers initialized.');
