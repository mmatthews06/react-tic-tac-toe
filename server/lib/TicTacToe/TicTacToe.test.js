/* global describe, expect, it */
const { TicTacToe } = require('./TicTacToe');

const _ = 0;
const X = 1;
const O = 4;

describe('TicTacToe', () => {
  describe('turn calculation', () => {
    it('should be turn 0 by default', () => {
      const game = new TicTacToe();
      expect(game.turn).toBe(0);
    });
    it('should be turn 1 with one filled spot', () => {
      const game = new TicTacToe([
        X, _, _,
        _, _, _,
        _, _, _,
      ]);
      expect(game.turn).toBe(1);
    });
  });

  describe('player pieces', () => {
    it('should set player1 to X by default', () => {
      const game = new TicTacToe();
      expect(game.player1).toBe(X);
      expect(game.player2).toBe(O);
    });
    it('should set player2 to X if player1 is O', () => {
      const game = new TicTacToe([
        _, _, _,
        _, _, _,
        _, _, _,
      ], O);
      expect(game.player1).toBe(O);
      expect(game.player2).toBe(X);
    });
  });

  describe('checkWinner', () => {
    // TODO: Need far more exhaustive `checkWinner` tests.
    it('should find a vertical X winner', () => {
      const game = new TicTacToe([
        X, _, _,
        X, _, _,
        X, O, O,
      ]);
      expect(game.checkWinner(X)).toBe(true);
    });

    it('should find a vertical O winner', () => {
      const game = new TicTacToe([
        O, O, _,
        O, X, _,
        O, X, O,
      ]);
      expect(game.checkWinner(O)).toBe(true);
    });

    it('should find a horizontal X winner', () => {
      const game = new TicTacToe([
        X, X, X,
        O, O, _,
        O, X, O,
      ]);
      expect(game.checkWinner(X)).toBe(true);
    });

    it('should not find a winner with given board', () => {
      const game = new TicTacToe([
        X, O, X,
        O, O, _,
        O, X, X,
      ]);
      expect(game.checkWinner(X)).toBe(false);
      expect(game.checkWinner(O)).toBe(false);
    });
  });

  describe('sumAndSet', () => {
    it('should set a space that wins the game', () => {
      const game = new TicTacToe([
        X, _, X,
        _, _, _,
        _, _, _,
      ]);
      const line = [0, 1, 2];
      const goal = X * 2;

      expect(game.sumAndSet(line, goal, X)).toBe(true);
      expect(game.board).toEqual([
        X, X, X,
        _, _, _,
        _, _, _,
      ]);
    });

    it('should set a space that wins the game for O', () => {
      const game = new TicTacToe([
        O, X, X,
        _, O, _,
        _, _, _,
      ]);
      const line = [0, 4, 8];
      const goal = O * 2;

      expect(game.sumAndSet(line, goal, O)).toBe(true);
      expect(game.board).toEqual([
        O, X, X,
        _, O, _,
        _, _, O,
      ]);
    });
  });

  describe('forkablePositions', () => {
    it('should find a forkable position', () => {
      const game = new TicTacToe([
        X, _, O,
        _, O, _,
        _, _, X,
      ]);

      const positions = game.forkablePositions(X);
      expect(positions).toEqual([6]);
    });

    it('should find another forkable position', () => {
      const game = new TicTacToe([
        X, _, _,
        _, O, _,
        _, O, X,
      ]);

      const positions = game.forkablePositions(X);
      expect(positions).toEqual([2]);
    });

    it('should find 2 forkable positions', () => {
      const game = new TicTacToe([
        O, _, X,
        _, _, O,
        _, X, _,
      ]);

      const positions = game.forkablePositions(O);
      expect(positions).toEqual([3, 4]);
    });
  });

  describe('forkTestAndSet', () => {
    describe('for player1', () => {
      it('should fork a position for X', () => {
        const game = new TicTacToe([
          X, _, O,
          _, O, _,
          _, _, X,
        ]);

        const forked = game.forkTestAndSet(X, O);
        expect(forked).toBe(true);
        expect(game.board).toEqual([
          X, _, O,
          _, O, _,
          X, _, X,
        ]);
      });

      it('should fork another position for X', () => {
        const game = new TicTacToe([
          X, _, _,
          _, O, _,
          _, O, X,
        ]);

        const forked = game.forkTestAndSet(X, O);
        expect(forked).toBe(true);
        expect(game.board).toEqual([
          X, _, X,
          _, O, _,
          _, O, X,
        ]);
      });

      it('should find 2 forkable positions', () => {
        const game = new TicTacToe([
          O, _, X,
          _, _, O,
          _, X, _,
        ]);

        const forked = game.forkTestAndSet(O, X);
        expect(forked).toBe(true);
        expect(game.board).toEqual([
          O, _, X,
          O, _, O,
          _, X, _,
        ]);
      });
    });

    describe('to block the other player', () => {
      it('should block X before they fork', () => {
        const game = new TicTacToe([
          X, _, O,
          _, O, _,
          _, _, X,
        ]);

        const forked = game.forkTestAndSet(O, X);
        expect(forked).toBe(true);
        expect(game.board).toEqual([
          X, _, O,
          _, O, _,
          O, _, X,
        ]);
      });

      it('should block X again before they fork', () => {
        console.log('NEW TEST..................');
        const game = new TicTacToe([
          X, _, _,
          _, O, _,
          _, O, X,
        ]);

        const forked = game.forkTestAndSet(O, X);
        expect(forked).toBe(true);
        expect(game.board).toEqual([
          X, _, O,
          _, O, _,
          _, O, X,
        ]);
      });

      it('should block the best of the 2 positions', () => {
        const game = new TicTacToe([
          O, _, X,
          _, _, O,
          _, X, _,
        ]);

        const forked = game.forkTestAndSet(X, O);
        expect(forked).toBe(true);
        expect(game.board).toEqual([
          O, _, X,
          _, X, O,
          _, X, _,
        ]);
      });
    });
  });
});
