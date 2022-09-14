import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { clearFilters, getGameByName } from "../redux/actions";
import './styles/SearchBar.css'



const SearchBar = () => {
    const [value, setValue] = useState("")
    const dispacth = useDispatch()


    const handlleClick = (e) => {
        e.preventDefault()
        if(value.length === 0){
            return
        }
        dispacth(clearFilters())
        dispacth(getGameByName(value))
        setValue("")
    }

    return (
        <div className='conteiner'>
            <input
                className='input'
                type="text"
                required=""
                placeholder=" 🔎Search videogame..."
                value={value}
                onChange={(e) => setValue(e.target.value)}>
            </input>

            <button
            className='search'
            type="submit"
            onClick={(e) => handlleClick(e)}>
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                    </svg>
                    </div>
                </div>
                <span>Search</span>
            </button>

        </div>
    )
}



export default SearchBar