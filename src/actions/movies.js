import {GET_MOVIE_RESPONSE, GET_MOVIES_REQUEST} from "../constants/actionTypes";


export function getMovies() {
    return (dispatch) => {
        dispatch({
            type: GET_MOVIES_REQUEST
        });
        dispatch(() => {
            let movies = require('../data/films');
            dispatch({
                type: GET_MOVIE_RESPONSE,
                payload: movies
            })

        });
    }
}