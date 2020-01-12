import {GET_TAGS_REQUEST, GET_TAGS_RESPONSE} from "../constants/actionTypes";


export function getTags() {
    return (dispatch) => {
        dispatch({
            type: GET_TAGS_REQUEST
        });
        dispatch(() => {
            let tags = require('../data/tags');
            dispatch({
                type: GET_TAGS_RESPONSE,
                payload: tags
            })

        });
    }
}