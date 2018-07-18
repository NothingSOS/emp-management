import * as actionTypes from '../constants/actionTypes';

export const addExamRequest = (form, resolve, reject) => ({
  type: actionTypes.ADD_EXAM_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const addExamSuccess = exam => ({
  type: actionTypes.ADD_EXAM_SUCCESS,
  payload: {
    exam
  }
});

export const addExamFailure = message => ({
  type: actionTypes.ADD_EXAM_FAILURE,
  payload: {
    message
  }
});

export const fetchExamRequest = () => ({
  type: actionTypes.EXAM_FETCH_REQUEST
});

export const fetchExamSuccess = exams => ({
  type: actionTypes.EXAM_FETCH_SUCCESS,
  payload: {
    exams
  }
});

export const fetchExamFailure = message => ({
  type: actionTypes.EXAM_FETCH_FAILURE,
  payload: {
    message
  }
});

export const filterExams = (key, value) => ({
  type: actionTypes.FILTER_EXAMS,
  payload: {
    key,
    value
  }
});

export const deleteExamRequest = id => ({
  type: actionTypes.DELETE_EXAM_REQUEST,
  payload: {
    id
  }
});

export const deleteExamSuccess = id => ({
  type: actionTypes.DELETE_EXAM_SUCCESS,
  payload: {
    id
  }
});

export const deleteExamFailure = message => ({
  type: actionTypes.DELETE_EXAM_FAILURE,
  payload: {
    message
  }
});

export const editExamRequest = (form, resolve, reject) => ({
  type: actionTypes.EDIT_EXAM_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const editExamSuccess = exam => ({
  type: actionTypes.EDIT_EXAM_SUCCESS,
  payload: {
    exam
  }
});

export const editExamFailure = message => ({
  type: actionTypes.EDIT_EXAM_FAILURE,
  payload: {
    message
  }
});
