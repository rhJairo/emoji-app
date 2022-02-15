import React from 'react';
import Emojis from './Components/Emojis'
import Word from './Components/Word'
import Result from './Components/Result';
import {nanoid} from 'nanoid'
import './App.css';

function App() {
  let name = "The Thing"

  function setupWord(){
    let charArr = [...name.toLowerCase()]
    charArr = charArr.map(e => {
      return{
        id: nanoid(),
        value: e,
        isActive: e === ' ' ? true : false
      }
    })
    return charArr
  }
  
  const [word, setWord] = React.useState(setupWord)
  const [result, setResult] = React.useState(false)

  React.useEffect(()=>{
    function haveWon(){
      for(let i of word){
        if(!i.isActive){
          return false
        }
      }
      
      return true
    }

    function handleKeypress(e){
      if(name.toLowerCase().includes(e.key.toLowerCase())){
        setWord(arr => {
          let newArr = arr.map(obj => 
            obj.value === e.key.toLowerCase() ? {...obj, isActive: true}: obj)
          return newArr
        })
      }
    }
    setResult(haveWon())

    document.addEventListener('keydown', handleKeypress)
    return function cleanup(){
      document.removeEventListener('keydown', handleKeypress)
    }
  }, [name, word])

  return (
    <div className="App">
      <Emojis />
      <Word word={word} />
      <Result reset={setupWord} win={result}/>
    </div>
  );
}

export default App;
