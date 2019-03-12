import { ARTICLE_LOADING, GET_ARTICLES, GET_ARTICLE, GET_TAGNAME } from '../actions/type';

const initialState = {
    articles: [],
    article: null,
    tagName: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ARTICLE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                loading: false
            }
        case GET_ARTICLE:
            return {
                ...state,
                article: action.payload,
                loading: false
            }
        case GET_TAGNAME:
            return {
                ...state,
                tagName: action.payload
            }
        default:
            return state;
    }
}