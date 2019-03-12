import { GET_COMMENTS, CLICK_COMMENT, SET_CURRENT_USER, ADD_COMMENT, SET_COMMMENT_UPDATE } from './type';
import axios from 'axios';

// 获取评论列表
export const getComments = (id) => dispatch => {
    axios.get(`/api/comment/article/${id}`)
        .then(res => 
            dispatch({
                type: GET_COMMENTS,
                payload: res.data.data.list
            })
        )
        .catch(err => 
            dispatch({
                type: GET_COMMENTS,
                payload: null,
            })
        )
}

export const postComment = (comment, user) => dispatch => {
    let postData = {};
    if (user) {
        postData.name = user.name;
        postData.email = user.email;
        const userStr = JSON.stringify(user);
        localStorage.setItem('user', userStr);
        dispatch(setCurrentUser(user));
    } else {
        const storeUserStr = localStorage.user;
        const storeUser = JSON.parse(storeUserStr);
        postData.name = storeUser.name;
        postData.email = storeUser.email;
    }
    postData.article_id = comment.article_id;
    postData.content = comment.content;
    postData.Reference = comment.reference
    axios.post(`/api/comment/`, postData)
        .then(res => 
            dispatch({
                type: ADD_COMMENT, 
                payload: res.data
            })
        ).catch(err => console.log(err));

}

// 引用的评论
export const clickComment = (data) => dispatch => {
    if (data) {
        dispatch({
            type:CLICK_COMMENT,
            payload: data
        })
    } else {
        dispatch({
            type:CLICK_COMMENT,
            payload: null
        })
    }
}

export const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }
}

export const setCommentUpdate = () => dispatch => {
    // console.log('调用了setCommentUpdate');
    dispatch({
        type: SET_COMMMENT_UPDATE,
        payload: null
    });
}