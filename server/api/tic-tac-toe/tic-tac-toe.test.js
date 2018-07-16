/* global describe, expect, it */
const request = require('supertest');
const { app } = require('../../app');

const _ = 0;
const X = 1;
const O = 4;

describe('Tic-Tac-Toe Express App', () => {
  describe('/tic-tac-toe/new', () => {
    it('should return 200 for a new board.', async () => {
      const response = await request(app).get('/tic-tac-toe//new');
      expect(response.statusCode).toBe(200);
    });

    it('should return a valid board with potentially 1 move.', async () => {
      expect.assertions(3);

      const response = await request(app).get('/tic-tac-toe//new');
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
        expect(sum).toBe(0);
      }
    });
  });

  describe('/tic-tac-toe/move', () => {
    it('should inform the player they have won.', async () => {
      expect.assertions(2);
      const game = {
        board: [
          X, X, X,
          _, _, _,
          _, _, _,
        ],
        player1: X,
      };
      const response = await request(app)
        .post('/tic-tac-toe/move')
        .send(game)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        board: game.board,
        ended: true,
        winner: X,
        player1: 1,
        player2: 4,
      });
    });

    it('should make a move if the user has\'t won.', async () => {
      expect.assertions(2);
      const game = {
        board: [
          X, X, O,
          _, _, _,
          _, _, _,
        ],
        player1: X,
      };
      const response = await request(app)
        .post('/tic-tac-toe/move')
        .send(game)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        board: [
          X, X, O,
          _, _, _,
          _, _, O,
        ],
        ended: false,
        winner: null,
        player1: 1,
        player2: 4,
      });
    });
  });
});
