import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllGames, clearFilters, orderByName, orderByRating, orderByLocation, getAllGenres, orderByGenres } from '../redux/actions';
import { Link } from 'react-router-dom';
import GameCard from "./GameCard";
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import loadingGif from './images/loading.gif';
import errorGif from './images/error.gif';
import './styles/Home.css';


const Filters = () => {

    const page = useSelector(state => state.page)
    const gamePerPage = 15
    const [/*sort*/, setSort] = useState()
    const allGames = useSelector(state => state.allGames)
    const games = useSelector(state => state.games)
    const genres = useSelector(state => state.genres)
    const reload = useSelector(state => state.search)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllGames())
        dispatch(getAllGenres())
    }, [dispatch])

    const handlleCLick = () => {
        dispatch(getAllGames())
        dispatch(clearFilters)
    }

    const handlleOrder = (e) => {
        dispatch(orderByName(e.target.value))
        setSort(e.target.value)
    }

    const handlleSelect = (e) => {
        dispatch(orderByRating(e.target.value))
        setSort(e.target.value)
    }

    const handlleSelectLocation = (e) => {
        dispatch(orderByLocation(e.target.value))
        setSort(e.target.value)
    }

    const handlleSelectGenres = (e) => {
        dispatch(orderByGenres(e.target.value))
        setSort(e.target.value)
    }

    let lastIndex = page * gamePerPage
    let firstIndex = lastIndex - gamePerPage
    let currentGames = games.slice(firstIndex, lastIndex)



    return (
        allGames.length === 0 ?
        <div className="loading">
        <img className="loadingImg" src={loadingGif} alt="not found" />
            <div class="loader">
                <span>Loading</span>
                <span>Loading</span>
            </div>
        </div>
            :
            <>
                <div className='conteinerGames'>
                    <div className='titleConteiner'>
                    <div className='title'>VIDEOGAMES LIBRARY</div>
                        <SearchBar />
                        {
                            reload === true ?
                                <button className='reload' onClick={() => handlleCLick()}>RELOAD GAMES</button>
                                :
                                null
                        }
                        </div>
                        <div className='create'>
                            <Link to="/create">
                                <h4>Create Game</h4>
                            </Link>
                        </div>
                </div>

                {
                    allGames.error ?
                    <div className="error">
                    <div className='errorMsg'>Oops, something went wrong!</div>
                    <img className="errorImg" src={errorGif} alt="not found" />
                    </div>
                        :
                        <>
                            <div className='allFilters'>
                                <div className='filterConteiner'>
                                    <select defaultValue="Alphabetical order" onChange={(e) => handlleOrder(e)}>
                                        <option value='Alphabetical order' disabled>Oder by Name</option>
                                        <option value='A-Z'>A to Z</option>
                                        <option value='Z-A'>Z to A</option>
                                    </select>

                                    <select defaultValue="Order by rating" onChange={(e) => handlleSelect(e)}>
                                        <option value='Order by rating' disabled>Order by Rating</option>
                                        <option value='Higher - lower'>Higher - lower</option>
                                        <option value='Lower - higher'>Lower - higher</option>
                                    </select>

                                    <select defaultValue="Order created" onChange={(e) => handlleSelectLocation(e)}>
                                        <option value='Order created' disabled>Filter by Origin</option>
                                        <option value='All games' >All games</option>
                                        <option value='Created at db' >Created at db</option>
                                        <option value='Only api games'>Only api games</option>
                                    </select>

                                    <select defaultValue="Order by genres" onChange={(e) => handlleSelectGenres(e)}>
                                        <option value="Order by genres" disabled>Filter by Genres</option>
                                        <option value="Default order">Default order</option>
                                        {
                                            genres?.map(e => <option key={e.id} value={e.name}>{e.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <Pagination
                                allGames={games.length}
                            />

{/* AQUI EMPIEZA CARDS */}
                            <div className='conteinerGamescard'>    
                                {
                                    currentGames?.map(e =>
                                        <div className='conteiner_conteinerGames' key={e.id}>
                                            <GameCard
                                                id={e.id}
                                                name={e.name}
                                                image={e.image}
                                                rating={e.rating}
                                                genres={e.genres}
                                            />
                                        </div>
                                    )
                                }
                            </div>
{/* AQUI TERMINA CARDS */}


                            <Pagination
                                allGames={games.length}
                            />
                        </>
                }
            </>
    )
};

export default Filters