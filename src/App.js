import React from 'react';

import GameBoard from './components/game-board/GameBoard';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          React Tic-Tac-Toe
        </h1>
      </header>
      <GameBoard />
    </div>
  );
}

export default App;
