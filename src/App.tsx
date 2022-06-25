import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import { Movies } from './features/movies/movies';
import { Header } from './components/Header/header';

function App() {


  return (
    <div className="App">
      <Header />
      <div className="movies-container">
        <Movies />
      </div>
      
    </div>
  );
}

export default App;
