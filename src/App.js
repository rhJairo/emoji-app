import React from 'react';
import Emojis from './Components/Emojis'
import Word from './Components/Word'
import Result from './Components/Result';
import Keys from './Components/Keys';
import {nanoid} from 'nanoid'
import './App.css';

function App() {

  const [word, setWord] = React.useState([{id: '', value: ' ', isActive: false}])
  const [result, setResult] = React.useState({livesLeft:'11',moviePlot:'',movieGenres:[], moviePoster:'', winned: false})
  
  function setupWord(name){
    let charArr = [...name.toLowerCase()]
    charArr = charArr.map(e => {
      return{
        id: nanoid(),
        value: e,
        isActive: !(/[a-zA-Z]/).test(e) ? true : false
      }
    })
    setWord(charArr)
  }

  React.useEffect(()=>{
    const genrePool = ['Crime','Drama','Horror','Action','Thriller','Animation','Comedy','War',
        'Adventure','Fantasy','Family','Sci-Fi','Sport','Mystery']
    let genre = genrePool[Math.floor(Math.random() * (genrePool.length - 1))]

    async function getMovie(movieId){
      const res = await fetch(`https://data-imdb1.p.rapidapi.com/movie/id/${movieId}/`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
          "x-rapidapi-key": "8e5e9caf64msh5e26025472ee355p129957jsn0b06fee5b71c"
        }
      })
      const data = await res.json()
      console.log('movie info:',data)
      const poster = data.results.image_url
      const plot = data.results.plot
      const genres = data.results.gen.map(obj => obj.genre)
      setResult(prevRes => {
        return {
          ...prevRes,
          movieGenres: genres,
          moviePlot: plot,
          moviePoster: poster
        }
      })
      setupWord(data.results.title)
    }

    function generateMovie(){
      async function getMoviePool(movieGenre){
        const res = await fetch(`https://data-imdb1.p.rapidapi.com/movie/byGen/${movieGenre}/?page_size=50`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": "8e5e9caf64msh5e26025472ee355p129957jsn0b06fee5b71c"
          }
        })
        const data = await res.json()
        const movie = data.results[Math.floor(Math.random() * data.results.length - 1)]
        console.log('chosen movie', movie)
        getMovie(movie.imdb_id)
      }
      console.log(genre)
      getMoviePool(genre)
    }
    generateMovie()
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
      }else{
        setResult(res => {
          return {
            ...res,
            livesLeft: res.livesLeft--
          }
        })
      }
    }
    setResult(prevRes => {
      return{
        ...prevRes,
        winned: haveWon()
      }
    })

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
    } else{
      setResult(res => {
        return {
          ...res,
          livesLeft: res.livesLeft--
        }
      })
    }
  }

  

  function createKeyboard(){
    let kbrdStr = 'QWERTYUIOPASDFGHJKLZXCVBNM'
    kbrdStr = [...kbrdStr]
    kbrdStr = kbrdStr.map(k => {
      return {
        id: nanoid(),
        value: k
      }
    })
    let row1,row2,row3 
    row1 = row2 = row3 = []
    for (let i = 0; i < 26; i++){
      if(i<10){
        row1 = [...row1, <Keys key={kbrdStr[i].id} pressed={() => handleClick(kbrdStr[i].value)} char={kbrdStr[i].value}/>]
      }else if(i>9 && i<19){
        row2 = [...row2, <Keys key={kbrdStr[i].id} pressed={() => handleClick(kbrdStr[i].value)} char={kbrdStr[i].value}/>]
      }else if(i>18 && i<26){
        row3 = [...row3, <Keys key={kbrdStr[i].id} pressed={() => handleClick(kbrdStr[i].value)} char={kbrdStr[i].value}/>]
      }
    }
    
    console.log(row1)
    return (
      <div className='keyboard'>
        <div className='keyboard--row'>
          {row1}
        </div>
        <div className='keyboard--row'>
          {row2}
        </div>
        <div className='keyboard--row'>
          {row3}
        </div>
      </div>
    )
  }
  const keyboard = createKeyboard()
  
  // kbrdStr.map(k => {
  //   return (
  //       <Keys key={k.id} pressed={() => handleClick(k.value)} char={k.value}/>
  //   )
  // })

  return (
    <div className="App">
      <Emojis lives={result.livesLeft} plot={result.moviePlot} genres={result.movieGenres} />
      <Word word={word} />
      <Result reset={setupWord} movieURL={result.moviePoster} win={result.winned} />
      {!result.winned && keyboard}
      
    </div>
  );
}

export default App;

// - make lose condition 6 lifes or so
// - make emoji obj dictionary
// - make info overlay
// - make footer 