const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool();

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

module.exports = { app, startServer, pool };
