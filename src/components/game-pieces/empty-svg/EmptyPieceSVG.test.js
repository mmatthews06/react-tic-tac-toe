/* global describe, expect, it */
import React from 'react';
import { shallow } from 'enzyme';

import EmptyPieceSVG from './EmptyPieceSVG';

describe('EmptyPieceSVG', () => {
  it('should match a snapshot', () => {
    expect(shallow(<EmptyPieceSVG />)).toMatchSnapshot();
  });
});
