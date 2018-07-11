
import React from 'react';
import PropTypes from 'prop-types';

import EmptyPieceSVG from '../empty-svg/EmptyPieceSVG';

import './XPieceSVG.css';

export default function XPieceSVG({ margin }) {
  // const endMargin = 100 - margin;
  const width = 167 - margin;
  const height = 167 - margin;

  return (
    // TODO: review whether this svg element is needed.
    <svg x="0" y="0" height="167" width="167" className="x-piece-svg">
      <EmptyPieceSVG />
      <g transform={`translate(${margin}, ${margin});`}>
        <line x1={margin} y1={margin} x2={width} y2={height} />
        <line x1={width} y1={margin} x2={margin} y2={height} />
      </g>
    </svg>
  );
}

XPieceSVG.propTypes = {
  margin: PropTypes.number,
};

XPieceSVG.defaultProps = {
  margin: 25,
};
