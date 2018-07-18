import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/actionTypes';

let initialState;
const token = localStorage.getItem('token');
if (token) {
  const user = jwt.decode(token);
  initialState = {
    isFetching: false,
    isAuthenticated: true,
    id: user.id,
    username: user.username
  };
}
else {
  initialState = {
    isFetching: false,
    isAuthenticated: false
  };
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        id: action.payload.user.id,
        username: action.payload.user.username
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.payload.message
      };
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.payload.message
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default auth;
