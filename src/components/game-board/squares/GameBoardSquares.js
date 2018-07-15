
import React from 'react';
import PropTypes from 'prop-types';

import GameSquare from '../../game-square/GameSquare';
import EmptyPieceSVG from '../../game-pieces/empty-svg/EmptyPieceSVG';
import XPieceSVG from '../../game-pieces/x-svg/XPieceSVG';
import OPieceSVG from '../../game-pieces/o-svg/OPieceSVG';

// TODO: Move much of this to a common library.
const pieces = { 0: EmptyPieceSVG, 1: XPieceSVG, 4: OPieceSVG };
function piece(pieceNum) {
  const PieceName = pieces[pieceNum];
  return (<PieceName margin={25} />);
}

export default function GameBoardSquares({ board, height, width, playerMoveHandler }) {
  const oneThirdHeight = height / 3;
  const twoThirdsHeight = oneThirdHeight * 2;
  const oneThirdWidth = width / 3;
  const twoThirdsWidth = oneThirdWidth * 2;
  const sHeight = oneThirdHeight;
  const sWidth = oneThirdWidth;

  return (
    <React.Fragment>
      {/* top-left */}
      <GameSquare
        x={0}
        y={0}
        height={sHeight}
        width={sWidth}
        position={0}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[0])}
      </GameSquare>
      {/* "top-middle" */}
      <GameSquare
        x={oneThirdWidth}
        y={0}
        height={sHeight}
        width={sWidth}
        position={1}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[1])}
      </GameSquare>
      {/* "top-right" */}
      <GameSquare
        x={twoThirdsWidth}
        y={0}
        height={sHeight}
        width={sWidth}
        position={2}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[2])}
      </GameSquare>
      {/* "middle-left" */}
      <GameSquare
        x={0}
        y={oneThirdHeight}
        height={sHeight}
        width={sWidth}
        position={3}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[3])}
      </GameSquare>
      {/* "middle-middle" */}
      <GameSquare
        x={oneThirdWidth}
        y={oneThirdHeight}
        height={sHeight}
        width={sWidth}
        position={4}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[4])}
      </GameSquare>
      {/* "middle-right" */}
      <GameSquare
        x={twoThirdsWidth}
        y={oneThirdHeight}
        height={sHeight}
        width={sWidth}
        position={5}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[5])}
      </GameSquare>
      {/* "bottom-left" */}
      <GameSquare
        x={0}
        y={twoThirdsHeight}
        height={sHeight}
        width={sWidth}
        position={6}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[6])}
      </GameSquare>
      {/* "bottom-middle" */}
      <GameSquare
        x={oneThirdWidth}
        y={twoThirdsHeight}
        height={sHeight}
        width={sWidth}
        position={7}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[7])}
      </GameSquare>
      {/* "bottom-right" */}
      <GameSquare
        x={twoThirdsWidth}
        y={twoThirdsHeight}
        height={sHeight}
        width={sWidth}
        position={8}
        playerMoveHandler={playerMoveHandler}
      >
        {piece(board[8])}
      </GameSquare>
    </React.Fragment>
  );
}

GameBoardSquares.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  playerMoveHandler: PropTypes.func.isRequired,
};
