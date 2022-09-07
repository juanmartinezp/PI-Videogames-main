import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getAllGames, getAllGenres, clearFilters, createGame} from "../redux/actions";
import loadingGif from './images/loading.gif';
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
            dispatchEvent(createGame(input))
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
            genres: input.genres.includes(e.target.input) ?
            input.genres :
            [...input.genres, e.target.input]
        })
        setError(validate({
            ...input,
            genres: input.genres.includes(e.target.input) ?
            input.genres :
            [...input.genres, e.target.input]
        }))
    }

    const checkPlatforms = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.includes(e.target.input) ?
            input.platforms :
            [...input.platforms, e.target.input]
        })
        setError(validate({
            ...input,
            platforms: input.platforms.includes(e.target.input) ?
            input.platforms :
            [...input.platforms, e.target.input]
        }))
    }

    const handlleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.input
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.input
        }))
    }

    const filterGenres = (e) => {
        let newGenres = input.genres.filter(i => i !== e.target.input)
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
        let newPlatforms = input.platforms.filter(i => i !== e.target.input)
        setInput({
            ...input,
            platforms: newPlatforms
        })
        setError(validate({
            ...input,
            platforms: newPlatforms
        }))
    }

    const dispacth = useDispatch()

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
            </div>
            :
            <div className='formConteiner'>
            <div className='formConteinerData'>
            <Link className='back' to="/home">Go back home</Link>
            <form>
                <div className='name'>
                <label>Insert a name: </label>
                <input autoComplete="off" type="text" placeholder="name" name="name" input={input.name} onChange={(e) => handlleChange(e)}></input>
                {
                    error.name && <p className='error'>{error.name}</p>
                }
                </div>
                <div className='genres'>
                <label>Selected genres: </label>
                <select defaultInput="Genres" id="genres" name="genres" onChange={(e) => checkGenres(e)}>
                <option disabled={true}>Genres</option>
            {
                genres.map(e => 
                <option key={e.id} input={e.id}>
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
                <label>Selected platforms: </label>
                <select id="platforms" defaultInput="Platforms" name="platforms" onChange={(e) => checkPlatforms(e)}>
                <option disabled={true}>Platforms</option>
                    {
                        platforms.map(e =>
                        <option key={e} input={e}>
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
                <label>Insert a description: </label>
                <input autoComplete="off" type="text" placeholder="description" name="description" input={input.description} onChange={(e) => handlleChange(e)}></input>
                {
                        error.description && <p className='error'>{error.description}</p>
                }
                </div>
                <div className='rating'>
                <label>Insert a rating: </label>
                <input type="number" placeholder="rating" name="rating" input={input.rating} onChange={(e) => handlleChange(e)}></input>
                {
                        error.rating && <p className='error'>{error.rating}</p>
                }
                </div>
                <div className='release'>
                <label>Insert a release day: </label>
                <input type="date" name="released" input={input.released} onChange={(e) => handlleChange(e)}></input>
                {
                        error.released && <p className='error'>{error.released}</p>
                }
                </div>
                <div className='img'>
                <label>Insert a image URL: </label>
                <input autoComplete="off" type="text" name="image" placeholder="Paste a img URL" input={input.image} onChange={(e) => handlleChange(e)}></input>
                </div>
                <button className='btn' type="submit" disabled={!input.name || Object.keys(error).length > 0} onClick={(e) => handleSubmit(e)}>Crear</button>
        </form>
        </div>

        <div className='conteinerGenres'>
        <div className='selectedGenres'>Selected genres</div>
        <div className='genres'>
        {
            input.genres?.map(e => {
                let genresSelected = genres.find(i => i.id === Number(e))
                return (
                    <button key={e} className='btn3' input={genresSelected.id} type="button" onClick={(e) => filterGenres(e)}>{genresSelected.name}</button>
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
                <button key={e} className='btn2' input={e} type="button" onClick={(e) => filterPlatfroms(e)}>{e}</button>
            )
        }
        </div>
        </div>
    </div>
    )
}



export default CreateGame