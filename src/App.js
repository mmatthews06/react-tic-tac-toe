import React from 'react';
import Grid from '@material-ui/core/Grid';

import GameBoardContainer from './containers/game-board-container/GameBoardContainer';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          React Tic-Tac-Toe
        </h1>
      </header>
      <div style={{ padding: 30 }}>
        <Grid container spacing={40}>
          <GameBoardContainer />
        </Grid>
      </div>
    </div>
  );
}

export default App;
