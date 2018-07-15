
import React from 'react';
import PropTypes from 'prop-types';

import GameBoardSquares from './squares/GameBoardSquares';
import GameBoardLines from './lines/GameBoardLines';

export default function GameBoard({ board, height, width }) {
  return (
    <svg height={height} width={width}>
      <GameBoardLines
        height={height}
        width={width}
      />
      <GameBoardSquares
        height={height}
        width={width}
        board={board}
      />
    </svg>
  );
}

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number),
  height: PropTypes.number,
  width: PropTypes.number,
};

GameBoard.defaultProps = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  height: 500,
  width: 500,
};
