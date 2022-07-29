import {createSlice} from '@reduxjs/toolkit';
import wordList from '../words.json';

let randomPosition = Math.floor(Math.random() * wordList.length);
const initialState = {
  enteredLetters: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  nextLetterIndex: 0,
  currentRowIndex: 0,
  key: '',
  correctWord: wordList[randomPosition].toUpperCase(),
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.enteredLetters = action.payload;
    },
    increaseNextLetterIndex: state => {
      state.nextLetterIndex++;
    },
    decreaseNextLetterIndex: state => {
      state.nextLetterIndex--;
    },
    increaseCurrentRowIndex: state => {
      state.currentRowIndex++;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    retryGame: () => initialState,
  },
});

export const {
  setBoard,
  increaseNextLetterIndex,
  decreaseNextLetterIndex,
  increaseCurrentRowIndex,
  setKey,
  retryGame,
} = boardSlice.actions;

export default boardSlice.reducer;
