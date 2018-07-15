/* eslint-disable consistent-return */
const DEFAULT_BOARD = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0,
];

const EMPTY = 0; // empty board position specifier
const END_WIN = 0
const END_LOSS = 1
const END_DRAW = 2
const X = 1; // "player" X's integer to put in the board
const O = 4; // "player" O's integer to put in the board
const ROW1 = (0, 1, 2); // Indexes into the board list
const ROW2 = (3, 4, 5); // Indexes into the board list
const ROW3 = (6, 7, 8); // Indexes into the board list
const COL1 = (0, 3, 6); // Indexes into the board list
const COL2 = (1, 4, 7); // Indexes into the board list
const COL3 = (2, 5, 8); // Indexes into the board list
const DIAG1 = (0, 4, 8); // Indexes into the board list
const DIAG2 = (6, 4, 2); // Indexes into the board list
const LINES = (ROW1, ROW2, ROW3, COL1, COL2, COL3, DIAG1, DIAG2);
const CENTER = 4; // Board's center index
const CORNERS = (0, 2, 6, 8); // Board's corners
const EDGES = (1, 3, 5, 7); // Board's edges

class TicTacToe {
  constructor(board = DEFAULT_BOARD) {
    this.board = board;
    this.turn = 0;
    this.ended = false;
    this.winner = null;
    this.player1 = 'Somebody';
    this.player2 = 'SomeoneElse';
  }

  makeMove(player, gridIndex) {
    // playerChar = this.O if player == this.player1 else this.X
    // otherPlayerChar = this.X if playerChar == this.O else this.O
    let endState = null;
    const playerChar = player === this.player1 ? O : X;
    const otherPlayerChar = playerChar === this.O ? X : O;

    this.playerTurn(playerChar, gridIndex);

    if (this.checkWinner(playerChar)) {
      this.winner = player;
      this.ended = true;
      // player.wins += 1;
      endState = END_WIN;
    }

    if (this.nextTurn(otherPlayerChar)) {
      this.winner = this.player2;
      this.ended = true;
      // player.losses += 1
      endState = END_LOSS;
    }

    if (!this.ended && this.turn >= 9) {
      this.ended = true;
      // player.draws += 1;
      endState = END_DRAW;
    }

    return endState;
  }

  nextTurn(player = X) {
    // Pick a random corner if this is the beginning
    this.turn += 1;
    if (this.turn === 1) {
      // const i = randrange(0, 3, 1);
      const i = Math.floor(Math.random() * 4);
      this.board[CORNERS[i]] = player;
      return false;
    } if (this.turn >= 10) {
      // TODO: This should probably throw an error...
      return false;
    }

    // otherPlayer = X if player == O else O
    const otherPlayer = player === O ? X : O;

    // Try to win, check for two in a row
    const win = 2 * player;
    // for line in this.LINES:
    LINES.forEach((line) => {
      if (this.sumAndSet(line, win, player)) {
        return true;
      }
    });

    // Try to block the other player
    const block = 2 * otherPlayer;
    // for line in this.LINES:
    LINES.forEach((line) => {
      if (this.sumAndSet(line, block, player)) {
        return false;
      }
    });

    // Either try to fork, or block the opponent from forking.
    // if this.forkTestAndSet(player, otherPlayer):
    if (this.forkTestAndSet(player, otherPlayer)) {
      return false;
    }

    // Fill in the center, if available
    // if this.board[CENTER] == EMPTY:
    if (this.board[CENTER] === EMPTY) {
      this.board[CENTER] = player;
      return false;
    }

    // Fill in the corner caddy-corner to first corner
    // if this.turn == 3 and this.sumAndSet(DIAG1, X+O, player):
    if (this.turn === 3 && this.sumAndSet(DIAG1, X + O, player)) {
      return false;
    }
    // if this.turn == 3 and this.sumAndSet(DIAG2, X+O, player):
    if (this.turn === 3 && this.sumAndSet(DIAG2, X + O, player)) {
      return false;
    }

    // Fill in the first available corner:
    // for cornerIndex in CORNERS:
    CORNERS.forEach((cornerIndex) => {
      if (this.board[cornerIndex] === EMPTY) {
        this.board[cornerIndex] = player;
        return false;
      }
    });

    // Fill in the first available corner:
    // for edgeIndex in this.EDGES:
    EDGES.forEach((edgeIndex) => {
      if (this.board[edgeIndex] === EMPTY) {
        this.board[edgeIndex] = player;
        return false;
      }
    });

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

  checkWinner(player) {
    const win = 3 * player;
    LINES.forEach((line) => {
      if sum(lineVals(line)) == win {
        return true;
      }
    });

    return false;
  }
}

module.exports = TicTacToe;
