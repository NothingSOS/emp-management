import { call, put, takeEvery, all } from 'redux-saga/effects';
import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchTakeExamFailure,
  fetchTakeExamSuccess,
  uploadAnswerListFailure,
  uploadAnswerListSuccess,
  fetchProgress,
  fetchCategory,
  fetchSubCategory,
  finishExamRequest,
  finishExamFailure,
  finishExamSuccess,
  logout,
} from '../actions/takeExam';
import api from '../services/api';

export function* fetchTestExamTask(action) {
  try {
    const startTime = moment();

    const randomExIdList = yield call(api.fetchRandomExIdList, action.payload.id, startTime.format('YYYY-MM-DD'));
    const examList = yield call(api.fetchExamSpecifyId, randomExIdList);
    const categoryList = [];
    const subCategoryList = [];
    Object(examList).map((item) => {
      if (!categoryList.includes(item.exCategory)) categoryList.push(item.exCategory);
      if (!subCategoryList.includes([item.exCategory, item.exSubcategory].join(' '))) subCategoryList.push([item.exCategory, item.exSubcategory].join(' '));
      return 1;
    });
    const examAmountPerCategory = [];
    const examAmountPerSubCategory = [];
    for (let i = 0; i < categoryList.length; i += 1) {
      let count = 0;
      for (let j = 0; j < examList.length; j += 1) {
        if (categoryList[i] === examList[j].exCategory) {
          count += 1;
        }
      }
      examAmountPerCategory.push([categoryList[i], count]);
    }

    for (let i = 0; i < subCategoryList.length; i += 1) {
      let count = 0;
      for (let j = 0; j < examList.length; j += 1) {
        if (categoryList[i] === examList[j].exCategory && subCategoryList[i] === examList[j].exSubcategory) {
          count += 1;
        }
      }
      examAmountPerSubCategory.push([subCategoryList[i], count]);
    }
    yield put(fetchCategory(examAmountPerCategory));
    yield put(fetchSubCategory(examAmountPerSubCategory));

    const tempProgressResult = yield call(api.checkProgress, action.payload.id, startTime.format('YYYY-MM-DD'), startTime);
    const progressResult = [];
    if (tempProgressResult !== null) {
      for (let i = 0; i < tempProgressResult.answerList.length; i += 1) {
        progressResult.push(JSON.parse(tempProgressResult.answerList[i]));
      }
    }
    yield put(fetchProgress(progressResult));
    yield put(fetchTakeExamSuccess(examList, (tempProgressResult !== null && tempProgressResult.startTime !== null) ? moment(tempProgressResult.startTime) : startTime));
  }
  catch (error) {
    yield put(fetchTakeExamFailure(error));
  }
}

export function* uploadAnswerListTask(action) {
  try {
    const progress = yield call(api.uploadAnswer, action.payload.id, action.payload.answerList, moment().format('YYYY-MM-DD'));
    yield put(uploadAnswerListSuccess(progress));
    if (action.payload.isEndExam) {
      yield put(finishExamRequest(action.payload.id));
    }
    if (action.payload.isLogoutRequest) {
      yield put(logout());
    }
  }
  catch (error) {
    yield put(uploadAnswerListFailure(error));
  }
}

export function* finishExamTask(action) {
  try {
    const currentTime = moment();
    yield call(api.updateSubmittedTime, action.payload.id, currentTime, currentTime.format('YYYY-MM-DD'));
    console.log('test2');
    yield call(api.deActivate, action.payload.id, 'deactive');
    console.log('test3');
    yield put(finishExamSuccess());
    yield put(logout());
  }
  catch (error) {
    yield put(finishExamFailure(error));
  }
}

export function* watchFetchTakeExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_FETCH_REQUEST, fetchTestExamTask);
}

export function* watchUploadAnswerListRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_UPLOAD_REQUEST, uploadAnswerListTask);
}

export function* watchFinishExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_FINISH_EXAM_REQUEST, finishExamTask);
}

export default function* takeExamSaga() {
  yield all([
    watchFetchTakeExamRequest(),
    watchUploadAnswerListRequest(),
    watchFinishExamRequest(),
  ]);
}
