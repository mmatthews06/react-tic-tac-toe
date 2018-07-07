/* global describe, expect, it */
import React from 'react';
import { shallow } from 'enzyme';

import OPieceSVG from './OPieceSVG';

describe('OPieceSVG', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OPieceSVG />)).toMatchSnapshot();
  });
});
