import { ARTICLE_LOADING, GET_ARTICLES, GET_ARTICLE, GET_TAGNAME } from './type';
import axios from 'axios';

// 获取文章列表
export const getArticles = (category) => dispatch => {
    dispatch(setArticleLoading())
    axios.get(`/api/article/${category}`)
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

// 获取标签|搜索名称
export const getTagName = (id) => dispatch => {
    // 如果没有id参数，即不是tag也不是search，则取消tagName
    if (!id) {
        dispatch({
            type: GET_TAGNAME,
            payload: null,
        })
        return;
    }
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
}

//加载动画
export const setArticleLoading = () => {
    return {
        type: ARTICLE_LOADING
    }
}