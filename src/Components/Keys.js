import React from 'react'

function Keys(props){
    return(
        <div onClick={props.pressed} className='keyCell'>
            <h4>{props.char}</h4>
        </div>
    )
}

export default Keys