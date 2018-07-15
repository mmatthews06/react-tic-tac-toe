
const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

// Add APIs to the app.
api(app);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

module.exports.app = app;
