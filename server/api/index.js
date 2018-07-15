
const ticTacToe = require('./tic-tac-toe/tic-tac-toe');

module.exports = (app) => {
  app.use('/tic-tac-toe', ticTacToe);
};
