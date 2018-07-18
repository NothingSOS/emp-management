import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchProjectDetailSuccess,
  fetchProjectDetailFailure
} from '../actions/projectDetail';
import api from '../services/api';

export function* fetchProjectDetailTask(action) {
  try {
    const projectDetail = yield call(api.fetchProjectDetail, action.payload.projectId);
    yield put(fetchProjectDetailSuccess(projectDetail));
  }
  catch (error) {
    yield put(fetchProjectDetailFailure(error));
  }
}

export function* watchFetchProjectDetailTask() {
  yield takeEvery(actionTypes.PROJECT_DETAIL_FETCH_REQUEST, fetchProjectDetailTask);
}

export default function* projectDetailSaga() {
  yield all([
    watchFetchProjectDetailTask(),
  ]);
}
