/* global describe, expect, it */
const request = require('supertest');
const app = require('./tic-tac-toe');

describe('Tic-Tac-Toe Express App', () => {
  it('should return 200 for a new board.', async () => {
    const response = await request(app).get('/new');
    expect(response.statusCode).toBe(200);
  });

  it('should return a valid board with potentially 1 move.', async () => {
    expect.assertions(3);

    const response = await request(app).get('/new');
    expect(response.statusCode).toBe(200);

    const game = response.body;
    const sum = game.board.reduce((s, i) => s + i, 0);

    expect(game).toMatchObject({
      ended: false,
      winner: null,
      player1: 1,
      player2: 4,
    });

    if (game.turn === 1) {
      expect(sum).toBe(4);
    } else {
      expect(sum).toBe(1);
    }
  });
});
