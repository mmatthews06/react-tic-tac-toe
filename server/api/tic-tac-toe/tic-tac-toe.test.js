/* global describe, expect, it */
const request = require('supertest');
const app = require('./tic-tac-toe');

describe('Tic-Tac-Toe Express App', () => {
  it('should return a new board.', async () => {
    const response = await request(app).get('/new');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      turn: 0,
      ended: false,
      winner: null,
      player1: 1,
      player2: 4,
    });
  });
});
