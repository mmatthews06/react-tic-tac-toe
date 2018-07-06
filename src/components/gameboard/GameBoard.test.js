/* global beforeEach, describe, expect, jest, it */
import React from 'react';
import { shallow } from 'enzyme';

import GameBoard from './GameBoard';

const targetXY = (x, y) => {
  const dims = {
    x: 470,
    y: 190,
    width: 500,
    height: 500,
    top: 190,
    right: 970,
    bottom: 690,
    left: 470,
  };
  const clientX = x + dims.left;
  const clientY = y + dims.top;

  return {
    clientX,
    clientY,
    target: {
      getBoundingClientRect: () => ({ ...dims }),
    },
  };
};

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

describe('Clicks on the GameBoard', () => {
  const wrapper = shallow(<GameBoard />);
  wrapper.instance().squareClicked = jest.fn();

  it('should handle top-left click', () => {
    wrapper.simulate('click', targetXY(91, 73));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(0);
  });

  it('should handle top-middle click', () => {
    wrapper.simulate('click', targetXY(216, 110));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(1);
  });

  it('should handle top-right click', () => {
    wrapper.simulate('click', targetXY(390, 108));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(2);
  });

  it('should handle middle-left click', () => {
    wrapper.simulate('click', targetXY(36, 253));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(3);
  });

  it('should handle middle-middle click', () => {
    wrapper.simulate('click', targetXY(221, 258));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(4);
  });

  it('should handle middle-right click', () => {
    wrapper.simulate('click', targetXY(382, 248));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(5);
  });

  it('should handle bottom-left click', () => {
    wrapper.simulate('click', targetXY(85, 399));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(6);
  });

  it('should handle bottom-middle click', () => {
    wrapper.simulate('click', targetXY(231, 421));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(7);
  });

  it('should handle bott-right click', () => {
    wrapper.simulate('click', targetXY(408, 416));
    expect(wrapper.instance().squareClicked).toHaveBeenCalledWith(8);
  });
});

it('should match a snapshot', () => {
  const wrapper = shallow(<GameBoard />);
  expect(wrapper).toMatchSnapshot();
});
