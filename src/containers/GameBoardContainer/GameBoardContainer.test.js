/* global beforeEach describe, expect, it, jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import GameBoardContainer from './GameBoardContainer';

function givenBoard(board) {
  const promise = Promise.resolve({ json: () => ({ board }) });
  global.fetch = jest.fn(() => promise);
  return promise;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GameBoardContainer', () => {
  it('should call the tic-tac-toe/new api on load', () => {
    givenBoard([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    shallow(<GameBoardContainer />);
    expect(global.fetch).toHaveBeenCalledWith('/tic-tac-toe/new');
  });

  it('should set state', async (done) => {
    expect.assertions(2);
    const board = [0, 1, 4, 0, 1, 4, 0, 1, 4];
    const promise = givenBoard(board);
    const wrapper = mount(<GameBoardContainer />);
    expect(wrapper.state('board')).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await promise;
    return promise.then(() => {
      wrapper.update();
      expect(wrapper.state('board')).toEqual(board);
      done();
    });
  });
});
