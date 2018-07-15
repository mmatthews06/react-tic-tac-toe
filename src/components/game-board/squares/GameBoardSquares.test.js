/* global describe, expect, it, */
import React from 'react';
import { shallow } from 'enzyme';

import GameBoardSquares from './GameBoardSquares';

const _ = 0;
const X = 1;
const O = 4;

describe('GameBoardSquares', () => {
  describe('with an even board', () => {
    const board = [_, X, O, _, X, O, _, X, O];
    const wrapper = shallow(
      <GameBoardSquares board={board} height={500} width={500} />,
    );

    it('should render correct number of empty pieces', () => {
      expect(wrapper.find('EmptyPieceSVG')).toHaveLength(3);
    });

    it('should render correct number of X pieces', () => {
      expect(wrapper.find('XPieceSVG')).toHaveLength(3);
    });

    it('should render correct number of O pieces', () => {
      expect(wrapper.find('OPieceSVG')).toHaveLength(3);
    });
  });

  describe('with an different board', () => {
    const board = [_, X, _, X, _, O, O, O, O];
    const wrapper = shallow(
      <GameBoardSquares board={board} height={500} width={500} />,
    );

    it('should render correct number of empty pieces', () => {
      expect(wrapper.find('EmptyPieceSVG')).toHaveLength(3);
    });

    it('should render correct number of X pieces', () => {
      expect(wrapper.find('XPieceSVG')).toHaveLength(2);
    });

    it('should render correct number of O pieces', () => {
      expect(wrapper.find('OPieceSVG')).toHaveLength(4);
    });
  });
});
