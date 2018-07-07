
import React from 'react';
import PropTypes from 'prop-types';

import './GameBoardLines.css';

export default function GameBoardLines({ height, width }) {
  const oneThirdHeight = height / 3;
  const twoThirdsHeight = oneThirdHeight * 2;
  const oneThirdWidth = width / 3;
  const twoThirdsWidth = oneThirdWidth * 2;

  return (
    <React.Fragment>
      <line className="game-board-line" x1={oneThirdWidth} y1={0} x2={oneThirdWidth} y2={height} />
      <line className="game-board-line" x1={twoThirdsWidth} y1={0} x2={twoThirdsWidth} y2={height} />
      <line className="game-board-line" x1={0} y1={oneThirdHeight} x2={width} y2={oneThirdHeight} />
      <line className="game-board-line" x1={0} y1={twoThirdsHeight} x2={width} y2={twoThirdsHeight} />
    </React.Fragment>
  );
}

GameBoardLines.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
