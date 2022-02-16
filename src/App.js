import React from 'react';
import Emojis from './Components/Emojis'
import Word from './Components/Word'
import Result from './Components/Result';
import Keys from './Components/Keys';
import {nanoid} from 'nanoid'
import './App.css';

function App() {

  function setupWord(name){
    let charArr = [...name.toLowerCase()]
    charArr = charArr.map(e => {
      return{
        id: nanoid(),
        value: e,
        isActive: e === ' ' ? true : false
      }
    })
    setWord(charArr)
  }
  
  const [word, setWord] = React.useState([])
  const [result, setResult] = React.useState(false)

  React.useEffect(()=>{
    async function getMovie(){
      const res = await fetch(`https://data-imdb1.p.rapidapi.com/movie/id/tt0086250/`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
          "x-rapidapi-key": "8e5e9caf64msh5e26025472ee355p129957jsn0b06fee5b71c"
        }
      })
      const data = await res.json()
      setupWord(data.results.title)
    }
    getMovie()
  },[])


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
      if(word.find(o => o.value === e.key)){
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
  }, [word])

  function handleClick(e){
    
    if(word.find(o => o.value === e.toLowerCase())){
      setWord(arr => {
        let newArr = arr.map(obj => 
          obj.value === e.toLowerCase() ? {...obj, isActive: true}: obj)
        return newArr
      })
    }
  }

  let kbrdStr = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  kbrdStr = [...kbrdStr]
  kbrdStr = kbrdStr.map(k => {
      return {
        id: nanoid(),
        value: k
      }
  })

  const keyboard = kbrdStr.map(k => {
    return (
        <Keys key={k.id} pressed={() => handleClick(k.value)} char={k.value}/>
    )
  })

  console.log(word)
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