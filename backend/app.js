// edit this line to trigger the backend CI

var apm = require('elastic-apm-node').start({
  
  serviceName: "nocternal",
  secretToken: process.env.ELASTIC_SERVICE_TOKEN,
  serverUrl: process.env.ELASTIC_SERVER_URL
})

const express = require('express');
const { Pool } = require('pg');
const { tracer } = require('./utils/tracer');
const { requestCounter } = require('./utils/meter');

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

const startServer = () => {
  const server = app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });

  return server;
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = { app, startServer, pool, requestCounter };
