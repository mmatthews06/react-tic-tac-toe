
const express = require('express');

const { TicTacToe } = require('../../lib/TicTacToe/TicTacToe');

const app = express();

app.get('/new', (req, res) => res.json(new TicTacToe()));

module.exports = app;
