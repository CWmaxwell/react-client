import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { TEST_DISPATH, SET_CURRENT_USER } from './type';



export const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }
}

export const register = (userData) => {
    return {
        type: TEST_DISPATH,
        payload: userData,
    }
}