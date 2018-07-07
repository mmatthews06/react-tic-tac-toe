/* global describe, expect, it */
import React from 'react';
import { shallow } from 'enzyme';

import XPieceSVG from './XPieceSVG';

describe('XPieceSVG', () => {
  it('should match a snapshot', () => {
    expect(shallow(<XPieceSVG />)).toMatchSnapshot();
  });
});
