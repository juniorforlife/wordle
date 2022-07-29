import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Key from '../Key/Key';
import './keyboard.css';
import wordList from '../../words.json';
import {rootState} from '../../redux/types';
import {
  decreaseNextLetterIndex,
  increaseCurrentRowIndex,
  retryGame,
  setBoard,
} from '../../redux/boardSlice';
import {
  BOARD_COLUMNS_NUMBER,
  BOARD_LETTERS_NUMBER,
} from '../../constants/consts';

const KeyBoard = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const enteredLetters = useSelector(
    (state: rootState) => state.board.enteredLetters,
  );
  const nextLetterIndex = useSelector(
    (state: rootState) => state.board.nextLetterIndex,
  );
  const currentRowIndex = useSelector(
    (state: rootState) => state.board.currentRowIndex,
  );
  const correctWord = useSelector(
    (state: rootState) => state.board.correctWord,
  );

  const dispatch = useDispatch();

  const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  let currentWord: string = `${enteredLetters[nextLetterIndex - 5]}${
    enteredLetters[nextLetterIndex - 4]
  }${enteredLetters[nextLetterIndex - 3]}${
    enteredLetters[nextLetterIndex - 2]
  }${enteredLetters[nextLetterIndex - 1]}`.toLowerCase();

  const clickDelete = () => {
    const prevLetterIndex = nextLetterIndex - 1;
    if (Math.floor(prevLetterIndex / BOARD_COLUMNS_NUMBER) < currentRowIndex) {
      return;
    }
    const newBoard = [...enteredLetters];
    newBoard[nextLetterIndex - 1] = '';
    dispatch(decreaseNextLetterIndex());
    dispatch(setBoard(newBoard));
  };

  const clickEnter = () => {
    if (currentWord.length !== 5) {
      alert('Not enough letters');
      return;
    }
    if (wordList.includes(currentWord) === false) {
      alert('Not in words list');
      return;
    }

    if (wordList.includes(currentWord)) {
      if (
        nextLetterIndex % BOARD_COLUMNS_NUMBER === 0 &&
        nextLetterIndex !== 0
      ) {
        dispatch(increaseCurrentRowIndex());
      }
    }

    if (
      nextLetterIndex === BOARD_LETTERS_NUMBER &&
      wordList.includes(currentWord)
    ) {
      setModalVisible(true);
    }
  };

  return (
    <div className="keyboard">
      <div className="keys-row">
        {keys1.map(key => (
          <Key key={key} letter={key} />
        ))}
      </div>
      <div className="keys-row">
        {keys2.map(key => (
          <Key key={key} letter={key} />
        ))}
      </div>
      <div className="keys-row">
        <span onClick={clickEnter} className="function-key">
          ENTER
        </span>
        {keys3.map(key => (
          <Key key={key} letter={key} />
        ))}
        <span onClick={clickDelete} className="function-key">
          DELETE
        </span>
      </div>
      {modalVisible && (
        <div className="modal">
          <button id="close-modal" onClick={() => setModalVisible(false)}>
            Close
          </button>

          <div>
            <div>
              <p>Correct word is {correctWord}</p>
              <br />
            </div>

            <div>
              <button disabled>Share</button>
              <button
                onClick={() => {
                  dispatch(retryGame());
                  setModalVisible(false);
                }}>
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyBoard;
