import { TEST_DISPATH, SET_CURRENT_USER } from '../actions/type';

const initialState = {
  // isAuthenticated: false,
  user: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
        return {
            ...state,
            user: action.payload,
        }
    default:
      return state;
  }
}