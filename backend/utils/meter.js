const opentelemetry = require('@opentelemetry/api');
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Initialize the MeterProvider
const meterProvider = new MeterProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'your-service-name',
  }),
});

// Set the global MeterProvider
opentelemetry.setGlobalMeterProvider(meterProvider);

// Create a metric instrument
const requestCounter = opentelemetry.getMeter('your-service-name').createCounter('request_count', {
  description: 'Counts the number of incoming requests',
});

module.exports = { requestCounter };
