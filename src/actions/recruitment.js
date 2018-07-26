import * as actionTypes from '../constants/actionTypes';

export const fetchRecruitmentRequest = () => ({
  type: actionTypes.RECRUITMENT_FETCH_REQUEST
});

export const fetchRecruitmentSuccess = (data, today) => ({
  type: actionTypes.RECRUITMENT_FETCH_SUCCESS,
  payload: {
    data,
    today,
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

export const randomExam = rowId => ({
  type: actionTypes.RECRUITMENT_RANDOM_EXAM,
  payload: {
    rowId,
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

export const activateExamUserRequest = (user, timeLength, timeUnit, registerDate) => ({
  type: actionTypes.RECRUITMENT_ACTIVATE_EXAM_USER_REQUEST,
  payload: {
    user,
    timeLength,
    timeUnit,
    registerDate
  }
});

export const activateExamUserSuccess = data => ({
  type: actionTypes.RECRUITMENT_ACTIVATE_EXAM_USER_SUCCESS,
  payload: {
    data
  }
});

export const fetchGradingRequest = (rowId, modalWarningExIdList, id, isSend) => ({
  type: actionTypes.RECRUITMENT_GRADING_FETCH_REQUEST,
  payload: {
    rowId,
    modalWarningExIdList,
    id,
    isSend,
  }
}
);

export const fetchGradingSuccess = (gradingList, gradingId, examAmountPerCategory, examAmountPerSubCategory, modalWarningExIdList, rowId) => ({
  type: actionTypes.RECRUITMENT_GRADING_FETCH_SUCCESS,
  payload: {
    gradingList,
    gradingId,
    examAmountPerCategory,
    examAmountPerSubCategory,
    modalWarningExIdList,
    rowId,
  }
});

export const fetchGradingFailure = message => ({
  type: actionTypes.RECRUITMENT_GRADING_FETCH_FAILURE,
  payload: {
    message,
  }
});

export const modalPageChange = value => ({
  type: actionTypes.GRADING_MODAL_PAGINATION_CHANGE,
  payload: {
    value,
  }
});

export const modalCategoryChange = category => ({
  type: actionTypes.GRADING_MODAL_CATEGORY_CHANGE,
  payload: {
    category,
  }
});

export const viewResult = (id, testDate) => ({
  type: actionTypes.VIEW_RESULT_EVALUATE_EXAM,
  payload: {
    id,
    testDate,
  }
});

export const fetchResultFailure = message => ({
  type: actionTypes.VIEW_RESULT_FETCH_FAILURE,
  payload: {
    message,
  }
});

export const onInputModalComment = (text, exId) => ({
  type: actionTypes.GRADING_MODAL_ON_INPUT_COMMENT,
  payload: {
    text,
    exId,
  }
});

export const onScoreModalChange = (value, exId) => ({
  type: actionTypes.GRADING_MODAL_ON_SCORE_CHANGE,
  payload: {
    value,
    exId,
  }
});
export const onFullScoreModalChange = (value, exId) => ({
  type: actionTypes.GRADING_MODAL_ON_FULLSCORE_CHANGE,
  payload: {
    value,
    exId,
  }
});

export const saveGradingListRequest = (gradingList, rowId, modalWarningExIdList, id, isSend) => ({
  type: actionTypes.GRADING_MODAL_SAVE_REQUEST,
  payload: {
    gradingList,
    rowId,
    modalWarningExIdList,
    id,
    isSend,
  }
});

export const saveGradingListFailure = message => ({
  type: actionTypes.GRADING_MODAL_SAVE_FAILURE,
  payload: {
    message,
  }
});

export const saveGradingListSuccess = () => ({
  type: actionTypes.GRADING_MODAL_SAVE_SUCCESS,
  payload: {
  }
});

export const sendGradingListRequest = (gradingList, rowId, modalWarningExIdList, id) => ({
  type: actionTypes.GRADING_MODAL_SEND_REQUEST,
  payload: {
    gradingList,
    rowId,
    modalWarningExIdList,
    id,
  }
});

export const sendGradingListFailure = message => ({
  type: actionTypes.GRADING_MODAL_SEND_FAILURE,
  payload: {
    message,
  }
});

export const sendGradingListSuccess = () => ({
  type: actionTypes.GRADING_MODAL_SEND_SUCCESS,
  payload: {
  }
});

export const scoreStatusHandle = (scoreStatus, exId, gradingList, modalWarningExIdList) => ({
  type: actionTypes.GRADING_MODAL_SCORE_HANDLE,
  payload: {
    scoreStatus,
    exId,
    gradingList,
    modalWarningExIdList,
  }
});

export const scoreStatusPushBack = (gradingList, modalWarningExIdList) => ({
  type: actionTypes.GRADING_MODAL_SCORE_PUSHBACK,
  payload: {
    gradingList,
    modalWarningExIdList,
  }
});
export const fetchTestStatusResponse = testStatus => ({
  type: actionTypes.RECRUITMENT_FETCH_TEST_STATUS_RESPONSE,
  payload: {
    testStatus,
  }
});

export const fetchTestStatusRequest = rowId => ({
  type: actionTypes.RECRUITMENT_FETCH_TEST_STATUS_REQUEST,
  payload: {
    rowId,
  }
});

export const changeInterviewStatusRequest = rowId => ({
  type: actionTypes.CHANGE_INTERVIEW_STATUS_REQUEST,
  payload: {
    rowId,
  }
});

export const changeInterviewStatusResponse = data => ({
  type: actionTypes.CHANGE_INTERVIEW_STATUS_RESPONSE,
  payload: {
    data,
  }
});
