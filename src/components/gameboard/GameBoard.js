
import React from 'react';
import PropTypes from 'prop-types';

import './GameBoard.css';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.boardClicked = this.boardClicked.bind(this);
    this.squareClicked = this.squareClicked.bind(this);
    this.calculateLines = this.calculateLines.bind(this);
  }

  boardClicked(evt) {
    const { height, width } = this.props;
    const e = evt.target;
    const dim = e.getBoundingClientRect();
    const x = evt.clientX - dim.left;
    const y = evt.clientY - dim.top;
    console.log(`X: ${x}, Y: ${y}`);

    const oneThirdHeight = height / 3;
    const twoThirdsHeight = oneThirdHeight * 2;
    const oneThirdWidth = width / 3;
    const twoThirdsWidth = oneThirdWidth * 2;

    if (y <= oneThirdHeight) {
      if (x <= oneThirdWidth) {
        this.squareClicked(0);
      } else if (x <= twoThirdsWidth) {
        this.squareClicked(1);
      } else {
        this.squareClicked(2);
      }
    } else if (y <= twoThirdsHeight) {
      if (x <= oneThirdWidth) {
        this.squareClicked(3);
      } else if (x <= twoThirdsWidth) {
        this.squareClicked(4);
      } else {
        this.squareClicked(5);
      }
    } else if (x <= oneThirdWidth) {
      this.squareClicked(6);
    } else if (x <= twoThirdsWidth) {
      this.squareClicked(7);
    } else {
      this.squareClicked(8);
    }
  }

  /* eslint-disable-next-line  */
  squareClicked(square) {
    console.log('Square clicked!', square);
  }

  calculateLines() {
    const { height, width } = this.props;
    const oneThirdHeight = height / 3;
    const twoThirdsHeight = oneThirdHeight * 2;
    const oneThirdWidth = width / 3;
    const twoThirdsWidth = oneThirdWidth * 2;

    return [
      {
        x1: oneThirdWidth, y1: 0, x2: oneThirdWidth, y2: height,
      },
      {
        x1: twoThirdsWidth, y1: 0, x2: twoThirdsWidth, y2: height,
      },
      {
        x1: 0, y1: oneThirdHeight, x2: width, y2: oneThirdHeight,
      },
      {
        x1: 0, y1: twoThirdsHeight, x2: width, y2: twoThirdsHeight,
      },
    ];
  }

  render() {
    const { height, width } = this.props;

    const lines = this.calculateLines().map(
      coords => <line key={`${coords.x1}-${coords.y1}`} {...coords} />,
    );

    return (
      <svg height={height} width={width} onClick={this.boardClicked}>
        {lines}
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
