import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  createLeaveSuccess,
  createLeaveFailure,
  fetchLeaveSuccess,
  fetchLeaveFailure,
  updateLeaveFailure,
  updateLeaveSuccess
} from '../actions/leave';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* createLeaveTask(action) {
  try {
    yield call(api.createLeave, {
      leaveRequest: action.payload.form
    });
    const leaves = yield call(api.fetchLeave);
    yield put(createLeaveSuccess(leaves));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createLeaveFailure(error));
    action.payload.reject();
  }
}

export function* fetchLeaveTask() {
  try {
    const leaves = yield call(api.fetchLeave);
    yield put(fetchLeaveSuccess(leaves));
  }
  catch (error) {
    yield put(fetchLeaveFailure(error));
  }
}

export function* updateLeaveTask(action) {
  try {
    const leaves = yield call(api.updateLeave, {
      leaveRequests: {
        userId: action.payload.userId,
        status: action.payload.status,
        leaveFrom: action.payload.leave.leaveFrom,
        leaveTo: action.payload.leave.leaveTo
      }
    });
    yield put(updateLeaveSuccess(leaves));
  }
  catch (error) {
    yield put(updateLeaveFailure(error));
  }
}

export function* watchCreateLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_CREATE_REQUEST, createLeaveTask);
}

export function* watchFetchLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_FETCH_REQUEST, fetchLeaveTask);
}

export function* watchUpdateLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_UPDATE_REQUEST, updateLeaveTask);
}

export default function* leaveSaga() {
  yield all([
    watchCreateLeaveRequest(),
    watchFetchLeaveRequest(),
    watchUpdateLeaveRequest()
  ]);
}
