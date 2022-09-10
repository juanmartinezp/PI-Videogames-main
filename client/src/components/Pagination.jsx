import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/actions';
import './styles/Pagination.css'

function Pagination({ allGames }) {
    const pages = useSelector(state => state.page)
    const dispatch = useDispatch()
    let pageNumbers = []
    const gamePerPage = 15
    let page = Math.ceil(allGames / gamePerPage)


    for (let i = 1; i <= page; i++) {
    pageNumbers.push(i)
    }


    return (
    <div>
        <nav className='conteiner'>

        <button disabled={pages - 1 === 0} className='main_div' onClick={() => dispatch(setCurrentPage(pages - 1))}>Previous</button>
        { 
        pageNumbers?.map(e => (
            <button key={e} className='main_div' onClick={() => dispatch(setCurrentPage(e))}>{e}</button>
        ))
        }
        <button disabled={pages === page} className='main_div' onClick={() => dispatch(setCurrentPage(pages + 1))}>Next</button>
        </nav>
    </div>
    )
}

export default Pagination