/* global fetch */
import React from 'react';

import GameBoard from '../../components/game-board/GameBoard';

export default class GameBoardContainer extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Handle loading state properly.
    this.state = {
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }

  componentDidMount() {
    // TODO: Handle errors properly
    fetch('/tic-tac-toe/new')
      .then(resp => resp.json())
      .then(resp => this.setState({ board: resp.board }))
      .catch(err => console.log('Error', err));
  }

  render() {
    const { board } = this.state;
    return (
      <GameBoard board={board} />
    );
  }
}
