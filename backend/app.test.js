const request = require('supertest');
const { app, startServer, pool } = require('./app');

let server;

beforeAll(async () => {
  server = await startServer();
});

afterAll(async () => {
  await server.close();
  await pool.end();
});

test('GET / should return 200', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toEqual(200);
  expect(res.text).toEqual('Hello, world!');
});

test('POST /ingest should return 200', async () => {
  const res = await request(app).post('/ingest').send({ traceId: 'sampleTraceId' });
  expect(res.statusCode).toEqual(200);
});
