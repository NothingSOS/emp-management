import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { loginSuccess, loginFailure } from '../actions/auth';
import api from '../services/api';
import history from '../history';

export function* loginTask(action) {
  try {
    const user = yield call(api.login, action.payload.form);
    localStorage.setItem('token', user.token);
    yield put(loginSuccess(user));
    history.push('/');
  }
  catch (error) {
    yield put(loginFailure(error));
  }
}

export function* watchLogin() {
  yield takeEvery(actionTypes.LOGIN_REQUEST, loginTask);
}

export default function* authSaga() {
  yield all([
    watchLogin()
  ]);
}
