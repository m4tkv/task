import {CHANGE_FAVORITE, SWITCH_BUTTON} from "../constants/actionTypes";


const initialState = {
    showFavorites:localStorage.getItem('showFavorites')?JSON.parse(localStorage.getItem('showFavorites')):false,
    favoriteMovies:localStorage.getItem('favoriteMovies')?JSON.parse(localStorage.getItem('favoriteMovies')):[]
};

export default function favoritesStore(state = initialState, action) {
    switch (action.type) {
        case SWITCH_BUTTON:
            return {
                ...state,
                showFavorites: action.payload,
            };
        case CHANGE_FAVORITE:{
            return {
                ...state,
                favoriteMovies:action.payload
            }
        }
        default:
            return state;
    }

}