
import React from 'react';
import PropTypes from 'prop-types';

import EmptyPieceSVG from '../game-pieces/empty-svg/EmptyPieceSVG';

// eslint-disable-next-line object-curly-newline
export default function GameSquare({ x, y, height, width, position, children }) {
  return (
    <svg
      id={`${position}-square`}
      x={x}
      y={y}
      height={height}
      width={width}
      onClick={() => console.log(`${position} ${x} ${y} ${height} ${width}`)}
    >
      {children}
    </svg>
  );
}

GameSquare.propTypes = {
  children: PropTypes.element,
  position: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

GameSquare.defaultProps = {
  children: <EmptyPieceSVG />,
};
