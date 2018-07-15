
const express = require('express');
const { TicTacToe } = require('../../lib/TicTacToe/TicTacToe');

const app = express();

app.get('/new', (req, res) => {
  const game = new TicTacToe();
  if (game.turn === 0 && Math.random() >= 0.5) {
    game.nextTurn();
  }
  // TODO: Use a debug library
  console.log('/tic-tac-toe/new response:', game.toJSON());
  res.json(game.toJSON());
});

app.post('/move', (req, res) => {
  const { board, player1 } = req.body;
  const game = new TicTacToe(board, player1);
  if (game.checkWinner(player1)) {
    game.setWinner(player1);
  } else {
    game.nextTurn();
  }
  console.log('/tic-tac-toe/move response:', game.toJSON());
  res.json(game.toJSON());
});

module.exports = app;
