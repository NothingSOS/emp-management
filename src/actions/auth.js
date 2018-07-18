import * as actionTypes from '../constants/actionTypes';
import api from '../services/api';
import history from '../history';

// Login
export const loginRequest = form => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: {
    form
  }
});

export const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: {
    user
  }
});

export const loginFailure = message => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: {
    message
  }
});

// Signup
export const signupRequest = form => ({
  type: actionTypes.SIGNUP_REQUEST,
  payload: {
    form
  }
});

export const signupSuccess = user => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: {
    user
  }
});

export const signupFailure = message => ({
  type: actionTypes.SIGNUP_FAILURE,
  payload: {
    message
  }
});

export const signup = form => (dispatch) => {
  dispatch(signupRequest(form));
  return api.signup(form)
    .then((user) => {
      dispatch(signupSuccess(user));
    })
    .catch((error) => {
      dispatch(signupFailure(error));
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  history.push('/login');
  return ({
    type: actionTypes.LOGOUT
  });
};
