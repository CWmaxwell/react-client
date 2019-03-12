import { GET_COMMENTS, CLICK_COMMENT, ADD_COMMENT } from '../actions/type';

const initialState = {
    comments: [],
    comment: null,
    referenceComment: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS: 
            return {
                ...state,
                comments: action.payload
            }
        case CLICK_COMMENT:
            return {
                ...state,
                referenceComment: action.payload
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        default:
            return state;
    }
}