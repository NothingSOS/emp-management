import { call, put, takeEvery, all } from 'redux-saga/effects';
import moment from 'moment';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentSuccess,
  fetchRecruitmentFailure,
  fetchPositionRecruitmentSuccess,
  fetchPositionRecruitmentFailure,
  createRecruitmentSuccess,
  createRecruitmentFailure,
  updateRecruitmentInterviewDateTimeFailure,
  updateRecruitmentInterviewDateTimeSuccess,
  updateRecruitmentSignedPositionFailure,
  updateRecruitmentSignedPositionSuccess,
  updateRecruitmentExamDateTimeFailure,
  updateRecruitmentExamDateTimeSuccess,
  updateRecruitmentSignDateTimeFailure,
  updateRecruitmentSignDateTimeSuccess,
  updateRecruitmentCompleteDateTimeFailure,
  updateRecruitmentCompleteDateTimeSuccess,
  updateRecruitmentRejectDateFailure,
  updateRecruitmentRejectDateSuccess,
  updateRecruitmentCancelDateFailure,
  updateRecruitmentCancelDateSuccess,
  updateRecruitmentBlacklistDateFailure,
  updateRecruitmentBlacklistDateSuccess,
  updateRecruitmentNoteFailure,
  updateRecruitmentNoteSuccess,
  updateRecruitmentInterviewResultFailure,
  updateRecruitmentInterviewResultSuccess,
  setUpModal,
  setUpModalComplete,
  activateExamUserSuccess,
  fetchGradingFailure,
  fetchGradingSuccess
} from '../actions/recruitment';
import api from '../services/api';

const countTheCategory = (examList) => {
  const categoryList = [];
  const subCategoryList = [];
  console.log(examList);
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

const addWarningExIdMemo = (set, exId) => {
  set.add(exId);
  return set;
};

const removeWarningExIdMemo = (set, exId) => {
  console.log(set, '??');
  set.delete(exId);
  return set;
};

export function* fetchRecruitmentTask() {
  try {
    const recruitments = yield call(api.fetchRecruitment);
    yield put(fetchRecruitmentSuccess(recruitments, moment().format('YYYY-MM-DD')));
  }
  catch (error) {
    yield put(fetchRecruitmentFailure(error));
  }
}

export function* fetchPositionRecruitmentTask() {
  try {
    const positions = yield call(api.fetchPositionRecruitment);
    yield put(fetchPositionRecruitmentSuccess(positions));
  }
  catch (error) {
    yield put(fetchPositionRecruitmentFailure(error));
  }
}

export function* createRecruitmentTask(action) {
  try {
    const recruitments = yield call(api.changeRecruitmentStatus, {
      applicant: action.payload.form
    });
    yield put(createRecruitmentSuccess(recruitments));
  }
  catch (error) {
    yield put(createRecruitmentFailure(error));
  }
}

export function* updateRecruitmentInterviewDateTimeTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentInterviewDateTime, {
      applicant: action.payload.datetime
    });
    yield put(updateRecruitmentInterviewDateTimeSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentInterviewDateTimeFailure(error));
  }
}

export function* updateRecruitmentExamDateTimeTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentExamDateTime, {
      applicant: action.payload.datetime
    });
    yield put(updateRecruitmentExamDateTimeSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentExamDateTimeFailure(error));
  }
}

export function* updateRecruitmentSignDateTimeTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentSignDateTime, {
      applicant: action.payload.datetime
    });
    yield put(updateRecruitmentSignDateTimeSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentSignDateTimeFailure(error));
  }
}

export function* updateRecruitmentCompleteDateTimeTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentCompleteDateTime, {
      applicant: action.payload.datetime
    });
    yield put(updateRecruitmentCompleteDateTimeSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentCompleteDateTimeFailure(error));
  }
}

export function* updateRecruitmentRejectDateTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentRejectDate, {
      applicant: action.payload.datetime
    });
    yield put(updateRecruitmentRejectDateSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentRejectDateFailure(error));
  }
}

export function* updateRecruitmentCancelDateTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentCancelDate, {
      applicant: action.payload.datetime
    });
    yield put(updateRecruitmentCancelDateSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentCancelDateFailure(error));
  }
}

export function* updateRecruitmentBlacklistDateTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentBlacklistDate, {
      applicant: action.payload.datetime
    });
    yield put(updateRecruitmentBlacklistDateSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentBlacklistDateFailure(error));
  }
}

export function* updateRecruitmentNoteTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentNote, {
      applicant: action.payload.values
    });
    yield put(updateRecruitmentNoteSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentNoteFailure(error));
  }
}

export function* updateRecruitmentInterviewResultTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentInterviewResult, {
      applicant: action.payload.values
    });
    yield put(updateRecruitmentInterviewResultSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentInterviewResultFailure(error));
  }
}

export function* updateRecruitmentSignedPositionTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentSignedPosition, {
      applicant: action.payload.form
    });
    yield put(updateRecruitmentSignedPositionSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentSignedPositionFailure(error));
  }
}

export function* preActivateTakeExamTask(action) {
  try {
    yield put(setUpModal());
    const examUser = yield call(api.getExamUser, {
      id: action.payload.person.citizenId,
      testDate: action.payload.person.examDate,
    });

    let userStatus = 'new';
    if (examUser.latestActivatedTime !== null) {
      const isAlive = moment(examUser.latestActivatedTime).add({ minutes: examUser.activationLifetimes }).diff(moment()) > 0;
      if (isAlive) {
        userStatus = 'alive';
      }
      else {
        userStatus = 'expired';
      }
    }
    yield put(setUpModalComplete({ examUser, userStatus, applicantData: action.payload.person }));
    yield put(openModal(modalNames.ACTIVE_EXAM_USER));
  }
  catch (error) {
    console.log(error);
  }
}

export function* activateExamUserTask(action) {
  try {
    yield call(api.activateExamUser, {
      id: action.payload.user.id,
      testDate: action.payload.user.testDate,
      timeLength: action.payload.timeLength,
      timeUnit: action.payload.timeUnit,
      registerDate: action.payload.registerDate,
    });

    const examUser = yield call(api.getExamUser, {
      id: action.payload.user.id,
      testDate: action.payload.user.testDate,
    });

    let userStatus = 'new';
    if (examUser.latestActivatedTime !== null) {
      const isAlive = moment(examUser.latestActivatedTime).add({ minutes: examUser.activationLifetimes }).diff(moment()) > 0;
      if (isAlive) {
        userStatus = 'alive';
      }
      else {
        userStatus = 'expired';
      }
    }

    yield call(api.updateRecruitmentTestStatus, {
      id: action.payload.user.id,
      registerDate: action.payload.registerDate,
      testStatus: 'Testing'
    });
    const recruitments = yield call(api.fetchRecruitment);
    yield put(fetchRecruitmentSuccess(recruitments));

    yield put(activateExamUserSuccess({ examUser, userStatus }));
  }
  catch (error) {
    console.log(error);
  }
}

export function* fetchGradingTask(action) {
  try {
    const gradingExamList = yield call(api.fetchGradingExam, action.payload.rowId);
    console.log('after call api:', gradingExamList);
    let tempModalWarningExIdList = action.payload.modalWarningExIdList;
    for (let i = 0; i < gradingExamList.length; i += 1) {
      const scoreWarning = gradingExamList[i].point[0] === 'UNKNOWN' ? '*requried' : gradingExamList[i].point[0];
      const fullScoreWarning = gradingExamList[i].point[1] === 'UNKNOWN' ? '*requried' : gradingExamList[i].point[1];
      gradingExamList[i] = {
        ...gradingExamList[i],
        scoreWarning,
        fullScoreWarning,
      };
      tempModalWarningExIdList = gradingExamList[i].status !== 'Graded' ?
        addWarningExIdMemo(tempModalWarningExIdList, gradingExamList[i].exId) :
        removeWarningExIdMemo(tempModalWarningExIdList, gradingExamList[i].exId);
    }
    console.log('before send:', gradingExamList);
    const object = countTheCategory(gradingExamList);
    yield put(fetchGradingSuccess(
      gradingExamList,
      action.payload.id,
      object.examAmountPerCategory,
      object.examAmountPerSubCategory,
      tempModalWarningExIdList,
    ));
    yield put(openModal(modalNames.GRADING_EXAM));
  }
  catch (error) {
    yield put(fetchGradingFailure(error));
  }
}

export function* watchFetchRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_REQUEST, fetchRecruitmentTask);
}

export function* watchfetchPositionRecruitmentTask() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_POSITION_REQUEST, fetchPositionRecruitmentTask);
}

export function* watchCreateRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_CREATE_REQUEST, createRecruitmentTask);
}

export function* watchUpdateRecruitmentInterviewDateTimeRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_REQUEST, updateRecruitmentInterviewDateTimeTask);
}

export function* watchUpdateRecruitmentExamDateTimeRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_REQUEST, updateRecruitmentExamDateTimeTask);
}

export function* watchUpdateRecruitmentSignDateTimeRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_REQUEST, updateRecruitmentSignDateTimeTask);
}

export function* watchUpdateRecruitmentCompleteDateTimeRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_REQUEST, updateRecruitmentCompleteDateTimeTask);
}

export function* watchUpdateRecruitmentRejectDateRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_REQUEST, updateRecruitmentRejectDateTask);
}

export function* watchUpdateRecruitmentCancelDateRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_REQUEST, updateRecruitmentCancelDateTask);
}

export function* watchUpdateRecruitmentBlacklistDateRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_REQUEST, updateRecruitmentBlacklistDateTask);
}

export function* watchUpdateRecruitmentNoteRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_NOTE_REQUEST, updateRecruitmentNoteTask);
}

export function* watchUpdateRecruitmentInterviewResultRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_REQUEST, updateRecruitmentInterviewResultTask);
}

export function* watchUpdateRecruitmentSignedPositionRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_REQUEST, updateRecruitmentSignedPositionTask);
}

export function* watchPreActivateTakeExamRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_PRE_ACTIVATE_TAKE_EXAM_REQUEST, preActivateTakeExamTask);
}

export function* watchActivateExamUserRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_ACTIVATE_EXAM_USER_REQUEST, activateExamUserTask);
}

export function* watchFetchGradingRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_GRADING_FETCH_REQUEST, fetchGradingTask);
}

export default function* recruitmentSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCreateRecruitmentRequest(),
    watchUpdateRecruitmentInterviewDateTimeRequest(),
    watchUpdateRecruitmentExamDateTimeRequest(),
    watchUpdateRecruitmentSignDateTimeRequest(),
    watchUpdateRecruitmentCompleteDateTimeRequest(),
    watchUpdateRecruitmentRejectDateRequest(),
    watchUpdateRecruitmentCancelDateRequest(),
    watchUpdateRecruitmentBlacklistDateRequest(),
    watchUpdateRecruitmentNoteRequest(),
    watchfetchPositionRecruitmentTask(),
    watchUpdateRecruitmentSignedPositionRequest(),
    watchUpdateRecruitmentInterviewResultRequest(),
    watchPreActivateTakeExamRequest(),
    watchActivateExamUserRequest(),
    watchFetchGradingRequest(),
  ]);
}
