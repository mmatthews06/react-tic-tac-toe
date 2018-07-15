
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

function lineVals(board, line) {
  return line.map(i => board[i]);
}

function checkWinner(board, player) {
  const winSum = 3 * player;
  return LINES.some((line) => {
    const lineSum = lineVals(board, line).reduce((s, i) => s + i, 0);
    return lineSum === winSum;
  });
}

module.exports = {
  checkWinner,
};
