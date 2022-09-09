import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";    // useHistory  si voy a hacer el delete
import { clearFilters, getGameByID } from "../redux/actions";
import errorGif from './images/error.gif';
import loadingGif from './images/loading.gif';
import backImg from './images/back.png'
import './styles/GameDetails.css'


const GameDetails = () => {
    //const history = useHistory();
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
                                                        //REVISAR AQUIIIIIIIIIIIIII, NO TENGO EL DELETE CREADO EN EL BACK
    // const handlleDelete = (id) => {
    //     dispacth(deleteGame(id))
    //     dispacth(clearFilters())
    //     history.push("/home")
    //     alert("Game successfully removed")               
    // }
                                                        //REVISAR AQUIIIIIIIIIIIIII, NO TENGO EL DELETE CREADO EN EL BACK

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
                <div class="loader">
                    <span>Loading</span>
                    <span>Loading</span>
                </div>
            </div>
                :
                <>
                    <div className='conteinerGame'>
                        <div className='back'>
                            <Link to="/home">
                                <img src={backImg} alt="go back" />
                            </Link>
                            <div className='gameName'>{game.name}</div>
                        </div>
                        {
                            game.image ?
                                <img className='gameImg' src={game.image} alt="lol" />
                                :
                                <img className='gameImg' src={errorGif} alt="lol" />
                        }
                    </div>
                    <div className='conteinerbtn'>
                    {/* {
                            game.createdInDB === true ?     //REVISAR AQUIIIIIIIIIIIIII NO TENGO EL DELETE CREADO EN EL BACK
                                // <button className={styles.deleteGameBtn} onClick={() => handlleDelete(id)}>Delete Game</button>
                                <button onClick={() => handlleDelete(id)} className='deleteGameBtn'><span className='text'>Delete</span><span className='icon'></span></button>
                                :                           //REVISAR AQUIIIIIIIIIIIIII NO TENGO EL DELETE CREADO EN EL BACK
                                null
                    } */}
                    </div>
                    <div className='conteinerRating'>
                        <div className='ratingra'>Game rating</div>
                        <div className='rating'>🏆{game.rating}</div>
                        <div className='description'>Game description</div>
                        {
                            game.description ?
                                <textarea className='gameDescription'>{game.description}</textarea>
                                :
                                <textarea className='gameDescription'>No info available</textarea>
                        }
                    </div>
                    <div className='conteinerReleased'>
                        <div className='released'>Release Date</div>
                        {
                            game.released ?
                                <div className='gameReleased'>📅{game.released}</div>
                                :
                                <div className='gameReleased'>No info available</div>
                        }
                    </div>
                    <div className='conteinerGenresPlatforms'>
                        <div className='conteinerGenres'>
                            <div className='genres'>Game genres</div>
                            {
                                game.createdInDB === true ?
                                    <div className='gameGenres'>{game.genres?.map(e => e.name).join(" | ")}</div>
                                    :
                                    <div className='gameGenres'>{game.genres?.map(e => e).join(" | ")}</div>
                            }
                        </div>
                        <div className='conteinerPlatforms'>
                            <div className='platforms'>Platforms supported</div>
                            <div className='gamePlatforms'>{game.platforms.map(e => e).join(" | ")}</div>
                        </div>
                    </div>
                </>
    )
}

export default GameDetails