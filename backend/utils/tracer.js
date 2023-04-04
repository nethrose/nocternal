const { WebTracerProvider } = require('@opentelemetry/sdk-trace-web');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { MeterProvider, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');

// Tracer setup
const traceProvider = new BasicTracerProvider();
const traceExporter = new OTLPTraceExporter(traceCollectorOptions);
traceProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
traceProvider.register();

// Metric setup
const metricExporter = new OTLPMetricExporter(metricCollectorOptions);
const meterProvider = new MeterProvider({});
meterProvider.addMetricReader(new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 1000,
}));

// Custom tracer, span, and metric names
const tracer = traceProvider.getTracer('nocturnal-tracer');
const meter = meterProvider.getMeter('nocturnal-metrics');

// Create custom metrics
const pageViewsCounter = meter.createCounter('page_views', {
  description: 'Counts the number of page views',
});

const responseTimeHistogram = meter.createHistogram('response_time', {
  description: 'Records response times in milliseconds',
  boundaries: [50, 100, 200, 300, 400, 500, 1000],
});

// Example usage
function handleRequest(request, response) {
  const requestSpan = tracer.startSpan('handleRequest', {
    attributes: {
      'http.method': request.method,
      'http.url': request.url,
    },
  });

  // Simulate request processing time
  const processingTime = Math.floor(Math.random() * 1000);
  setTimeout(() => {
    responseTimeHistogram.record(processingTime, { 'route': request.url });
    pageViewsCounter.add(1, { 'route': request.url });

    // End the request span
    requestSpan.end();

    // Send the response
    response.send('Request processed.');
  }, processingTime);
}

// Example usage with an HTTP server
const http = require('http');
const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});

