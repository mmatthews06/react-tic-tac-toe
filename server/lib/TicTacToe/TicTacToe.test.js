/* global describe, expect, it */
const {
  TicTacToe,
  EMPTY: _,
  X,
  O,
} = require('./TicTacToe');

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

  describe('nextTurn', () => {
    it('first move: pick a corner', () => {
      const game = new TicTacToe();
      const finished = game.nextTurn();
      const movePos = game.board.indexOf(O);
      expect(finished).toBe(false);
      expect([0, 2, 6, 8]).toContain(movePos);
    });

    describe('winning moves', () => {
      it('should happen along a diagonal', () => {
        const game = new TicTacToe([
          X, _, O,
          _, O, _,
          _, _, X,
        ]);

        const finished = game.nextTurn();
        expect(finished).toBe(true);
        expect(game.board).toEqual([
          X, _, O,
          _, O, _,
          O, _, X,
        ]);
      });

      it('should happen along a row', () => {
        const game = new TicTacToe([
          O, _, O,
          _, X, _,
          _, _, X,
        ]);

        const finished = game.nextTurn();
        expect(finished).toBe(true);
        expect(game.board).toEqual([
          O, O, O,
          _, X, _,
          _, _, X,
        ]);
      });

      it('should happen for the non-default player', () => {
        const game = new TicTacToe([
          O, _, O,
          _, _, _,
          X, _, X,
        ], O);

        const finished = game.nextTurn();
        expect(finished).toBe(true);
        expect(game.board).toEqual([
          O, _, O,
          _, _, _,
          X, X, X,
        ]);
      });
    });

    describe('blocking moves', () => {
      it('should happen along a diagonal', () => {
        const game = new TicTacToe([
          X, _, O,
          _, O, _,
          _, _, X,
        ], O);

        const finished = game.nextTurn();
        expect(finished).toBe(false);
        expect(game.board).toEqual([
          X, _, O,
          _, O, _,
          X, _, X,
        ]);
      });

      it('should happen along a row', () => {
        const game = new TicTacToe([
          O, X, O,
          _, X, _,
          _, _, X,
        ], X);

        const finished = game.nextTurn();
        expect(finished).toBe(false);
        expect(game.board).toEqual([
          O, X, O,
          _, X, _,
          _, O, X,
        ]);
      });

      it('should happen for the default player', () => {
        const game = new TicTacToe([
          O, _, _,
          _, O, _,
          X, _, X,
        ]);

        const finished = game.nextTurn();
        expect(finished).toBe(false);
        expect(game.board).toEqual([
          O, _, _,
          _, O, _,
          X, O, X,
        ]);
      });
    });

    describe('forking behavior', () => {
      it('should block the best of the 2 positions', () => {
        const game = new TicTacToe([
          O, _, X,
          _, _, O,
          _, X, _,
        ], O);

        const finished = game.nextTurn();
        expect(finished).toBe(false);
        expect(game.board).toEqual([
          O, _, X,
          _, X, O,
          _, X, _,
        ]);
      });
    });

    describe('center square', () => {
      it('should pick this one readily', () => {
        const game = new TicTacToe([
          X, _, _,
          _, _, _,
          _, _, _,
        ]);

        const finished = game.nextTurn();
        expect(finished).toBe(false);
        expect(game.board).toEqual([
          X, _, _,
          _, O, _,
          _, _, _,
        ]);
      });
    });

    describe('opposite corner move', () => {
      it('should work along diagonal 1', () => {
        const game = new TicTacToe([
          O, _, _,
          _, X, _,
          _, _, _,
        ]);

        const finished = game.nextTurn();
        expect(finished).toBe(false);
        expect(game.board).toEqual([
          O, _, _,
          _, X, _,
          _, _, O,
        ]);
      });

      it('should work along diagonal 2', () => {
        const game = new TicTacToe([
          _, _, _,
          _, X, _,
          O, _, _,
        ]);

        const finished = game.nextTurn();
        expect(finished).toBe(false);
        expect(game.board).toEqual([
          _, _, O,
          _, X, _,
          O, _, _,
        ]);
      });
    });

    describe('first available corner', () => {
      const game = new TicTacToe([
        _, _, _,
        _, X, _,
        _, _, _,
      ]);
      const finished = game.nextTurn();
      const movePos = game.board.indexOf(O);
      expect(finished).toBe(false);
      expect(game.board.reduce((s, i) => s + i, 0)).toBe(X + O);
      expect([0, 2, 6, 8]).toContain(movePos);
    });

    describe('edge moves', () => {
      it('should move there sometimes', () => {
        const game = new TicTacToe([
          O, X, O,
          O, X, O,
          X, _, X,
        ]);
        const finished = game.nextTurn();
        expect(finished).toBe(false);
        expect(game.board).toEqual([
          O, X, O,
          O, X, O,
          X, O, X,
        ]);
      });
    });
  });
});
