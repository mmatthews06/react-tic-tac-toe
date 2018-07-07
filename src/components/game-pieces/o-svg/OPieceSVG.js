
import React from 'react';
import PropTypes from 'prop-types';

import EmptyPieceSVG from '../empty-svg/EmptyPieceSVG';

import './OPieceSVG.css';

export default function OPieceSVG({ margin }) {
  const radius = (100 - margin) / 2;

  return (
    <svg x="0" y="0" height="100%" width="100%" viewBox="0 0 100 100">
      <EmptyPieceSVG />
      <circle
        className="o-piece-svg"
        cx="50%"
        cy="50%"
        r={radius}
      />
    </svg>
  );
}

OPieceSVG.propTypes = {
  margin: PropTypes.number,
};

OPieceSVG.defaultProps = {
  margin: 25,
};
