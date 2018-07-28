import { call, put, takeEvery, all } from 'redux-saga/effects';
import moment from 'moment';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentRequest,
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
  fetchGradingSuccess,
  scoreStatusPushBack,
  saveGradingListSuccess,
  saveGradingListFailure,
  saveGradingListRequest,
  sendGradingListSuccess,
  sendGradingListFailure,
  fetchGradingRequest,
  changeInterviewStatusResponse,
  // fetchTestStatusResponse,
} from '../actions/recruitment';
import api from '../services/api';

const invalidAnswer = answer => (
  answer.includes(undefined)
  || answer.includes('')
  || answer.includes(null)
  || answer.includes('UNKNOWN')
);

const shuffle = (a) => {
  for (let i = a.length - 1; i >= 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

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
  set.delete(exId);
  return set;
};

const setWarning = (list, id, [scoreWarning, fullScoreWarning], modalWarningExIdList) => {
  console.log(list, id);
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].exId === id) {
      if (scoreWarning) list[i].scoreWarning = scoreWarning;
      if (fullScoreWarning) list[i].fullScoreWarning = fullScoreWarning;
      if (list[i].scoreWarning === ' ' && list[i].fullScoreWarning === ' ') {
        modalWarningExIdList = addWarningExIdMemo(modalWarningExIdList, id);
        list[i].status = 'Graded';
      }
      else {
        modalWarningExIdList = removeWarningExIdMemo(modalWarningExIdList, id);
        list[i].status = 'Wait for grading';
      }
    }
  }
  console.log(list, modalWarningExIdList);
  return [list, modalWarningExIdList];
};

const matchStatusToWarning = (status) => {
  const invalidInput = 'Please insert an non negative (1 decimal place or integer)';
  const inputExceed = 'Score can\'t more than Fullscore';
  const nonZero = 'Non-zero isn\'t allow for Scroll when Fullscore is zero';
  const mapping = {
    scoreValueError: [invalidInput, null],
    fullScoreValueError: [null, invalidInput],
    bothScoreValueError: [invalidInput, invalidInput],
    scoreValueExceed: [inputExceed, inputExceed],
    scoreWithNoFullScore: [nonZero, null],
    OK: [' ', ' ']
  };
  console.log('Mapping Status:', mapping[status]);
  return mapping[status] ? mapping[status] : [null, null];
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
      rowId: action.payload.person.rowId,
      testDate: action.payload.person.examDate,
      citizenId: action.payload.person.citizenId,
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
      rowId: action.payload.user.rowId,
      testDate: action.payload.user.testDate,
      timeLength: action.payload.timeLength,
      timeUnit: action.payload.timeUnit,
      registerDate: action.payload.registerDate,
    });

    const examUser = yield call(api.getExamUser, {
      rowId: action.payload.user.rowId,
      testDate: action.payload.user.testDate,
      citizenId: action.payload.user.id,
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
      rowId: action.payload.user.rowId,
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
      const scoreWarning = gradingExamList[i].point[0] === 'UNKNOWN' ? '*requried' : ' ';
      const fullScoreWarning = gradingExamList[i].point[1] === 'UNKNOWN' ? '*requried' : ' ';
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
      action.payload.rowId,
    ));
    if (!action.payload.isSend) {
      yield put(openModal(modalNames.GRADING_EXAM));
    }
  }
  catch (error) {
    yield put(fetchGradingFailure(error));
  }
}
export function* randomExamTask(action) {
  try {
    const EPRList = yield call(api.fetchEPRList, action.payload.rowId);
    const rawExamList = yield call(api.fetchExamId);
    const randomExIdList = [];
    console.log('EPRList', EPRList);
    console.log('rawExamList', rawExamList);
    for (let i = 0; i < EPRList.length; i += 1) {
      for (let j = 0; j < rawExamList.length; j += 1) {
        if (rawExamList[j].category.toLowerCase() === EPRList[i].category.toLowerCase()
          && rawExamList[j].subcategory.toLowerCase() === EPRList[i].subcategory.toLowerCase()
          && rawExamList[j].type.toLowerCase() === EPRList[i].type.toLowerCase()) {
          const idList = (shuffle(rawExamList[j].exIdList.slice())).slice(0, EPRList[i].requiredNumber);
          const temp = Object.assign({}, rawExamList[j]);
          temp.exIdList = idList.slice();
          randomExIdList.push(temp);
          break;
        }
      }
    }
    console.log('before upload', randomExIdList);
    yield call(api.uploadRandomExIdList, action.payload.rowId, randomExIdList);
    console.log('after that');
  }
  catch (error) {
    console.log('random exam error:', error);
  }
}

export function* gradingModalScoreHandleTask(action) {
  try {
    // action.payload: scoreStatus, exId, gradingList, modalWarningExIdList
    yield console.log(action);
    let tempModalWarningExIdList = action.payload.modalWarningExIdList;
    let gradingExamList = action.payload.gradingList.slice();

    [gradingExamList, tempModalWarningExIdList] = setWarning(gradingExamList, action.payload.exId, matchStatusToWarning([action.payload.scoreStatus]), tempModalWarningExIdList);

    yield put(scoreStatusPushBack(gradingExamList, tempModalWarningExIdList));
  }
  catch (error) {
    console.log(error);
  }
}

export function* saveGradingTask(action) {
  try {
    const tempGradingList = action.payload.gradingList.slice();
    let tempModalWarningExIdList = action.payload.modalWarningExIdList;
    for (let i = 0; i < tempGradingList.length; i += 1) {
      const tempPoint = tempGradingList[i].point;
      if (tempPoint[0].substring(tempPoint[0].length - 1) === '.') {
        tempPoint[0] = tempPoint[0].substring(0, tempPoint[0].length - 1);
      }
      if (tempPoint[1].substring(tempPoint[1].length - 1) === '.') {
        tempPoint[1] = tempPoint[1].substring(0, tempPoint[1].length - 1);
      }
      if (!invalidAnswer(tempPoint)
        && tempGradingList[i].scoreWarning === ' '
        && tempGradingList[i].scoreWarning === ' ') {
        tempGradingList[i] = {
          ...tempGradingList[i],
          point: tempPoint,
          status: 'Graded',
        };
        tempModalWarningExIdList = removeWarningExIdMemo(tempModalWarningExIdList, tempGradingList[i].exId);
      }
      else {
        tempGradingList[i] = {
          ...tempGradingList[i],
          status: 'Wait for Grading',
        };
        tempModalWarningExIdList = addWarningExIdMemo(tempModalWarningExIdList, tempGradingList[i].exId);
      }
    }
    const uploadTemp = [];
    for (let i = 0; i < tempGradingList.length; i += 1) {
      if (tempGradingList[i].status === 'Graded') {
        uploadTemp.push(tempGradingList[i]);
      }
      else {
        tempModalWarningExIdList = addWarningExIdMemo(tempModalWarningExIdList, tempGradingList[i].exId);
      }
    }
    yield call(api.uploadGradeProgress, uploadTemp);
    yield put(fetchGradingRequest(action.payload.rowId, tempModalWarningExIdList, action.payload.id, true));
    yield put(saveGradingListSuccess());
  }
  catch (error) {
    yield put(saveGradingListFailure(error));
  }
}

export function* sendGradingTask(action) {
  try {
    console.log('send grading payload', action.payload);
    yield put(saveGradingListRequest(action.payload.gradingList, action.payload.rowId, action.payload.modalWarningExIdList, action.payload.id, true));
    if (action.payload.modalWarningExIdList.size < 1) {
      console.log('SUCCESS?');
      console.log('???', yield call(api.changeTestStatus, action.payload.rowId.toString(), 'Finish'));
      yield put(fetchRecruitmentRequest());
      console.log('SUCCESS!');
      yield put(sendGradingListSuccess());
    }
    else {
      console.log('adlkadadkladlknadskljsdalk', action.payload.modalWarningExIdList);
      yield put(sendGradingListFailure('there is un-graded'));
    }
  }
  catch (error) {
    yield put(sendGradingListFailure(error));
  }
}

export function* changeInterviewStatus(action) {
  try {
    const recruitments = yield call(api.changeInterviewStatus, {
      applicant: action.payload.rowId
    });
    console.log('===============', recruitments);
    yield put(changeInterviewStatusResponse(recruitments));
  }
  catch (error) {
    console.log(error);
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

export function* watchSaveGradingRequest() {
  yield takeEvery(actionTypes.GRADING_MODAL_SAVE_REQUEST, saveGradingTask);
}

export function* watchSendGradingRequest() {
  yield takeEvery(actionTypes.GRADING_MODAL_SEND_REQUEST, sendGradingTask);
}

export function* watchRandomExamRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_RANDOM_EXAM, randomExamTask);
}

export function* watchGradingModalScoreHanldeRequest() {
  yield takeEvery(actionTypes.GRADING_MODAL_SCORE_HANDLE, gradingModalScoreHandleTask);
}

export function* watchChangeStatus() {
  yield takeEvery(actionTypes.CHANGE_INTERVIEW_STATUS_REQUEST, changeInterviewStatus);
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
    watchRandomExamRequest(),
    watchGradingModalScoreHanldeRequest(),
    watchSaveGradingRequest(),
    watchSendGradingRequest(),
    // watchFetchTestStatusRequest(),
    watchChangeStatus(),
  ]);
}
