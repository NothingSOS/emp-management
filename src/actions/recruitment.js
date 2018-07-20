import * as actionTypes from '../constants/actionTypes';
import { userInfo } from 'os';

export const fetchRecruitmentRequest = () => ({
  type: actionTypes.RECRUITMENT_FETCH_REQUEST
});

export const fetchRecruitmentSuccess = data => ({
  type: actionTypes.RECRUITMENT_FETCH_SUCCESS,
  payload: {
    data
  }
});

export const fetchRecruitmentFailure = message => ({
  type: actionTypes.RECRUITMENT_FETCH_FAILURE,
  payload: {
    message
  }
});

export const fetchPositionRecruitmentRequest = () => ({
  type: actionTypes.RECRUITMENT_FETCH_POSITION_REQUEST
});

export const fetchPositionRecruitmentSuccess = data => ({
  type: actionTypes.RECRUITMENT_FETCH_POSITION_SUCCESS,
  payload: {
    data
  }
});

export const fetchPositionRecruitmentFailure = message => ({
  type: actionTypes.RECRUITMENT_FETCH_POSITION_FAILURE,
  payload: {
    message
  }
});

export const changeActiveItemRequest = activeItem => ({
  type: actionTypes.RECRUITMENT_CHANGE_ACTIVE_ITEM,
  payload: {
    activeItem
  }
});

export const filterRecruitment = text => ({
  type: actionTypes.FILTER_RECRUITMENT,
  payload: {
    searchText: text
  }
});

export const sortRecruitment = (sortKey, direction) => ({
  type: actionTypes.SORT_RECRUITMENT,
  payload: {
    sortKey,
    direction
  }
});

// export const selectStatus = (key, status) => {
//   return (
//     (status === state.recruitment.checkStatus[key])
//   );
// };

export const changeStatus = (key, status) => ({
  type: actionTypes.CHANGE_RECRUITMENT_STATUS,
  payload: {
    key,
    status
  }
});

export const clearStatus = () => ({
  type: actionTypes.CLEAR_CHECKSTATUS,
  payload: {

  }
});

export const clearDateTime = () => ({
  type: actionTypes.CLEAR_DATETIME,
  payload: {

  }
});

export const clearPosition = () => ({
  type: actionTypes.CLEAR_POSITION,
  payload: {

  }
});

export const createRecruitmentRequest = form => ({
  type: actionTypes.RECRUITMENT_CREATE_REQUEST,
  payload: {
    form
  }
});

export const createRecruitmentSuccess = data => ({
  type: actionTypes.RECRUITMENT_CREATE_SUCCESS,
  payload: {
    data
  }
});

export const createRecruitmentFailure = message => ({
  type: actionTypes.RECRUITMENT_CREATE_FAILURE,
  payload: {
    message
  }
});

export const setSelectPosition = (key, value) => ({
  type: actionTypes.RECRUITMENT_SET_SELECT_POSITION,
  payload: {
    key,
    value,
  }
});

export const setDate = value => ({
  type: actionTypes.RECRUITMENT_SETDATE,
  payload: {
    value,
  }
});

export const setTime = value => ({
  type: actionTypes.RECRUITMENT_SETTIME,
  payload: {
    value,
  }
});

export const updateRecruitmentInterviewDateTimeRequest = datetime => ({
  type: actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_REQUEST,
  payload: {
    datetime
  }
});

export const updateRecruitmentInterviewDateTimeSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentInterviewDateTimeFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentExamDateTimeRequest = datetime => ({
  type: actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_REQUEST,
  payload: {
    datetime
  }
});

export const updateRecruitmentExamDateTimeSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentExamDateTimeFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentSignDateTimeRequest = datetime => ({
  type: actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_REQUEST,
  payload: {
    datetime
  }
});

export const updateRecruitmentSignDateTimeSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentSignDateTimeFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentCompleteDateTimeRequest = datetime => ({
  type: actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_REQUEST,
  payload: {
    datetime
  }
});

export const updateRecruitmentCompleteDateTimeSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentCompleteDateTimeFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentRejectDateRequest = datetime => ({
  type: actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_REQUEST,
  payload: {
    datetime
  }
});

export const updateRecruitmentRejectDateSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentRejectDateFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentCancelDateRequest = datetime => ({
  type: actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_REQUEST,
  payload: {
    datetime
  }
});

export const updateRecruitmentCancelDateSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentCancelDateFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentBlacklistDateRequest = datetime => ({
  type: actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_REQUEST,
  payload: {
    datetime
  }
});

export const updateRecruitmentBlacklistDateSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentBlacklistDateFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentNoteRequest = values => ({
  type: actionTypes.RECRUITMENT_UPDATE_NOTE_REQUEST,
  payload: {
    values,
  }
});

export const updateRecruitmentNoteSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_NOTE_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentNoteFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_NOTE_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentInterviewResultRequest = values => ({
  type: actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_REQUEST,
  payload: {
    values,
  }
});

export const updateRecruitmentInterviewResultSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentInterviewResultFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_FAILURE,
  payload: {
    message
  }
});

export const updateRecruitmentSignedPositionRequest = form => ({
  type: actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_REQUEST,
  payload: {
    form
  }
});

export const updateRecruitmentSignedPositionSuccess = data => ({
  type: actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_SUCCESS,
  payload: {
    data
  }
});

export const updateRecruitmentSignedPositionFailure = message => ({
  type: actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_FAILURE,
  payload: {
    message
  }
});

export const preActivateTakeExamRequest = person => ({
  type: actionTypes.RECRUITMENT_PRE_ACTIVATE_TAKE_EXAM_REQUEST,
  payload: {
    person
  }
});

export const setUpModal = () => ({
  type: actionTypes.RECRUITMENT_SET_UP_MODAL
});

export const setUpModalComplete = data => ({
  type: actionTypes.RECRUITMENT_SET_UP_MODAL_COMPLETE,
  payload: {
    data
  }
});

export const activateExamUserRequest = (user, timeLength, timeUnit) => ({
  type: actionTypes.RECRUITMENT_ACTIVATE_EXAM_USER_REQUEST,
  payload: {
    user,
    timeLength,
    timeUnit,
  }
});

export const activateExamUserSuccess = () => ({
  type: actionTypes.RECRUITMENT_ACTIVATE_EXAM_USER_SUCCESS,
});
