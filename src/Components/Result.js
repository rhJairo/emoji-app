import React from 'react'

function Result(props){
    let output = 
    <div>
        <button onClick={props.reset}>Reset</button>
        <h2>Congratulations You Have Won</h2>
    </div>
    return(
        <div>
            {props.win && output}
        </div>
    )
}

export default Result