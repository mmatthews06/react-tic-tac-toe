
import React from 'react';
import PropTypes from 'prop-types';

export default function GameBoardLines({ height, width }) {
  return (
    <div>
      {height}
      {width}
    </div>
  );
}

GameBoardLines.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
