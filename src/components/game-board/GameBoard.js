
import React from 'react';
import PropTypes from 'prop-types';

import GameBoardSquares from './squares/GameBoardSquares';
import GameBoardLines from './lines/GameBoardLines';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.squareClicked = this.squareClicked.bind(this);
  }

  /* eslint-disable-next-line  */
  squareClicked(square) {
    console.log('Square clicked!', square);
  }

  render() {
    const { height, width } = this.props;

    return (
      <svg height={height} width={width}>
        <GameBoardLines
          height={height}
          width={width}
        />
        <GameBoardSquares
          height={height}
          width={width}
          board={[0, 0, 0, 1, 1, 1, 2, 2, 2]}
        />
      </svg>
    );
  }
}

GameBoard.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

GameBoard.defaultProps = {
  height: 500,
  width: 500,
};
