import React from 'react'

function Word(props){
    let charArr = [...props.word]
    charArr = charArr.map(e => {
        return{
            value: e,
            isActive: false
        }
    })

    let myWord = charArr.map(e => {
        return(
            <div>
                <h3 className={`charCell ${e.isActive ? 'activeChar':'inactiveChar'}`}>{e.isActive ? e.value.toUpperCase() : '_'}</h3>
            </div>
        )
    })
    return(
        <div className='wordContainer'>
            {myWord}
        </div>
    )
}

export default Word