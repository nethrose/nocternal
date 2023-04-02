const request = require('supertest');
const { app, startServer } = require('./app');
const { pool } = require('./app');

let server;

describe('API tests', () => {
  beforeAll(async () => {
    console.log('Server started for testing');
    server = startServer();
    await pool.connect();
    console.log('Connected to the database for testing');
  });

  afterAll(async () => {
    // Add a custom timeout for the afterAll hook
    jest.setTimeout(20000);
    server.close();
    console.log('Server closed after testing');
    await pool.end(); // Close the PostgreSQL connection
  });

  test('Server should respond with status 200 on root path', async () => {
    const response = await request(server).get('/');
    console.log('Received response from root path');
    expect(response.statusCode).toBe(200);
  });

});
