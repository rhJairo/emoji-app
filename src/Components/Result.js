import React from 'react'

function Result(props){
    let output = 
    <div>
        <div>
            <img alt='movie poster' src={props.movieURL} width='60%' />
        </div>
        <div>
            
        </div>
        <div>
            <h2 className='victory-text'>Congratulations You Have Won</h2>
        </div>
    </div>
    return(
        props.win ? output : ' '
    )
}

export default Result