/* global describe, expect, it */
const request = require('supertest');
const { app } = require('./app');

describe('Root Express App', () => {
  it('should have a tic-tac-toe sub-app', async () => {
    const response = await request(app).get('/tic-tac-toe/new');
    expect(response.statusCode).toBe(200);
  });
});
