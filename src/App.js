import React from 'react';

import GameBoardContainer from './containers/GameBoardContainer/GameBoardContainer';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          React Tic-Tac-Toe
        </h1>
      </header>
      <GameBoardContainer />
    </div>
  );
}

export default App;
