const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// You can add other middleware, route handlers, and configurations above this line.

const PORT = process.env.PORT || 3001;
// Change the line where you listen to the server to assign it to a constant 'server'
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the 'server' constant, so it can be used in your test file
module.exports = server;
