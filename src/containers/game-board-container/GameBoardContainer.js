/* global fetch */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

import BablyonBoard from '../../components/bablyon-board/BablyonBoard';
import GameBoard from '../../components/game-board/GameBoard';

class GameBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.boardChange = this.boardChange.bind(this);
    this.getBoardRenderer = this.getBoardRenderer.bind(this);
    this.newGame = this.newGame.bind(this);
    this.submitPlayerMove = this.submitPlayerMove.bind(this);

    // TODO: Handle loading state properly.
    this.state = {
      boardRenderer: 'svgBoard',
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

  getBoardRenderer() {
    const { boardRenderer } = this.state;
    switch (boardRenderer) {
      case 'bablyonBoard':
        return BablyonBoard;
      case 'svgBoard':
      default:
        return GameBoard;
    }
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

  boardChange(event) {
    this.setState({ boardRenderer: event.target.value });
  }

  render() {
    const { boardRenderer, game } = this.state;
    const { board, ended } = game;
    const endMessage = this.gameEndMessage();

    const Board = this.getBoardRenderer();

    return (
      <React.Fragment>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={16}
        >
          <Grid container justify="center">
            <Grid item style={{ padding: 5 }}>
              <Button variant="contained" color="primary" onClick={this.newGame}>
                New Game
              </Button>
            </Grid>
            <Grid item style={{ padding: 5 }}>
              <FormControl component="fieldset">
                <RadioGroup
                  name="boardRenderer"
                  aria-label="Board Renderer"
                  value={boardRenderer}
                  onChange={this.boardChange}
                  row
                >
                  <FormControlLabel value="svgBoard" control={<Radio />} label="SVG Board" />
                  <FormControlLabel value="bablyonBoard" control={<Radio />} label="Bablyon Board" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <span style={{ height: 20 }}>
            {endMessage}
          </span>
          <Grid item>
            <Board
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
