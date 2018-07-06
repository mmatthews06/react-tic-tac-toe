/* global expect it */
import React from 'react';
import { shallow } from 'enzyme';

import GameBoard from './GameBoard';

it('Should Run', () => {
  const wrapper = shallow(<GameBoard />);
  expect(wrapper.find('span').text()).toBe('Hello!');
});
