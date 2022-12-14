import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getAllGames, getAllGenres, clearFilters, createGame} from "../redux/actions";
import loadingGif from './images/loading.gif';
import createGameGif from './images/createGame.gif';
import './styles/CreateGame.css';

//cuando este con estilos ver de agregar la imagen de ERROR  para que la muestre



const CreateGame = () => {
    const games = useSelector(state => state.games);
    const db = games.filter(e => e.createdInDB === true);
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: [],
        image: ""
    })

    const [error, setError] = useState({})
    const dispacth = useDispatch()
    const validate = (input) => {
        let error = {}

        if(!input.name.trim()) {
            error.name = "Name is required";
        }

        let search = db.find(e => e.name.toLowerCase() === input.name.toLowerCase())  //me fijo si el nombre del juego ya existe en la db
        if(search){
            error.name = "That game already exists";
        }

        if(!input.description.trim()) {
            error.description = "Description is required";
        }

        if(!input.released) {
            error.released = "Released date is required";
        } else if(input.released.length !== 10) {
            error.released = "Released date must be in format MM/DD/YYYY";
        }

        if(!input.rating) {
            error.rating = "Rating is required";
        } else if(input.rating < 0 || input.rating > 5) {
            error.rating = "Rating must be between 0 and 5";
        }

        if(input.platforms.length === 0 || !input.platforms) {
            error.platforms = "At least one platform is required";
        }

        if(input.genres.length === 0 || !input.genres) {
            error.genres = "At least one genre is required";
        }

        if(!input.image.trim()) {
            error.image = "Image URL is required";
        }

        return error;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispacth(createGame(input))
            setInput({
                name: "",
                description: "",
                released: "",
                rating: 0,
                platforms: [],
                genres: [],
                image: ""
            })
        alert('Game was created successfully')
    }


    const checkGenres = (e) => {
        setInput({
            ...input,
            genres: input.genres.includes(e.target.value) ?
            input.genres :
            [...input.genres, e.target.value]
        })
        setError(validate({
            ...input,
            genres: input.genres.includes(e.target.value) ?
            input.genres :
            [...input.genres, e.target.value]
        }))
    }

    const checkPlatforms = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.includes(e.target.value) ?
            input.platforms :
            [...input.platforms, e.target.value]
        })
        setError(validate({
            ...input,
            platforms: input.platforms.includes(e.target.value) ?
            input.platforms :
            [...input.platforms, e.target.value]
        }))
    }

    const handlleChange = (e) => {
        console.log(input)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const filterGenres = (e) => {
        let newGenres = input.genres.filter(i => i !== e.target.value)
        setInput({
            ...input,
            genres: newGenres
        })
        setError(validate({
            ...input,
            genres: newGenres
        }))
    }

    const filterPlatfroms = (e) => {
        let newPlatforms = input.platforms.filter(i => i !== e.target.value)
        setInput({
            ...input,
            platforms: newPlatforms
        })
        setError(validate({
            ...input,
            platforms: newPlatforms
        }))
    }


    useEffect(() => {
        dispacth(getAllGenres())
        dispacth(getAllGames())
        return () => {
            dispacth(clearFilters())
        }
    }, [dispacth])


    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    return (

            games.length === 0?
            <div className="loading">
            <img className="loadingImg" src={loadingGif} alt="not found" />
                <div className="loader">
                    <span>Loading</span>
                    <span>Loading</span>
                </div>
            </div>
            :
            <div className='formConteiner'>
                <img className='createGame' src={createGameGif} alt="not found" />
            <div className='formConteinerData'>
            <Link className='back' to="/home">???? Home</Link>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='namevg'>
                <label>Name: </label>
                <input autoComplete="off" type="text" placeholder="Name your videogame..." name="name" value={input.name} onChange={(e) => handlleChange(e)}></input>
                {
                    error.name && <p className='error'>{error.name}</p>
                }
                </div>
                <div className='genres'>
                <label>Genres: </label>
                <select defaultinput="Genres" id="genres" name="genres" onChange={(e) => checkGenres(e)}>
                <option disabled={true}>Genres</option>
            {
                genres.map(e => 
                <option key={e.name} value={e.name}>
                    {e.name}
                </option>
                )
            }
                </select>
                {
                        error.genres && <p className='error'>{error.genres}</p>
                }
                </div>
                <div className='platforms'>
                <label>Platforms: </label>
                <select id="platforms" defaultinput="Platforms" name="platforms" onChange={(e) => checkPlatforms(e)}>
                <option disabled={true}>Platforms</option>
                    {
                        platforms.map(e =>
                        <option key={e} value={e}>
                            {e}
                        </option>
                        )
                    }
                </select>
                {
                        error.platforms && <p className='error'>{error.platforms}</p>
                }
                </div>
                <div className='description'>
                <label>Description: </label>
                <input autoComplete="off" type="text" placeholder="Describe your videogame..." name="description" value={input.description} onChange={(e) => handlleChange(e)}></input>
                {
                        error.description && <p className='error'>{error.description}</p>
                }
                </div>
                <div className='rating'>
                <label>Rating: </label>
                <input type="number" placeholder="Rate your videogame" name="rating" value={input.rating} onChange={(e) => handlleChange(e)}></input>
                {
                        error.rating && <p className='error'>{error.rating}</p>
                }
                </div>
                <div className='release'>
                <label>Released date: </label>
                <input type="date" name="released" value={input.released} onChange={(e) => handlleChange(e)}></input>
                {
                        error.released && <p className='error'>{error.released}</p>
                }
                </div>
                <div className='imgCreate'>
                <label>Image: </label>
                <input autoComplete="off" type="text" name="image" placeholder="Copy/Paste your image URL" value={input.image} onChange={(e) => handlleChange(e)}></input>
                </div>
                <button className='btn' type="submit" disabled={!input.name || Object.keys(error).length > 0}>??????? Create</button>
        </form>
        </div>

        <div className='conteinerGenres'>
        <div className='selectedGenres'>Selected genres</div>
        <div className='genres'>
        {
            input.genres?.map(e => {
                let genresSelected = genres.find(i => i.name === Number(e))
                return (
                    <button key={e} className='btn3' value={e} type="button" onClick={(e) => filterGenres(e)}>{e}</button>
                )    
            })
        }
        </div>
        </div>
        <div className='conteinerPlatforms'>
        <div className='selectedPlatforms'>Selected platforms</div>
        <div className='platforms'>
        {
            input.platforms?.map(e =>
                <button key={e} className='btn2' value={e} type="button" onClick={(e) => filterPlatfroms(e)}>{e}</button>
            )
        }
        </div>
        </div>
    </div>
    )
}



export default CreateGame