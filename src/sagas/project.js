import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchProjectSuccess,
  fetchProjectFailure,
  createProjectSuccess,
  createProjectFailure,
} from '../actions/project';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* fetchProjectTask(action) {
  try {
    const projects = yield call(api.fetchProject, action.payload.id);
    yield put(fetchProjectSuccess(projects));
  }
  catch (error) {
    yield put(fetchProjectFailure(error));
  }
}

export function* createProjectTask(action) {
  try {
    console.log(action.form);
    yield call(api.createProject, {
      project: action.payload.form
    });
    const projects = yield call(api.fetchProject, action.payload.id);
    yield put(createProjectSuccess(projects));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createProjectFailure(error));
    action.payload.reject();
  }
}

export function* watchFetchProjectRequest() {
  yield takeEvery(actionTypes.PROJECT_FETCH_REQUEST, fetchProjectTask);
}

export function* watchCreateProjectRequest() {
  yield takeEvery(actionTypes.PROJECT_CREATE_REQUEST, createProjectTask);
}

export default function* projectSaga() {
  yield all([
    watchFetchProjectRequest(),
    watchCreateProjectRequest()
  ]);
}
