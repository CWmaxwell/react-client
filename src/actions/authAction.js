import axios from 'axios';
import { TEST_DISPATH, SET_CURRENT_USER } from './type';


export const updateUser = userData => dispatch => {
    console.log('调用了updateUser传过来的信息', userData);
    axios.post(`/api/comment/userupdate`, userData)
        .then(res => 
            dispatch({
                type: SET_CURRENT_USER, 
                payload: res.data
            })
        ).catch(err => console.log(err));
}

  