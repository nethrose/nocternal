const request = require('supertest');
const { app, startServer } = require('./app');
const { pool } = require('./app');

let server;

describe('API tests', () => {
  beforeAll(() => {
    server = startServer();
  });

  afterAll(() => {
    server.close();
    pool.end(); // Close the PostgreSQL connection
  });

  test('Server should respond with status 200 on root path', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });

});
