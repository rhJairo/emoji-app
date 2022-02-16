import React from 'react'

function Result(props){
    let output = 
    <div>
        <img alt='movie poster' src={props.movieURL} width='60%' />
        <button onClick={props.reset}>Reset</button>
        <h2>Congratulations You Have Won</h2>
    </div>
    return(
        props.win ? output : ''
    )
}

export default Result