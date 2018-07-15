const EMPTY = 0; // empty board position specifier
const X = 1; // "player" X's integer to put in the board
const O = 4; // "player" O's integer to put in the board
const DEFAULT_BOARD = [
  EMPTY, EMPTY, EMPTY,
  EMPTY, EMPTY, EMPTY,
  EMPTY, EMPTY, EMPTY,
];
// const END_WIN = 0
// const END_LOSS = 1
// const END_DRAW = 2
const ROW1 = [0, 1, 2]; // Indexes into the board list
const ROW2 = [3, 4, 5]; // Indexes into the board list
const ROW3 = [6, 7, 8]; // Indexes into the board list
const COL1 = [0, 3, 6]; // Indexes into the board list
const COL2 = [1, 4, 7]; // Indexes into the board list
const COL3 = [2, 5, 8]; // Indexes into the board list
const DIAG1 = [0, 4, 8]; // Indexes into the board list
const DIAG2 = [6, 4, 2]; // Indexes into the board list
const LINES = [ROW1, ROW2, ROW3, COL1, COL2, COL3, DIAG1, DIAG2];
const CENTER = 4; // Board's center index
const CORNERS = [0, 2, 6, 8]; // Board's corners
const EDGES = [1, 3, 5, 7]; // Board's edges

class TicTacToe {
  constructor(board = DEFAULT_BOARD, player1 = X) {
    this.board = Array.from(board);
    this.turn = this.getTurnNumber();
    this.ended = false;
    this.winner = null;
    this.player1 = player1;
    this.player2 = player1 === X ? O : X;
  }

  toJSON() {
    return {
      board: this.board,
      turn: this.turn,
      ended: this.ended,
      winner: this.winner,
      player1: this.player1,
      player2: this.player2,
    };
  }

  getTurnNumber() {
    return this.board.reduce(
      (empties, i) => (i === EMPTY ? empties - 1 : empties), 9,
    );
  }

  lineVals(line) {
    return line.map(i => this.board[i]);
  }

  lineSum(line) {
    return this.lineVals(line).reduce((s, i) => s + i, 0);
  }

  checkWinner(player) {
    const winSum = 3 * player;
    return LINES.some(line => this.lineSum(line) === winSum);
  }

  // makeMove(player, gridIndex) {
  //   // playerChar = this.O if player == this.player1 else this.X
  //   // otherPlayerChar = this.X if playerChar == this.O else this.O
  //   let endState = null;
  //   const playerChar = player === this.player1 ? O : X;
  //   const otherPlayerChar = playerChar === this.O ? X : O;
  //
  //   this.playerTurn(playerChar, gridIndex);
  //
  //   if (this.checkWinner(playerChar)) {
  //     this.winner = player;
  //     this.ended = true;
  //     // player.wins += 1;
  //     endState = END_WIN;
  //   }
  //
  //   if (this.nextTurn(otherPlayerChar)) {
  //     this.winner = this.player2;
  //     this.ended = true;
  //     // player.losses += 1
  //     endState = END_LOSS;
  //   }
  //
  //   if (!this.ended && this.turn >= 9) {
  //     this.ended = true;
  //     // player.draws += 1;
  //     endState = END_DRAW;
  //   }
  //
  //   return endState;
  // }

  nextTurn() {
    // Returns true if this the computer player won
    // with this turn's move.
    const player = this.player2;
    const otherPlayer = this.player1;

    // Pick a random corner if this is the beginning
    this.turn += 1;
    if (this.turn === 1) {
      const i = Math.floor(Math.random() * 4);
      this.board[CORNERS[i]] = player;
      return false;
    } if (this.turn >= 10) {
      // TODO: This should probably throw an error...
      return false;
    }

    // Try to win, check for two in a row
    const win = 2 * player;
    const finished = LINES.some((line) => {
      if (this.sumAndSet(line, win, player)) {
        return true;
      }
      return false;
    });

    if (finished) {
      return true;
    }

    // Try to block the other player
    const block = 2 * otherPlayer;
    const blocked = LINES.some((line) => {
      if (this.sumAndSet(line, block, player)) {
        return true;
      }
      return false;
    });

    if (blocked) {
      return false;
    }

    // Either try to fork, or block the opponent from forking.
    if (this.forkTestAndSet(player, otherPlayer)) {
      return false;
    }

    // Fill in the center, if available
    if (this.board[CENTER] === EMPTY) {
      this.board[CENTER] = player;
      return false;
    }

    // Fill in the corner caddy-corner to first corner
    if (this.turn === 3 && this.sumAndSet(DIAG1, X + O, player)) {
      return false;
    }
    if (this.turn === 3 && this.sumAndSet(DIAG2, X + O, player)) {
      return false;
    }

    // Fill in the first available corner:
    const cornerPicked = CORNERS.some((cornerIndex) => {
      if (this.board[cornerIndex] === EMPTY) {
        this.board[cornerIndex] = player;
        return true;
      }
      return false;
    });

    if (cornerPicked) {
      return false;
    }

    // Fill in the first available edge:
    const edgePicked = EDGES.some((edgeIndex) => {
      if (this.board[edgeIndex] === EMPTY) {
        this.board[edgeIndex] = player;
        return true;
      }
      return false;
    });

    if (edgePicked) {
      return false;
    }

    // TODO: This should definitely throw an exception, since we didn't
    // make a move.
    return false;
  }

  sumAndSet(line, goal, player) {
    let sum = 0;
    let zeroIndex = null;

    line.forEach((i) => {
      const c = this.board[i];
      sum += c;
      if (c === EMPTY) {
        zeroIndex = i;
      }
    });

    if (sum === goal) {
      this.board[zeroIndex] = player;
      return true;
    }

    return false;
  }

  forkTestAndSet(player, otherPlayer) {
    // Try to fork for this player:
    const playerForkPositions = this.forkablePositions(player);
    if (playerForkPositions.length > 0) {
      this.board[playerForkPositions[0]] = player;
      return true;
    }

    // Try to block a fork from the other player. That is, try to create
    // two in a row, then make sure the blocking position that the opponent
    // has to use isn't a fork position.
    const fPositions = this.forkablePositions(otherPlayer);
    if (fPositions.length === 0) {
      return false;
    }

    // Try to find a line that only has one of the player's characters,
    // and then fill in one that doesn't leave a fork position open.
    return LINES.some((line) => {
      const lineSum = this.lineSum(line);
      if (lineSum === otherPlayer) {
        const emptyPositions = [];
        line.forEach((i) => {
          if (this.board[i] === EMPTY) {
            emptyPositions.push(i);
          }
        });

        const pos1 = emptyPositions[0];
        const pos2 = emptyPositions[1];

        // If they're both fork positions, then find another
        // line to make the opponent block.
        if (fPositions.indexOf(pos1) > -1 && fPositions.indexOf(pos2) > -1) {
          return false;
        }

        if (fPositions.indexOf(pos1) > -1) {
          this.board[pos1] = player;
          return true;
        }

        this.board[pos2] = player;
        return true;
      }

      return false;
    });
  }

  forkablePositions(player) {
    /*
    * Look for a position that could be used to fork the board.
    * I.E. there are at least two paths that contain square A, that each
    * have exactly one "player" mark in them. Basically, checkmate in one
    * more move:
    * X _ O     X ~ *
    * _ O _     _ O _  Note, this second one would be covered by
    * * _ X  or _ O X  the step #2 blocking code
    *
    * This is relatively inefficient, but it's not really worth making
    * it faster.
    */
    const forkPositions = [];
    this.board.forEach((playerChar, index) => {
      if (playerChar !== EMPTY) {
        return;
      }

      let forkableLines = 0;
      LINES.forEach((line) => {
        const sum = this.lineSum(line);
        if (line.indexOf(index) > -1 && sum === player) {
          forkableLines += 1;
        }
      });
      if (forkableLines === 2) {
        forkPositions.push(index);
      }
    });

    return forkPositions;
  }
}

module.exports = {
  TicTacToe,
  EMPTY,
  X,
  O,
};
