
import React from 'react';
import PropTypes from 'prop-types';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.squareClicked = this.squareClicked.bind(this);
    this.calculateLines = this.calculateLines.bind(this);
  }

  squareClicked(square) {
    this.console.log('Square clicked!', square);
  }

  calculateLines() {
    const { height, width } = this.props;
    // const oneThirdHeight = height / 3;
    // const twoThirdsHeight = oneThirdHeight * 2;
    const oneThirdWidth = width / 3;
    // const twoThirdsWidth = oneThirdWidth * 2;

    return [
      {
        x1: oneThirdWidth, y1: 0, x2: oneThirdWidth, y2: height,
      },
    ];
  }

  render() {
    return (
      <svg>
        <line x1={20} y1={20} x2={20} y2={200} stroke="red" strokeWidth={2} />
      </svg>
    );
  }
}

GameBoard.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
}

GameBoard.defaultProps = {
  height: 500,
  width: 500
}
