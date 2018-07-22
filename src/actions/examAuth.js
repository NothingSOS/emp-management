import * as actionTypes from '../constants/actionTypes';
import history from '../history';

export const examLoginRequest = form => ({
  type: actionTypes.EXAM_LOGIN_REQUEST,
  payload: {
    form
  }
});

export const examLoginSuccess = user => ({
  type: actionTypes.EXAM_LOGIN_SUCCESS,
  payload: {
    user
  }
});

export const examLoginFailure = message => ({
  type: actionTypes.EXAM_LOGIN_FAILURE,
  payload: {
    message
  }
});

export const logout = () => {
  localStorage.removeItem('examToken');
  history.push('/examlogin');
  return ({
    type: actionTypes.EXAM_LOGOUT,
  });
};
