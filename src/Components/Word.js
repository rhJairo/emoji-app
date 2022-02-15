import React from 'react'


function Word(props){
    
    let myWord = props.word.map(e => {
        return(
            <h3 key={e.id} className={`charCell ${e.value === ' ' ? 'spaceChar' : e.isActive ? 'activeChar':'inactiveChar'}`}>
                {e.isActive ? e.value.toUpperCase() : e.value === ' ' ? ' ' : '_'}
            </h3>
        )
    })

    return(
        <div className='wordContainer'>
            {myWord}
        </div>
    )
}

export default Word