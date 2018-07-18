import * as actionTypes from '../constants/actionTypes';

export const fetchRecruitmentProfileRequest = id => ({
  type: actionTypes.RECRUITMENT_PROFILE_FETCH_REQUEST,
  payload: {
    id
  }
});

export const fetchRecruitmentProfileSuccess = data => ({
  type: actionTypes.RECRUITMENT_PROFILE_FETCH_SUCCESS,
  payload: {
    data
  }
});

export const fetchRecruitmentProfileFailure = message => ({
  type: actionTypes.RECRUITMENT_PROFILE_FETCH_FAILURE,
  payload: {
    message
  }
});
