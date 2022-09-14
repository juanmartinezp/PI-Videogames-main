import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";    // useHistory  si voy a hacer el delete
import { clearFilters, getGameByID } from "../redux/actions";
import errorGif from './images/error.gif';
import loadingGif from './images/loading.gif';
import './styles/GameDetails.css'


const GameDetails = () => {
    const { id } = useParams()
    const dispacth = useDispatch()

    useEffect(() => {
        dispacth(getGameByID(id))
        dispacth(clearFilters())
        return () => {
            dispacth(clearFilters())
        }
    }, [dispacth, id])

    const game = useSelector(state => state.game)        

    return (
        game.msg ?                                            //ERROR
        <div className='containerError'>              
        <h2 className='title'>Nothing here</h2>
        <Link to="/">
        <h3 className='back'>Go Back Home</h3>
        </Link>
        <img className='img' src={errorGif} alt="lol"/>
        </div>                                               //ERROR
            :
            game.length === 0 ?
            <div className="loading">
            <img className="loadingImg" src={loadingGif} alt="not found" />
                <div className="loader">
                    <span>Loading</span>
                    <span>Loading</span>
                </div>
            </div>
                :
                <>
                    <div className='conteinerGame'>
                        <div className='backDetails'>
                            <Link to="/home">
                                <h4>🢀 Go Back</h4>
                            </Link>
                        </div>
                            <div className='gameName'>{game.name}</div>
                        {
                            game.image ?
                                <img className='gameImg' src={game.image} alt="lol" />
                                :
                                <img className='gameImg' src={errorGif} alt="lol" />
                        }
                    </div>
                    <div className='conteinerbtn'>
                    {}
                    </div>
                    <div className='conteinerRating'>
                        <div className='ratingra'>Game rating</div>
                        <div className='ratingDetails'>⭐{game.rating}</div>
                        <div className='descriptionDetails'>Game Description</div>
                        {
                            game.description ?
                                <textarea className='gameDescriptionDetails'>{game.description}</textarea>
                                :
                                <textarea className='gameDescriptionDetails'>No info available</textarea>
                        }
                    </div>
                    <div className='conteinerReleased'>
                        <div className='releasedDetails'>Released Date</div>
                        {
                            game.released ?
                                <div className='gameReleasedDetails'>📅{game.released}</div>
                                :
                                <div className='gameReleasedDetails'>No released date available</div>
                        }
                    </div>
                    <div className='conteinerGenresPlatformsDetails'>
                        <div className='conteinerGenresDetails'>
                            <div className='genresDetails'>Game Genres</div>
                            {
                                game.createdInDB === true ?
                                    <div className='gameGenresDetails'>{game.genres?.map(e => e.name).join(" | ")}</div>
                                    :
                                    <div className='gameGenresDetails'>{game.genres?.map(e => e).join(" | ")}</div>
                            }
                        </div>
                        <div className='conteinerPlatformsDet'>
                            <div className='platformsDetails'>Platforms Supported</div>
                            <div className='gamePlatformsDetails'>{game.platforms.map(e => e).join(" | ")}</div>
                        </div>
                    </div>
                </>
    )
}

export default GameDetails