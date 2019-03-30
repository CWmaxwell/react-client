import { GET_COMMENTS, CLICK_COMMENT, ADD_COMMENT, SET_COMMMENT_UPDATE, UPDATE_COMMENTS } from '../actions/type';

const initialState = {
    comments: [],
    comment: null,
    referenceComment: null,
    postupdate: false,
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
                comments: [...state.comments, action.payload],
                postupdate: true
            }
        case SET_COMMMENT_UPDATE:
            return {
                ...state,
                postupdate: false
            }
        case UPDATE_COMMENTS:
            const { comments } = state;
            const length = comments.length;
            for (let i = 0; i < length; i++) {
                let tempComment = comments[i];
                if (tempComment._id === action.payload._id) {
                    comments.splice(i, 1, action.payload);
                }
            }
            return {
                ...state,
                comments: comments,
            }
        default:
            return state;
    }
}