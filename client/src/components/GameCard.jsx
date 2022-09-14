import React from "react"
import errorGif from './images/error.gif';
import { Link } from 'react-router-dom';
import NoImage from './images/noImageGame.png'
import './styles/GameCard.css'

const GameCard = ({ id, name, image, rating, genres }) => {
    return (
        <>
            <div className='card'>

                {

                    image ?
                        <img className='img' src={image} alt='No Image Available'/>
                        :
                        <img className='img' src={errorGif} alt='No Image Available'/>

                }
                <div className='cardDetails'>
                    <p className='textTitle'>🕹️{name}</p>
                    <p className='textBody'>{genres?.join(",  ")}</p>
                    <p className='textBody'>⭐{rating}</p>
                </div>
                <Link to={`/game/${id}`}>
                    <button className='cardButton'>See More</button>
                </Link>
            </div>
        </>
    )

}

export default GameCard