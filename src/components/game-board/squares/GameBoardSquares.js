
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

export default function GameBoardSquares({ board, height, width }) {
  const oneThirdHeight = height / 3;
  const twoThirdsHeight = oneThirdHeight * 2;
  const oneThirdWidth = width / 3;
  const twoThirdsWidth = oneThirdWidth * 2;
  const sHeight = oneThirdHeight;
  const sWidth = oneThirdWidth;

  return (
    <React.Fragment>
      <GameSquare x={0} y={0} height={sHeight} width={sWidth} position="top-left">
        {piece(board[0])}
      </GameSquare>
      <GameSquare x={oneThirdWidth} y={0} height={sHeight} width={sWidth} position="top-middle">
        {piece(board[1])}
      </GameSquare>
      <GameSquare x={twoThirdsWidth} y={0} height={sHeight} width={sWidth} position="top-right">
        {piece(board[2])}
      </GameSquare>
      <GameSquare x={0} y={oneThirdHeight} height={sHeight} width={sWidth} position="middle-left">
        {piece(board[3])}
      </GameSquare>
      <GameSquare x={oneThirdWidth} y={oneThirdHeight} height={sHeight} width={sWidth} position="middle-middle">
        {piece(board[4])}
      </GameSquare>
      <GameSquare x={twoThirdsWidth} y={oneThirdHeight} height={sHeight} width={sWidth} position="middle-right">
        {piece(board[5])}
      </GameSquare>
      <GameSquare x={0} y={twoThirdsHeight} height={sHeight} width={sWidth} position="bottom-left">
        {piece(board[6])}
      </GameSquare>
      <GameSquare x={oneThirdWidth} y={twoThirdsHeight} height={sHeight} width={sWidth} position="bottom-middle">
        {piece(board[7])}
      </GameSquare>
      <GameSquare x={twoThirdsWidth} y={twoThirdsHeight} height={sHeight} width={sWidth} position="bottom-right">
        {piece(board[8])}
      </GameSquare>
    </React.Fragment>
  );
}

GameBoardSquares.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
