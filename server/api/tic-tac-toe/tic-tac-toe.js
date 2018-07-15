
const express = require('express');

const { TicTacToe } = require('../../lib/TicTacToe/TicTacToe');

const app = express();

app.get('/new', (req, res) => {
  const game = new TicTacToe();
  if (game.turn === 0 && Math.random() >= 0.5) {
    game.nextTurn();
  }
  res.json(game);
});

module.exports = app;
