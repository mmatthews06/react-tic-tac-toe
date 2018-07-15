/* global describe, expect, it */
const { checkWinner } = require('./tic-tac-toe');

const _ = 0;
const X = 1;
const O = 4;

describe('TicTacToe', () => {
  describe('checkWinner', () => {
    // TODO: Need far more exhaustive `checkWinner` tests.
    it('should find a vertical X winner', () => {
      const board = [
        X, _, _,
        X, _, _,
        X, O, O,
      ];
      expect(checkWinner(board, X)).toBe(true);
    });

    it('should find a vertical O winner', () => {
      const board = [
        O, O, _,
        O, X, _,
        O, X, O,
      ];
      expect(checkWinner(board, O)).toBe(true);
    });

    it('should find a horizontal X winner', () => {
      const board = [
        X, X, X,
        O, O, _,
        O, X, O,
      ];
      expect(checkWinner(board, X)).toBe(true);
    });
  });
});
