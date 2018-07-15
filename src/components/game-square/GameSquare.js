
import React from 'react';
import PropTypes from 'prop-types';

import EmptyPieceSVG from '../game-pieces/empty-svg/EmptyPieceSVG';

export default function GameSquare({ x, y, height, width, position, children, playerMoveHandler }) {
  return (
    <svg
      id={`${position}-square`}
      x={x}
      y={y}
      height={height}
      width={width}
      onClick={() => playerMoveHandler(position)}
    >
      {children}
    </svg>
  );
}

GameSquare.propTypes = {
  children: PropTypes.element,
  position: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  playerMoveHandler: PropTypes.func.isRequired,
};

GameSquare.defaultProps = {
  children: <EmptyPieceSVG />,
};
