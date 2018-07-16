/* global fetch */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import GameBoard from '../../components/game-board/GameBoard';

class GameBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
    this.submitPlayerMove = this.submitPlayerMove.bind(this);

    // TODO: Handle loading state properly.
    this.state = {
      isLoading: true,
      game: {
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ended: false,
        player1: 1,
        player2: 4,
        turn: 0,
        winner: null,
      },
    };
  }

  componentDidMount() {
    this.newGame();
  }

  newGame() {
    this.setState({ isLoading: true });
    fetch('/tic-tac-toe/new')
      .then(resp => resp.json())
      .then(game => this.setState({ game, isLoading: false }))
      .catch(err => console.log('Error', err));
  }

  submitPlayerMove(position) {
    const { game, isLoading } = this.state;
    if (game.ended || isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    game.board[position] = game.player1;
    fetch('/tic-tac-toe/move', {
      method: 'POST',
      body: JSON.stringify(game),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(resp => resp.json())
      .then(resp => this.setState({ game: resp, isLoading: false }))
      .catch(err => console.log('Error', err));
  }

  gameEndMessage() {
    const { game } = this.state;
    const { ended, winner, player1 } = game;
    if (!ended) {
      return '';
    }

    if (winner) {
      const winnerName = winner === player1 ? 'Player 1' : 'Player 2';
      return `${winnerName} won!`;
    }

    return 'Draw. Try again.';
  }

  render() {
    const { game } = this.state;
    const { board, ended } = game;
    const endMessage = this.gameEndMessage();

    return (
      <React.Fragment>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={16}
        >
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.newGame}>
              New Game
            </Button>
          </Grid>
          <span style={{ height: 20 }}>
            {endMessage}
          </span>
          <Grid item>
            <GameBoard
              board={board}
              disabled={ended}
              playerMoveHandler={this.submitPlayerMove}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default GameBoardContainer;
