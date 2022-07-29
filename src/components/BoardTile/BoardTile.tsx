import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './board-tile.css';
import {rootState} from '../../redux/types';

const BoardTile = ({value, index}: {value: string; index: number}) => {
  const correctWord = useSelector(
    (state: rootState) => state.board.correctWord,
  );
  const nextLetterIndex = useSelector(
    (state: rootState) => state.board.nextLetterIndex,
  );
  const currentRowIndex = useSelector(
    (state: rootState) => state.board.currentRowIndex,
  );

  const [correct, setCorrect] = useState<boolean>(false);
  const [almost, setAlmost] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);

  let wordLastIndex = 4;
  let currentPos =
    nextLetterIndex === 5
      ? wordLastIndex
      : nextLetterIndex > 5 && nextLetterIndex % 5 === 0
      ? wordLastIndex
      : (nextLetterIndex % 5) - 1;

  useEffect(() => {
    if (correctWord[currentPos] === value) {
      setCorrect(true);
    } else if (!correct && value !== '' && correctWord.includes(value)) {
      setAlmost(true);
    } else if (!correct && value !== '' && !correctWord.includes(value)) {
      setWrong(true);
    }
    return () => {
      setCorrect(false);
      setAlmost(false);
      setWrong(false);
    };
  }, [value]);

  const status: any =
    Math.floor(index / 5) < currentRowIndex &&
    (correct ? 'correct' : almost ? 'present' : wrong ? 'wrong' : '');

  return (
    <div className={`tile ${status}`} id={status}>
      {value}
    </div>
  );
};

export default BoardTile;
