import * as actionTypes from '../constants/actionTypes';

export const clickCheckbox = isAgree => ({
  type: actionTypes.TAKE_EXAM_AGREEMENT_CLICK_CHECKBOX,
  payload: {
    isAgree,
  }
});

export const clickAgree = (id, testdate) => ({
  type: actionTypes.TAKE_EXAM_AGREEMENT_START_EXAM_REQUEST,
  payload: {
    id,
    testdate,
  }
});

export const startExamSuccess = (message) => {
  window.location.href = '/takeexam';
  return {
    type: actionTypes.TAKE_EXAM_AGREEMENT_START_EXAM_SUCCESS,
    payload: {
      message
    }
  };
};

export const startExamFailure = message => ({
  type: actionTypes.TAKE_EXAM_AGREEMENT_START_EXAM_FAILURE,
  payload: {
    message
  }
});
