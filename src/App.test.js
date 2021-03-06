/* global beforeEach, document, it, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

global.fetch = jest.fn(
  () => Promise.resolve({ json: () => ({ board: [] }) }),
);

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
