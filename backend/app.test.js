const request = require('supertest');
const { app, startServer, pool } = require('./app');

let server;
beforeAll(() => {
  console.log('Server started for testing');
  server = startServer({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });
});

afterAll(async () => {
  server.close();
  console.log('Server closed after testing');
  await pool.end(); // Close the PostgreSQL connection
}, 20000);

describe('API tests', () => {
  test('Server should respond with status 200 on root path', async () => {
    const response = await request(server).get('/');
    console.log('Received response from root path');
    expect(response.statusCode).toBe(200);
  });
});
