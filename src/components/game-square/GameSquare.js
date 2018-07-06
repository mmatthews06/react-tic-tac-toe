
import React from 'react';
import PropTypes from 'prop-types';

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
      <rect x="0" y="0" height="100%" width="100%" fill="transparent" />
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
