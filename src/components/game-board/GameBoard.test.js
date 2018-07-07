/* global beforeEach, describe, expect, jest, it */
import React from 'react';
import { shallow } from 'enzyme';

import GameBoard from './GameBoard';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GameBoard', () => {
  it('should pass correct props to GameBoardLines', () => {
    const height = 42;
    const width = 84;
    const wrapper = shallow(<GameBoard height={height} width={width} />);
    expect(wrapper.find('GameBoardLines').prop('height')).toBe(height);
    expect(wrapper.find('GameBoardLines').prop('width')).toBe(width);
  });

  it('should pass correct props to GameBoardSquares', () => {
    const height = 42;
    const width = 84;
    const wrapper = shallow(<GameBoard height={height} width={width} />);
    expect(wrapper.find('GameBoardSquares').prop('height')).toBe(height);
    expect(wrapper.find('GameBoardSquares').prop('width')).toBe(width);
  });

  it('should match a snapshot', () => {
    const wrapper = shallow(<GameBoard />);
    expect(wrapper).toMatchSnapshot();
  });
});
