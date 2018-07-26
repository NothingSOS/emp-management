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

const countTheCategory = (examList) => {
  const categoryList = [];
  const subCategoryList = [];

  Object(examList).map((item) => {
    if (!categoryList.includes(item.exCategory)) categoryList.push(item.exCategory);
    if (!subCategoryList.includes([item.exCategory, item.exSubCategory].join(' '))) {
      subCategoryList.push([item.exCategory, item.exSubCategory].join(' '));
    }
    return 1;
  });

  const examAmountPerCategory = [];
  const examAmountPerSubCategory = [];
  for (let i = 0; i < categoryList.length; i += 1) {
    let count = 0;
    for (let j = 0; j < examList.length; j += 1) {
      if (categoryList[i] === examList[j].exCategory) { count += 1; }
    }
    examAmountPerCategory.push([categoryList[i], count]);
  }

  for (let i = 0; i < subCategoryList.length; i += 1) {
    let count = 0;
    for (let j = 0; j < examList.length; j += 1) {
      if (categoryList[i] === examList[j].exCategory
        && subCategoryList[i].split(' ')[1] === examList[j].exSubCategory) { count += 1; }
    }
    examAmountPerSubCategory.push([subCategoryList[i], count]);
  }

  return {
    examAmountPerCategory,
    examAmountPerSubCategory,
  };
};

export function* fetchTestExamTask(action) {
  try {
    const startTime = moment();
    console.log(action.payload);
    const returnObject = yield call(api.getRowId, action.payload.id, startTime.format('YYYY-MM-DD'));
    console.log('is this row id:', returnObject.rowId);
    const randomExIdList = yield call(api.fetchRandomExIdList, returnObject.rowId);
    console.log(randomExIdList);
    const examList = yield call(api.fetchExamSpecifyId, randomExIdList);
    console.log(examList);
    const object = countTheCategory(examList);
    yield put(fetchCategory(object.examAmountPerCategory));
    yield put(fetchSubCategory(object.examAmountPerSubCategory));

    // 123
    const initialAnswerList = [];
    for (let i = 0; i < randomExIdList.randomExIdList.length; i += 1) {
      initialAnswerList.push(JSON.stringify({ answer: [], question: randomExIdList.randomExIdList[i] }));
    }
    const tempProgressResult = yield call(api.checkProgress, returnObject.rowId, action.payload.id, startTime.format('YYYY-MM-DD'), startTime, initialAnswerList);
    const progressResult = [];
    if (tempProgressResult !== null) {
      for (let i = 0; i < tempProgressResult.answerList.length; i += 1) {
        progressResult.push(JSON.parse(tempProgressResult.answerList[i]));
      }
    }
    yield put(fetchProgress(progressResult));
    yield put(fetchTakeExamSuccess(
      examList,
      returnObject.rowId,
      tempProgressResult !== null && tempProgressResult.startTime !== null ?
        moment(tempProgressResult.startTime) :
        startTime
    ));
  }
  catch (error) {
    yield put(fetchTakeExamFailure(error));
  }
}

export function* uploadAnswerListTask(action) {
  try {
    // 123
    console.log('1212312121', action.payload);
    const progress = yield call(api.uploadAnswer, action.payload.rowId, action.payload.answerList, action.payload.id, moment().format('YYYY-MM-DD'));
    yield put(uploadAnswerListSuccess(progress));
    if (action.payload.isEndExam) {
      yield put(finishExamRequest(action.payload.id, moment().format('YYYY-MM-DD')));
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
    console.log('update result:', yield call(api.updateSubmittedTime, action.payload.rowId, currentTime));
    const object = yield call(api.getRowId, action.payload.id, currentTime.format('YYYY-MM-DD'));
    const needCheck = yield call(api.grading, object.rowId.toString());
    // yield call(api.sendMailFinishExam, action.payload.id, currentTime.format('YYYY-MM-DD'), needCheck);
    console.log('after send mail?', needCheck);
    if (needCheck) {
      console.log('change to grading 1');
      const x = yield call(api.changeTestStatus, object.rowId.toString(), 'Grading');
      console.log('change to grading 2', x);
    }
    else {
      console.log('change to finish 1');
      const x = yield call(api.changeTestStatus, object.rowId.toString(), 'Finish');
      console.log('change to finish 2', x);
    }
    console.log('Change status finish!');
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
