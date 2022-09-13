import axios from 'axios'

//---------------------------- RUTAS -----------------------------------
const RUTA_VIDEOGAMES = "http://localhost:3001/videogames"
const RUTA_GENRES = "http://localhost:3001/genres"


//------------------------- ACTION TYPES --------------------------------
export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const GET_GAME_BY_ID = "GET_GAME_BY_ID"
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME"
export const CREATE_GAME = "CREATE_GAME"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const CLEAR_FILTERS = "CLEAR_FILTERS"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_RATING = "ORDER_BY_RATING"
export const ORDER_BY_LOCATION = "ORDER_BY_LOCATION"
export const ORDER_BY_GENRES = "ORDER_BY_GENRES"


//------------------------- ACTIONS -------------------------------------

export function getAllGames() {
    return function (dispatch) {
        return axios.get(`${RUTA_VIDEOGAMES}`)
        .then (videogames => dispatch({type: GET_ALL_GAMES, payload: videogames.data}))
        .catch (error => alert ('Sorry, I cant get all the games', error.message));
    };
};
// export const getAllGames = () => (dispatch) => {
//     fetch(`${RUTA_VIDEOGAMES}`)
//     .then(res => res.json())
//     .then(videogames => dispatch({type: GET_ALL_GAMES, payload: videogames}))
//     .catch(error => console.log(error))
// }


export function getGameByID(id) {
    return function (dispatch) {
        return axios.get(`${RUTA_VIDEOGAMES}/${id}`)
        .then (videogame => dispatch({type: GET_GAME_BY_ID, payload: videogame.data}))
        .catch (error => alert ('Sorry, I cant get that game', error.message));
    };
};


export function getGameByName(name) {
    return function (dispatch) {
        return axios.get(`${RUTA_VIDEOGAMES}?name=${name}`)
        .then (videogame => dispatch({type: GET_GAME_BY_NAME, payload: videogame.data}))
        .catch (error => alert ('Sorry, I cant get that game', error.message));
    };
};


export function createGame(payload) {
    return function (dispatch) {
        return axios.post(`${RUTA_VIDEOGAMES}`, payload)
        .then (newGame => dispatch({type: CREATE_GAME, payload: newGame.data}))
        .catch (error => alert ('Sorry, I cant create that game', error.message));
    };
};

export function getAllGenres() {
    return function (dispatch) {
        return axios.get(`${RUTA_GENRES}`)
        .then (genres => dispatch({type: GET_ALL_GENRES, payload: genres.data}))
        .catch (error => alert ('Sorry, I cant get all the genres', error.message));
    };
};

export function setCurrentPage(page) {
    return function (dispatch) {
        return dispatch({type: SET_CURRENT_PAGE, payload: page})
    };
};

export function clearFilters() {
    return function (dispatch) {
        return dispatch({type: CLEAR_FILTERS})
    };
};

// export function orderByName(payload, arr) {
//     return function (dispatch) {
//         let order 
//         if(payload === 'A-Z') {
//         const arrOrdered =  arr.sort((a , b) => {
//             if(a.name > b.name) return 1
//             if(b.name > a.name) return -1
//             return 0
//         })
//         order = arrOrdered
//         }
//         else {
//         const arrOrdered = arr.sort((a , b) => {
//             if(a.name > b.name) return - 1
//             if(b.name > a.name) return 1
//             return 0
//         })
//         order = arrOrdered
//         }
//         return dispatch({type: ORDER_BY_NAME, payload: order})
//     };
// };

export function orderByName(payload) {
    return function (dispatch) {
        return dispatch({type: ORDER_BY_NAME, payload})
    }
}

export function orderByRating(payload) {
    return function (dispatch) {
        return dispatch({type: ORDER_BY_RATING, payload})
    };
};


export function orderByLocation(payload) {
    return function (dispatch) {
        return dispatch({type: ORDER_BY_LOCATION, payload})
    };
};

export function orderByGenres(payload) {
    return function (dispatch) {
        return dispatch({type: ORDER_BY_GENRES, payload})
    };
};