import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { clearFilters } from "../redux/actions";
import './styles/LandingPage.css'


const LandingPAge = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(clearFilters())  
    },[dispatch])

    return (
        <div className='home'>
            <h2 className='homeText'>APP GAMERY</h2>
            <Link to="/home">
            <h4 className='homeLink'>CLICK HERE!</h4>
            </Link>
        </div>
    )
}

export default LandingPAge