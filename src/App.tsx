import React from 'react';
import {useSelector} from 'react-redux';
import './App.css';
import {rootState} from './redux/types';
import BoardTile from './components/BoardTile/BoardTile';
import KeyBoard from './components/Keyboard/KeyBoard';

function App() {
  const enteredLetters = useSelector(
    (state: rootState) => state.board.enteredLetters,
  );

  return (
    <div id="app">
      <div className="board">
        {enteredLetters.map((letter: string, index: number) => {
          return (
            <BoardTile value={letter} index={index} key={letter + index} />
          );
        })}
      </div>
      <KeyBoard />
    </div>
  );
}

export default App;
