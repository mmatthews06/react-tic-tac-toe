
import React from 'react';
import PropTypes from 'prop-types';

export default function GameBoardSquares({ board }) {
  return (
    <div>
      {board}
    </div>
  );
}

GameBoardSquares.propTypes = {
  board: PropTypes.arrayOf(PropTypes.number).isRequired,
};
