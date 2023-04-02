const request = require('supertest');
const { app, startServer, pool } = require('./app');
const { pool } = require('./app');

let server;

describe('API tests', () => {
  beforeAll(async () => {
    server = startServer();
    await pool.connect();
  });

  afterAll(async () => {
    server.close();
    await pool.end(); // Close the PostgreSQL connection
  });

  test('Server should respond with status 200 on root path', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });

});
