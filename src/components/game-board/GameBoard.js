
import React from 'react';
import PropTypes from 'prop-types';

import GameBoardSquares from './squares/GameBoardSquares';

import './GameBoard.css';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.squareClicked = this.squareClicked.bind(this);
    this.calculateLines = this.calculateLines.bind(this);
  }

  /* eslint-disable-next-line  */
  squareClicked(square) {
    console.log('Square clicked!', square);
  }

  calculateLines() {
    const { height, width } = this.props;
    const oneThirdHeight = height / 3;
    const twoThirdsHeight = oneThirdHeight * 2;
    const oneThirdWidth = width / 3;
    const twoThirdsWidth = oneThirdWidth * 2;

    return [
      {
        x1: oneThirdWidth, y1: 0, x2: oneThirdWidth, y2: height,
      },
      {
        x1: twoThirdsWidth, y1: 0, x2: twoThirdsWidth, y2: height,
      },
      {
        x1: 0, y1: oneThirdHeight, x2: width, y2: oneThirdHeight,
      },
      {
        x1: 0, y1: twoThirdsHeight, x2: width, y2: twoThirdsHeight,
      },
    ];
  }

  render() {
    const { height, width } = this.props;
    const lines = this.calculateLines().map(
      coords => <line key={`${coords.x1}-${coords.y1}`} {...coords} />,
    );

    return (
      <svg height={height} width={width}>
        {lines}
        <GameBoardSquares
          height={height}
          width={width}
          board={[0, 0, 0, 1, 1, 1, 2, 2, 2]}
        />
      </svg>
    );
  }
}

GameBoard.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

GameBoard.defaultProps = {
  height: 500,
  width: 500,
};
