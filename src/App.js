import React from 'react';
import Emojis from './Components/Emojis'
import Word from './Components/Word'
import './App.css';

function App() {
  return (
    <div className="App">
      <Emojis />
      <Word word='peepoHappy' />
    </div>
  );
}

export default App;
