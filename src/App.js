import React from 'react';
import Emojis from './Components/Emojis'
import Word from './Components/Word'
import Result from './Components/Result';
import Keys from './Components/Keys';
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

  let kbrdStr = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  kbrdStr = [...kbrdStr]
  kbrdStr = kbrdStr.map(k => {
      return {
        id: nanoid(),
        value: k
      }
  })

  function handleClick(e){
    console.log('clicked')
    if(name.toLowerCase().includes(e.toLowerCase())){
      setWord(arr => {
        let newArr = arr.map(obj => 
          obj.value === e.toLowerCase() ? {...obj, isActive: true}: obj)
        return newArr
      })
    }
  }

  const keyboard = kbrdStr.map(k => {
    return (
        <Keys key={k.id} pressed={() => handleClick(k.value)} char={k.value}/>
    )
  })



  return (
    <div className="App">
      <Emojis />
      <Word word={word} />
      <Result reset={setupWord} win={result}/>
      <div className='keyboard'>
        {keyboard}
      </div>
    </div>
  );
}

export default App;

// - make lose condition 6 lifes or so
// - make words responsive
// - import api info
// - make emoji obj dictionary
// - make info overlay
// - make footer 