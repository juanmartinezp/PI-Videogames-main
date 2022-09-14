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
                        <img className='img' src={image} alt="https://previews.123rf.com/images/momoforsale/momoforsale2004/momoforsale200400053/144601971-no-game-sign-isolated-on-white-background-vector-illustration-.jpg" />
                        :
                        <img className='img' src={errorGif} alt="https://previews.123rf.com/images/momoforsale/momoforsale2004/momoforsale200400053/144601971-no-game-sign-isolated-on-white-background-vector-illustration-.jpg" />

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