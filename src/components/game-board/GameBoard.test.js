/* global beforeEach, describe, expect, jest, it */
import React from 'react';
import { shallow } from 'enzyme';

import GameBoard from './GameBoard';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Calculated Lines', () => {
  const wrapper = shallow(<GameBoard height={500} width={500} />);
  const lines = wrapper.instance().calculateLines();

  it('should have correct first vertical line', () => {
    expect(lines[0]).toEqual({
      x1: (500 / 3),
      y1: 0,
      x2: (500 / 3),
      y2: 500,
    });
  });

  it('should have correct second vertical line', () => {
    expect(lines[1]).toEqual({
      x1: (500 / 3) * 2,
      y1: 0,
      x2: (500 / 3) * 2,
      y2: 500,
    });
  });

  it('should have correct first horizontal line', () => {
    expect(lines[2]).toEqual({
      x1: 0,
      y1: 500 / 3,
      x2: 500,
      y2: 500 / 3,
    });
  });

  it('should have correct second horizontal line', () => {
    expect(lines[3]).toEqual({
      x1: 0,
      y1: (500 / 3) * 2,
      x2: 500,
      y2: (500 / 3) * 2,
    });
  });
});

it('should match a snapshot', () => {
  const wrapper = shallow(<GameBoard />);
  expect(wrapper).toMatchSnapshot();
});
