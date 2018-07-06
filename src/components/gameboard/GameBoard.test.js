/* global describe, expect, it */
import React from 'react';
import { mount, shallow } from 'enzyme';

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

describe('Actual SVG Lines', () => {
  const wrapper = shallow(<GameBoard />);
  const lines = wrapper.find('line');
  it('should have correct first vertical line', () => {
    expect(lines.at(0).props()).toEqual({
      x1: (500 / 3),
      y1: 0,
      x2: (500 / 3),
      y2: 500,
    });
  });

  it('should have correct second vertical line', () => {
    expect(lines.at(1).props()).toEqual({
      x1: (500 / 3) * 2,
      y1: 0,
      x2: (500 / 3) * 2,
      y2: 500,
    });
  });

  it('should have correct first horizontal line', () => {
    expect(lines.at(2).props()).toEqual({
      x1: 0,
      y1: 500 / 3,
      x2: 500,
      y2: 500 / 3,
    });
  });

  it('should have correct second horizontal line', () => {
    expect(lines.at(3).props()).toEqual({
      x1: 0,
      y1: (500 / 3) * 2,
      x2: 500,
      y2: (500 / 3) * 2,
    });
  });
});

it('should match a snapshot', () => {
  const wrapper = mount(<GameBoard />);
  expect(wrapper).toMatchSnapshot();
});
