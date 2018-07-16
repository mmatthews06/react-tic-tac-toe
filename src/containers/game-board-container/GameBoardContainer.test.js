/* global beforeEach describe, expect, it, jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import GameBoardContainer from './GameBoardContainer';

function givenBoard(board, ended = false, winner = null, player1 = 1) {
  const promise = Promise.resolve({ json: () => ({ board, ended, winner, player1 }) });
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

  it('should start with a loading state', async (done) => {
    expect.assertions(2);
    const board = [0, 1, 4, 0, 1, 4, 0, 1, 4];
    const promise = givenBoard(board);
    const wrapper = mount(<GameBoardContainer />);
    expect(wrapper.state('isLoading')).toBe(true);
    await promise;
    return promise.then(() => {
      wrapper.update();
      expect(wrapper.state('isLoading')).toBe(false);
      done();
    }).catch(() => done.fail());
  });

  it('should set state', async (done) => {
    expect.assertions(2);
    const board = [0, 1, 4, 0, 1, 4, 0, 1, 4];
    const promise = givenBoard(board);
    const wrapper = mount(<GameBoardContainer />);
    expect(wrapper.state('game').board).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await promise;
    return promise.then(() => {
      wrapper.update();
      expect(wrapper.state('game').board).toEqual(board);
      done();
    }).catch(() => done.fail());
  });

  describe('New Game Button', () => {
    it('should call for a new game', () => {
      const board = [0, 1, 4, 0, 1, 4, 0, 1, 4];
      givenBoard(board);
      const wrapper = mount(<GameBoardContainer />);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      wrapper.find('Button').simulate('click');
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('End Game Messaging', () => {
    it('should show a draw', async (done) => {
      const promise = givenBoard([0, 0, 0, 0, 0, 0, 0, 0, 0, 0], true, null);
      const wrapper = mount(<GameBoardContainer />);
      await promise;
      return promise.then(() => {
        wrapper.update();
        const message = wrapper.instance().gameEndMessage();
        expect(message).toBe('Draw. Try again.');
        done();
      }).catch(() => done.fail());
    });

    it('should say when player1 wins', async (done) => {
      const promise = givenBoard([0, 0, 0, 0, 0, 0, 0, 0, 0, 0], true, 1);
      const wrapper = mount(<GameBoardContainer />);
      await promise;
      return promise.then(() => {
        wrapper.update();
        const message = wrapper.instance().gameEndMessage();
        expect(message).toBe('Player 1 won!');
        done();
      }).catch(() => done.fail());
    });

    it('should say when player2 wins', async (done) => {
      const promise = givenBoard([0, 0, 0, 0, 0, 0, 0, 0, 0, 0], true, 4);
      const wrapper = mount(<GameBoardContainer />);
      await promise;
      return promise.then(() => {
        wrapper.update();
        const message = wrapper.instance().gameEndMessage();
        expect(message).toBe('Player 2 won!');
        done();
      }).catch(() => done.fail());
    });
  });
});
