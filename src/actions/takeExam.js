import * as actionTypes from '../constants/actionTypes';
import history from '../history';

export const fetchTakeExamRequest = id => ({
  type: actionTypes.TAKE_EXAM_FETCH_REQUEST,
  payload: {
    id,
  }
});

export const fetchTakeExamSuccess = (examList, rowId, startTime) => ({
  type: actionTypes.TAKE_EXAM_FETCH_SUCCESS,
  payload: {
    examList,
    rowId,
    startTime,
  }
});

export const fetchTakeExamFailure = message => ({
  type: actionTypes.TAKE_EXAM_FETCH_FAILURE,
  payload: {
    message,
  }
});

export const fetchProgress = progressResult => ({
  type: actionTypes.TAKE_EXAM_FETCH_PROGRESS,
  payload: {
    progressResult,
  }
});

export const fetchCategory = categoryList => ({
  type: actionTypes.TAKE_EXAM_FETCH_CATEGORYLIST,
  payload: {
    categoryList,
  }
});

export const fetchSubCategory = subCategoryList => ({
  type: actionTypes.TAKE_EXAM_FETCH_SUB_CATEGORYLIST,
  payload: {
    subCategoryList,
  }
});

export const pageChange = value => ({
  type: actionTypes.TAKE_EXAM_PAGINATION_CHANGE,
  payload: {
    value,
  }
});

export const onPickRadioAnswer = (choice, currentActivePage, pickedAnswer, exId) => ({
  type: actionTypes.TAKE_EXAM_ON_PICK_RADIO,
  payload: {
    choice,
    currentActivePage,
    pickedAnswer,
    exId,
  },
});

export const onPickCheckboxAnswer = (choice, currentActivePage, pickedAnswer, exId) => ({
  type: actionTypes.TAKE_EXAM_ON_PICK_CHECKBOX,
  payload: {
    choice,
    currentActivePage,
    pickedAnswer,
    exId,
  },
});

export const onInputTextAreaAnswer = (text, currentActivePage, exId) => ({
  type: actionTypes.TAKE_EXAM_ON_INPUT_TEXTAREA,
  payload: {
    text,
    currentActivePage,
    exId,
  },
});

export const uploadAnswerListRequest = (rowId, answerList, isLogoutRequest, isEndExam, id) => ({
  type: actionTypes.TAKE_EXAM_UPLOAD_REQUEST,
  payload: {
    rowId,
    answerList,
    isLogoutRequest,
    isEndExam,
    id,
  }
});

export const uploadAnswerListSuccess = progress => ({
  type: actionTypes.TAKE_EXAM_UPLOAD_SUCCESS,
  payload: {
    progress
  }
});

export const uploadAnswerListFailure = message => ({
  type: actionTypes.TAKE_EXAM_UPLOAD_FAILURE,
  payload: {
    message,
  }
});

export const categoryChange = category => ({
  type: actionTypes.TAKE_EXAM_CATEGORY_CHANGE,
  payload: {
    category,
  }
});

export const finishExamRequest = (id, testDate) => ({
  type: actionTypes.TAKE_EXAM_FINISH_EXAM_REQUEST,
  payload: {
    id,
    testDate,
  }
});

export const finishExamSuccess = () => ({
  type: actionTypes.TAKE_EXAM_FINISH_EXAM_SUCCESS,
  payload: {
  }
});

export const finishExamFailure = message => ({
  type: actionTypes.TAKE_EXAM_FINISH_EXAM_FAILURE,
  payload: {
    message,
  }
});

export const logout = () => {
  localStorage.removeItem('examToken');
  history.push('/examlogin');
  return ({
    type: actionTypes.EXAM_LOGOUT,
  });
};
