
import React from 'react';
import PropTypes from 'prop-types';

import GameSquare from '../game-square/GameSquare';

import './GameBoard.css';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.squareClicked = this.squareClicked.bind(this);
    this.calculateLines = this.calculateLines.bind(this);
    this.gameSquares = this.gameSquares.bind(this);
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

  gameSquares() {
    const { height, width } = this.props;
    const oneThirdHeight = height / 3;
    const twoThirdsHeight = oneThirdHeight * 2;
    const oneThirdWidth = width / 3;
    const twoThirdsWidth = oneThirdWidth * 2;
    const sHeight = oneThirdHeight;
    const sWidth = oneThirdWidth;

    return [
      <GameSquare x={0} y={0} height={sHeight} width={sWidth} position="top-left" />,
      <GameSquare x={oneThirdWidth} y={0} height={sHeight} width={sWidth} position="top-middle" />,
      <GameSquare x={twoThirdsWidth} y={0} height={sHeight} width={sWidth} position="top-right" />,
      <GameSquare x={0} y={oneThirdHeight} height={sHeight} width={sWidth} position="middle-left" />,
      <GameSquare x={oneThirdWidth} y={oneThirdHeight} height={sHeight} width={sWidth} position="middle-middle" />,
      <GameSquare x={twoThirdsWidth} y={oneThirdHeight} height={sHeight} width={sWidth} position="middle-right" />,
      <GameSquare x={0} y={twoThirdsHeight} height={sHeight} width={sWidth} position="bottom-left" />,
      <GameSquare x={oneThirdWidth} y={twoThirdsHeight} height={sHeight} width={sWidth} position="bottom-middle" />,
      <GameSquare x={twoThirdsWidth} y={twoThirdsHeight} height={sHeight} width={sWidth} position="bottom-right" />,
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
        {this.gameSquares()}
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
