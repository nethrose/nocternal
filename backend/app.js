// editing this line to trigger the backend CI
const express = require('express');
const { Pool } = require('pg');
const { trace } = require('@opentelemetry/api');

const app = express();
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.post('/ingest', (req, res) => {
  const span = trace.getTracer('backend').startSpan('ingest');
  // Ingest and process the OpenTelemetry data.
  // You can use the OpenTelemetry Collector or implement custom processing logic.
  span.end();
  res.sendStatus(200);
});

const startServer = () => {
  const server = app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });

  return server;
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = { app, startServer, pool };
