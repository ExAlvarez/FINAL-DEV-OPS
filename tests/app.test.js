const request = require('supertest');
const app = require('../src/app');

describe('API de Biblioteca', () => {

  it('GET /health debería responder { status: "OK" }', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });

  it('GET /libros debería devolver una lista', async () => {
    const res = await request(app).get('/libros');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /autores debería devolver una lista', async () => {
    const res = await request(app).get('/autores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});