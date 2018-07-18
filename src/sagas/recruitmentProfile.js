import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentProfileSuccess,
  fetchRecruitmentProfileFailure,
} from '../actions/recruitmentProfile';
import api from '../services/api';

export function* fetchRecruitmentProfileTask(action) {
  try {
    const applicant = {};
    applicant.profile = yield call(api.fetchRecruitmentProfile, action.payload.id);
    applicant.file = yield call(api.fetchRecruitmentFile, action.payload.id);
    yield put(fetchRecruitmentProfileSuccess(applicant));
  }
  catch (error) {
    yield put(fetchRecruitmentProfileFailure(error));
  }
}

export function* watchFetchRecruitmentProfileRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_PROFILE_FETCH_REQUEST, fetchRecruitmentProfileTask);
}

export default function* recruitmentProfileSaga() {
  yield all([
    watchFetchRecruitmentProfileRequest(),
  ]);
}
