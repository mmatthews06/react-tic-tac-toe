/* global fetch */
import React from 'react';

import GameBoard from '../../components/game-board/GameBoard';

export default class GameBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitPlayerMove = this.submitPlayerMove.bind(this);

    // TODO: Handle loading state properly.
    this.state = {
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }

  componentDidMount() {
    // TODO: Handle errors properly
    fetch('/tic-tac-toe/new')
      .then(resp => resp.json())
      .then(resp => this.setState({ board: resp.board, game: resp }))
      .catch(err => console.log('Error', err));
  }

  submitPlayerMove(position) {
    const { game } = this.state;
    game.board[position] = game.player1;
    fetch('/tic-tac-toe/move', {
      method: 'POST',
      body: JSON.stringify(game),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(resp => resp.json())
      .then(resp => this.setState({ board: resp.board, game: resp }))
      .catch(err => console.log('Error', err));
  }

  render() {
    const { board } = this.state;
    return (
      <GameBoard
        board={board}
        playerMoveHandler={this.submitPlayerMove}
      />
    );
  }
}
