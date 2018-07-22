import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/actionTypes';

let initialState;
const token = localStorage.getItem('examToken');
if (token) {
  const user = jwt.decode(token);
  initialState = {
    isFetching: false,
    isAuthenticated: true,
    id: user.id,
    agreementStatus: user.agreementStatus,
    testdate: user.testdate
  };
}
else {
  initialState = {
    isFetching: false,
    isAuthenticated: false,
  };
}

const examAuth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EXAM_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        message: ' ',
      };
    case actionTypes.EXAM_LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        id: action.payload.user.id,
        agreementStatus: action.payload.user.agreementStatus,
        testdate: action.payload.user.testdate,
      };
    }
    case actionTypes.EXAM_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        message: 'Login Failed',
      };
    case actionTypes.EXAM_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        agreementStatus: '',
        message: ' ',
      };
    default:
      return state;
  }
};

export default examAuth;
