const request = require('supertest');
const { app, startServer, pool } = require('./app');
const { tracer } = require('./tracer');
const { meter, pageViewsCounter, responseTimeHistogram } = require('./meter');

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

test('tracer should be an object and have startSpan method', () => {
  expect(typeof tracer).toBe('object');
  expect(typeof tracer.startSpan).toBe('function');
});

test('meter should be an object and have createCounter and createHistogram methods', () => {
  expect(typeof meter).toBe('object');
  expect(typeof meter.createCounter).toBe('function');
  expect(typeof meter.createHistogram).toBe('function');
});

test('pageViewsCounter should be an object and have add method', () => {
  expect(typeof pageViewsCounter).toBe('object');
  expect(typeof pageViewsCounter.add).toBe('function');
});

test('responseTimeHistogram should be an object and have record method', () => {
  expect(typeof responseTimeHistogram).toBe('object');
  expect(typeof responseTimeHistogram.record).toBe('function');
});
