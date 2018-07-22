import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import api from '../services/api';
import {
  startExamFailure,
  startExamSuccess,
} from '../actions/takeExamAgreement';

export function* startExamTask(action) {
  try {
    const resStart = yield call(api.startExam, {
      id: action.payload.id,
      testdate: action.payload.testdate
    });
    localStorage.setItem('examToken', resStart.newToken);
    yield put(startExamSuccess(resStart.id));
  }
  catch (error) {
    yield put(startExamFailure(error));
  }
}

export function* watchStartExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_AGREEMENT_START_EXAM_REQUEST, startExamTask);
}

export default function* takeExamAgreementSagae() {
  yield all([
    watchStartExamRequest(),
  ]);
}
