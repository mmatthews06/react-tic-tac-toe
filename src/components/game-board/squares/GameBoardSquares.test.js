/* global describe, expect, it, */
import React from 'react';
import { shallow } from 'enzyme';

import GameBoardSquares from './GameBoardSquares';

describe('GameBoardSquares', () => {
  describe('with an even board', () => {
    const board = [0, 1, 2, 0, 1, 2, 0, 1, 2];
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
    const board = [0, 1, 0, 1, 0, 2, 2, 2, 2];
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
