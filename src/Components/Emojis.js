import React from 'react';

function Emojis(props){
    let emojiLives = ['💀','😱','😨','😰','😦','😯','😕','😐','🙂','😃','😄','😁']
    return(
        <div>
            <div>
                <p className='emoji-text'>Plot: {props.plot}</p>
            </div>
            <div>
                <p className='emoji'>{emojiLives[props.lives]}</p>
            </div>
        </div>
    )
}

export default Emojis