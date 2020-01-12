import {GET_MOVIE_RESPONSE, GET_MOVIES_REQUEST, NEXT_STEP} from "../constants/actionTypes";


const initialState = {
    fetchingMovies:false,
    movies:null,
    step:1

};

export default function moviesStore(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES_REQUEST:
            return {
                ...state,
                fetchingMovies: true,
            };
        case GET_MOVIE_RESPONSE:
            return {
                ...state,
                fetchingMovies:false,
                movies: action.payload
            };
        case NEXT_STEP:
            return{
                ...state,
                step: action.payload
            };
        default:
            return state;
    }

}