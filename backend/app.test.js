const request = require('supertest');
const app = require('./app');

describe('API tests', () => {
  test('Server should respond with status 200 on root path', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
