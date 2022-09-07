import React from "react"
import errorGif from './images/error.gif';
import { Link } from 'react-router-dom';
import './styles/GameCard.css'

const GameCard = ({ id, name, image, rating, genres }) => {
    return (
        <>
            <div className='card'>

                {

                    image ?
                        <img className='img' src={image} alt="lol" />
                        :
                        <img className='img' src={errorGif} alt="lol" />

                }
                <div className='cardDetails'>
                    <p className='textTitle'>{name}</p>
                    <p className='textBody'>{genres?.join(" | ")}</p>
                    <p className='textBody'>{rating}</p>
                </div>
                <Link to={`/game/${id}`}>
                    <button className='cardButton'>More info</button>
                </Link>
            </div>
        </>
    )

}

export default GameCard