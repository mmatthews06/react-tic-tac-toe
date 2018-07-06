
import React from 'react';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.squareClicked = this.squareClicked.bind(this);
  }

  squareClicked(square) {
    this.console.log('Square clicked!', square);
  }

  render() {
    return (
      <span>
        Hello!
      </span>
    );
  }
}
