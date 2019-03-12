import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import commentReducer from './commentReducer';
export default combineReducers({
    auth: authReducer,
    article: articleReducer,
    comment: commentReducer,
})