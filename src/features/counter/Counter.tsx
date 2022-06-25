import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  changeMovies,
  // decrement,
  // increment,
  // incrementByAmount,
  // incrementAsync,
  // incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  // const count = useAppSelector(selectCount);
  const test = useAppSelector(selectCount)
  console.log('test', test)
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>Composant

      <button onClick={() => dispatch(changeMovies('titre'))}>BUTTON</button>
      <button onClick={() => dispatch(changeMovies('toto'))}>BUTTON 2</button>
      
    </div>
  );
}
