import {CHANGE_SELECTED_TAGS, GET_TAGS_REQUEST, GET_TAGS_RESPONSE} from "../constants/actionTypes";


const initialState = {
    fetchingTags:false,
    tags:null,
    tagsSelected:[]
};

export default function tagsStore(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS_REQUEST:
            return {
                ...state,
                fetchingTags: true,
            };
        case GET_TAGS_RESPONSE:
            return {
                ...state,
                fetchingTags:false,
                tags: action.payload
            };
        case CHANGE_SELECTED_TAGS:
            return{
                ...state,
                tagsSelected: action.payload
            };
        default:
            return state;
    }

}