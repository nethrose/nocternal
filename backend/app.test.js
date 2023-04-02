const request = require('supertest');
const server = require('./app');

describe('API tests', () => {
  afterAll(() => {
    server.close();
  });

  test('Server should respond with status 200 on root path', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });
});
