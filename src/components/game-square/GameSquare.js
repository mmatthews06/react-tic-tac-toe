
import React from 'react';
import PropTypes from 'prop-types';

import EmptyPieceSVG from '../game-pieces/empty-svg/EmptyPieceSVG';
import XPieceSVG from '../game-pieces/x-svg/XPieceSVG';

// eslint-disable-next-line object-curly-newline
export default function GameSquare({ x, y, height, width, position }) {
  return (
    <svg
      x={x}
      y={y}
      height={height}
      width={width}
      onClick={() => console.log(`${position} ${x} ${y} ${height} ${width}`)}
    >
      <XPieceSVG />
    </svg>
  );
}

GameSquare.propTypes = {
  position: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
