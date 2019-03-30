import { ARTICLE_LOADING, GET_ARTICLES, GET_ARTICLE, GET_TAGNAME, UPDATE_ARTICLE_COMMENTS, UPDATE_ARTICLE_LIKES, GET_TAGNAMES } from '../actions/type';

const initialState = {
    articles: [],
    article: null,
    tagName: null,
    tags: [],
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
        case UPDATE_ARTICLE_COMMENTS:
            state.article.meta.comments += 1
            return {
                ...state,
            }
        case GET_TAGNAME:
            return {
                ...state,
                tagName: action.payload
            }
        case GET_TAGNAMES:
            return {
                ...state,
                tags: action.payload
            }
        case UPDATE_ARTICLE_LIKES:
            return {
                ...state,
                article: action.payload
            }
        default:
            return state;
    }
}