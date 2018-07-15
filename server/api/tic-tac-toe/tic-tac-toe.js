
const express = require('express');

const { TicTacToe } = require('../../lib/TicTacToe/TicTacToe');

const app = express();

app.get('/new', (req, res) => res.json(new TicTacToe()));

// app.post('/move', (req, res) => {
//   const { board, player } = req.body;
//   console.log('/move Board:', board);
//   console.log('/move Player:', player);
// });

module.exports = app;
