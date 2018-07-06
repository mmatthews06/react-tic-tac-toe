/* global describe, expect, it */
import React from 'react';
import { shallow } from 'enzyme';

import GameBoard from './GameBoard';

describe('Calculated Lines', () => {
  const wrapper = shallow(<GameBoard />);
  const lines = wrapper.instance().calculateLines();

  it('should have correct first vertical line', () => {
    expect(lines[0]).toEqual({
      x1: (500 / 3),
      y1: 0,
      x2: (500 / 3),
      y2: 500,
    });
  });
});
