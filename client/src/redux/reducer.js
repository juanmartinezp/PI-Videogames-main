import {
    GET_ALL_GAMES,
    GET_GAME_BY_ID,
    GET_GAME_BY_NAME,
    CREATE_GAME,
    GET_ALL_GENRES,
    SET_CURRENT_PAGE,
    CLEAR_FILTERS,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    ORDER_BY_LOCATION,
    ORDER_BY_GENRES,
} from './actions';

const initialState = {
    games: [],
    allGames: [],
    game: [],
    genres: [],
    platforms: [],
    search: false,
    page: 1,
};


const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES:
            let platforms = [];
            action.payload.map(e => platforms = [...platforms, ...e.platforms]);
            return {
            ...state,
            search: false,
            games: [...action.payload],
            allGames: [...action.payload],
            platforms: Array.from(new Set(platforms)),
            page: 1
        }

        case GET_GAME_BY_ID:
            return {
                ...state,
                game:  action.payload,
                page: 1
        }

        // case DELETE_GAME:
        //     return {
        //         ...state,
        //         page: 1
        //     }

        case GET_GAME_BY_NAME:
            let error = {error: "No results found"}
            if(action.payload.msg){
                return {
                    ...state,
                    search: true,
                    allGames: error,
                    page: 1
                }
            }
            return {
                ...state,
                search: true,
                allGames: action.payload,
                games: action.payload,
                page: 1
        }

        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
        }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                page: action.payload
            }

        case CLEAR_FILTERS:
            return {
                ...state,
                game: [],
                games: [],
                allGames: []
            }
        

        case CREATE_GAME:
            return {
                ...state,
                games: [...state.games, action.payload],
                allGames: [...state.games, action.payload]
            }
        
        // case ORDER_BY_NAME:
        //     return {
        //         ...state,
        //         games: [...action.payload],
        //         page: 1
        // }

        case ORDER_BY_NAME:
            const order = action.payload === 'A-Z' ?
            state.games.sort((a , b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
                return 0
            })
            :
            state.games.sort((a , b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return - 1
                if(b.name.toLowerCase() > a.name.toLowerCase()) return 1
                return 0
            })
            return {
                ...state,
                games: order,
                page: 1
        }
        
        case ORDER_BY_RATING:
            const order2 = action.payload === "Higher - lower"?
            state.games.sort((a,b) => Number(b.rating) - Number(a.rating))
            : 
            state.games.sort((a,b) => Number(a.rating) - Number(b.rating))
        return {
            ...state,
            games: order2,
            page: 1
        }

        case ORDER_BY_LOCATION:
        const gameCreate = state.allGames
        console.log(gameCreate)
        const filterCreated = action.payload === "Created at db" ? gameCreate.filter(e => e.createdInDB) : gameCreate.filter(e => !e.createdInDB)
            return {
                ...state,
                games: action.payload === "All games" ? gameCreate : filterCreated
            }

        case ORDER_BY_GENRES:
            if(action.payload === "Default order"){
                return {
                    ...state,
                    games: state.allGames,
                    page: 1
                }
            }
            let order4 = state.games.filter(e => e.genres.includes(action.payload))
            let error3 = {error: "No results found"}
            if(order4.length === 0){
                return {
                    ...state,
                    allGames: error3,
                    page: 1
                }
            }
            return {
                ...state,
                games: order4,
                page: 1
            }
        default: return state
    }
}

export default rootReducer