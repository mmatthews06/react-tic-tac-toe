/* global describe, expect, it */
import React from 'react';
import { shallow } from 'enzyme';

import GameSquare from './GameSquare';
import EmptyPieceSVG from '../game-pieces/empty-svg/EmptyPieceSVG';
import XPieceSVG from '../game-pieces/x-svg/XPieceSVG';
import OPieceSVG from '../game-pieces/o-svg/OPieceSVG';

describe('GameSquare', () => {
  describe('Child Piece Rendering', () => {
    it('should render an EmptyPieceSVG by default', () => {
      expect(shallow(<GameSquare />).find(EmptyPieceSVG)).toHaveLength(1);
    });

    it('should render an XPieceSVG instead of default if passed as a child', () => {
      const wrapper = shallow(
        <GameSquare>
          <XPieceSVG />
        </GameSquare>,
      );
      expect(wrapper.find(EmptyPieceSVG)).toHaveLength(0);
      expect(wrapper.find(XPieceSVG)).toHaveLength(1);
    });

    it('should render an OPieceSVG instead of default if passed as a child', () => {
      const wrapper = shallow(
        <GameSquare>
          <OPieceSVG />
        </GameSquare>,
      );
      expect(wrapper.find(EmptyPieceSVG)).toHaveLength(0);
      expect(wrapper.find(OPieceSVG)).toHaveLength(1);
    });
  });

  it('should match a default snapshot', () => {
    expect(shallow(<GameSquare />)).toMatchSnapshot();
  });

  it('should match a snapshot with a child', () => {
    expect(shallow(
      <GameSquare>
        <OPieceSVG />
      </GameSquare>,
    )).toMatchSnapshot();
  });
});
