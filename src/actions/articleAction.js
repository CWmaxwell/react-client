import { ARTICLE_LOADING, GET_ARTICLES, GET_ARTICLE, GET_TAGNAME, UPDATE_ARTICLE_COMMENTS, UPDATE_ARTICLE_LIKES, GET_TAGNAMES } from './type';
import axios from 'axios';

// 文章点赞
export const updateArticlelikes = (id, email) => dispatch => {
    const postData = { email: email};
    axios.post(`/api/article/like/${id}`, postData)
        .then(res => {
            if (res.data.code === 200) {
                dispatch({
                    type: UPDATE_ARTICLE_LIKES,
                    payload: res.data.data
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

// 获取文章列表
export const getArticles = (category) => dispatch => {
    dispatch(setArticleLoading())
    axios.get(`/api/article${category}`)
        .then(res => 
            dispatch({
                type: GET_ARTICLES,
                payload: res.data.data.list
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ARTICLES,
                payload: null,
            })
        )
} 

// 获取文章详情
export const getArticle = (id) => dispatch => {
    dispatch(setArticleLoading())
    axios.get(`/api/article/${id}`)
        .then(res => {
            dispatch({
                type: GET_ARTICLE,
                payload: res.data.data,
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ARTICLE,
                payload: null,
            })
        )
}

// 更新文章详情
export const updateArticleComments = () => dispatch => {
    dispatch({
        type: UPDATE_ARTICLE_COMMENTS,
        payload: null
    })
}

// 获取标签|搜索名称
export const getTagName = (id, isTag) => dispatch => {
    // 如果没有id参数，即不是tag也不是search，则取消tagName
    if (!id) {
        dispatch({
            type: GET_TAGNAME,
            payload: null,
        })
        return;
    }
    if (isTag) {
        axios.get(`/api/tag/${id}`)
        .then(res => {
            dispatch({
                type: GET_TAGNAME,
                payload: res.data.data,
            })
        })
        .catch(err => 
            dispatch({
                type: GET_TAGNAME,
                payload: null,
            })
        )
    } else {
        dispatch({
            type: GET_TAGNAME,
            payload: id
        });
    }
    
}

export const getTags = () => dispatch => {
    axios.get(`/api/tag/`)
        .then(res => {
            dispatch({
                type: GET_TAGNAMES,
                payload: res.data.data.list
            })
        })
        .catch(err => 
            dispatch({
                type: GET_TAGNAME,
                payload: [],
            })
        )
}

//加载动画
export const setArticleLoading = () => {
    return {
        type: ARTICLE_LOADING
    }
}