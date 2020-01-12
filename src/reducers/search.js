import {CHANGE_SEARCH, SEARCH_DEFAULT, SHOW_SEARCH_RESULT} from "../constants/actionTypes";


const initialState = {
    search:'',
    showSearchResult:false
};

export default function searchStore(state = initialState, action) {
    switch (action.type) {
        case CHANGE_SEARCH:
            return {
                ...state,
                search: action.payload
            };
        case SHOW_SEARCH_RESULT:
            return {
                ...state,
                showSearchResult: true
            };
        case SEARCH_DEFAULT:
            return {
                ...state,
                search:'',
                showSearchResult:false
            };
        default:
            return state;
    }

}