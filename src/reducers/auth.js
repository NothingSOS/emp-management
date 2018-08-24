import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/actionTypes';
import { isExpired } from '../utils/helper';

let initialState;
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  const { id, username, type, name } = jwt.decode(accessToken);
  initialState = {
    isFetching: false,
    isAuthenticated: !isExpired(accessToken),
    id,
    username,
    type,
    name
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
        username: action.payload.user.username,
        type: action.payload.user.type,
        name: action.payload.user.name
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
        initialState
      };
    default:
      return state;
  }
};

export default auth;
