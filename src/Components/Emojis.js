import React from 'react';

function Emojis(props){
    return(
        <div>
            <div>
                <p className='emoji-text'>Your clues</p>
            </div>
            <div>
                <p className='emoji-text'>Plot: {props.plot}</p>
            </div>
            <div>
                <p className='emoji-text'>Genres: {props.genres}</p>
            </div>
            <div>
                <p className='emoji'>Emojis</p>
            </div>
        </div>
    )
}

export default Emojis