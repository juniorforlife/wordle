import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increaseNextLetterIndex, setBoard} from '../../redux/boardSlice';
import {
  BOARD_COLUMNS_NUMBER,
  BOARD_LETTERS_NUMBER,
} from '../../constants/consts';
import {rootState} from '../../redux/types';
import './key.css';

const Key = ({letter}: {letter: string}) => {
  const enteredLetters = useSelector(
    (state: rootState) => state.board.enteredLetters,
  );
  const nextLetterIndex = useSelector(
    (state: rootState) => state.board.nextLetterIndex,
  );
  const currentRowIndex = useSelector(
    (state: rootState) => state.board.currentRowIndex,
  );

  const dispatch = useDispatch();

  let nextRowIndex = Math.floor(nextLetterIndex / BOARD_COLUMNS_NUMBER);

  const selectLetter = () => {
    // block selecting if exceeds 30 letters or 5 letters of a row
    if (
      nextLetterIndex >= BOARD_LETTERS_NUMBER ||
      nextRowIndex > currentRowIndex
    ) {
      return;
    }

    const newLettersMatrix = [...enteredLetters];
    newLettersMatrix[nextLetterIndex] = letter;
    dispatch(setBoard(newLettersMatrix));
    dispatch(increaseNextLetterIndex());
  };

  return (
    <div className="letter" onClick={selectLetter}>
      {letter}
    </div>
  );
};

export default Key;
