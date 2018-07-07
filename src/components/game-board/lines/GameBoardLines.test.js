/* global describe, expect, it */
import React from 'react';
import { shallow } from 'enzyme';

import GameBoardLines from './GameBoardLines';

describe('GameBoardLines', () => {
  describe('Actual SVG Lines', () => {
    const wrapper = shallow(<GameBoardLines height={500} width={500} />);
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
    expect(shallow(
      <GameBoardLines height={500} width={500} />,
    )).toMatchSnapshot();
  });
});
