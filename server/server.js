
const express = require('express');
const path = require('path');
const api = require('./api');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

api(app);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT);

// TODO: Use some debug library.
// eslint-disable-next-line no-console
console.log(`Serving on port ${PORT}...`);
