
import React from 'react';
import PropTypes from 'prop-types';

import EmptyPieceSVG from '../empty-svg/EmptyPieceSVG';

import './XPieceSVG.css';

export default function XPieceSVG({ margin }) {
  const endMargin = 100 - margin;

  return (
    // TODO: review whether this svg element is needed.
    <svg x="0" y="0" height="100%" width="100%" className="x-piece-svg">
      <EmptyPieceSVG />
      <line x1={`${margin}%`} y1={`${margin}%`} x2={`${endMargin}%`} y2={`${endMargin}%`} />
      <line x1={`${endMargin}%`} y1={`${margin}%`} x2={`${margin}%`} y2={`${endMargin}%`} />
    </svg>
  );
}

XPieceSVG.propTypes = {
  margin: PropTypes.number,
};

XPieceSVG.defaultProps = {
  margin: 25,
};
