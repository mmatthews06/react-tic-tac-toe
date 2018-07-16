/* global fetch */
import React from 'react';

import GameBoard from '../../components/game-board/GameBoard';

export default class GameBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitPlayerMove = this.submitPlayerMove.bind(this);

    // TODO: Handle loading state properly.
    this.state = {
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
    // TODO: Handle errors properly
    fetch('/tic-tac-toe/new')
      .then(resp => resp.json())
      .then(game => this.setState({ game }))
      .catch(err => console.log('Error', err));
  }

  submitPlayerMove(position) {
    const { game } = this.state;
    if (game.ended) {
      return;
    }
    game.board[position] = game.player1;
    fetch('/tic-tac-toe/move', {
      method: 'POST',
      body: JSON.stringify(game),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(resp => resp.json())
      .then(resp => this.setState({ game: resp }))
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
        { endMessage && (
          <p>
            {endMessage}
          </p>
        )}
        <GameBoard
          board={board}
          disabled={ended}
          playerMoveHandler={this.submitPlayerMove}
        />
      </React.Fragment>
    );
  }
}
