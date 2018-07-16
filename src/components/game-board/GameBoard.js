
import React from 'react';
import PropTypes from 'prop-types';

import GameBoardSquares from './squares/GameBoardSquares';
import GameBoardLines from './lines/GameBoardLines';
import './GameBoard.css';

export default function GameBoard({ board, disabled, height, width, playerMoveHandler }) {
  const disabledClass = disabled ? 'disabled' : '';
  return (
    <svg
      className={`game-board ${disabledClass}`}
      height={height}
      width={width}
    >
      <GameBoardLines
        height={height}
        width={width}
      />
      <GameBoardSquares
        height={height}
        width={width}
        board={board}
        playerMoveHandler={playerMoveHandler}
      />
    </svg>
  );
}

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  playerMoveHandler: PropTypes.func,
};

GameBoard.defaultProps = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  disabled: false,
  height: 500,
  width: 500,
  playerMoveHandler: () => {},
};
