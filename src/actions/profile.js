import * as actionTypes from '../constants/actionTypes';

export const updateProbationStore = (item, type) => ({
  type: actionTypes.UPDATE_PROBATION_STORE,
  payload: {
    item,
    type
  }
});

export const fetchProfileRequest = userId => ({
  type: actionTypes.PROFILE_FETCH_REQUEST,
  payload: {
    userId
  }
});

export const fetchProfileSuccess = profile => ({
  type: actionTypes.PROFILE_FETCH_SUCCESS,
  payload: {
    profile
  }
});

export const fetchProfileFailure = message => ({
  type: actionTypes.PROFILE_FETCH_FAILURE,
  payload: {
    message
  }
});

export const updateProfileRequest = (form, resolve, reject, type) => ({
  type: actionTypes.PROFILE_UPDATE_REQUEST,
  payload: {
    form,
    resolve,
    reject,
    type
  }
});

export const updateProfileSuccess = profile => ({
  type: actionTypes.PROFILE_UPDATE_SUCCESS,
  payload: {
    profile
  }
});

export const updateProfileFailure = message => ({
  type: actionTypes.PROFILE_UPDATE_FAILURE,
  payload: {
    message
  }
});

export const deleteProfileRequest = (profileType, profileId) => ({
  type: actionTypes.PROFILE_DELETE_REQUEST,
  payload: {
    profileType,
    profileId
  }
});

export const deleteProfileSuccess = (profileType, profile) => ({
  type: actionTypes.PROFILE_DELETE_SUCCESS,
  payload: {
    profileType,
    profile
  }
});

export const deleteProfileFailure = message => ({
  type: actionTypes.PROFILE_DELETE_FAILURE,
  payload: {
    message
  }
});

export const updateProfilePictureRequest = (picture, userId) => ({
  type: actionTypes.PROFILE_PICTURE_UPDATE_REQUEST,
  payload: {
    picture,
    userId
  }
});

export const updateProfilePictureSuccess = pictureURL => ({
  type: actionTypes.PROFILE_PICTURE_UPDATE_SUCCESS,
  payload: {
    pictureURL
  }
});

export const updateProfilePictureFailure = message => ({
  type: actionTypes.PROFILE_PICTURE_UPDATE_FAILURE,
  payload: {
    message
  }
});

export const fetchProbationRequest = (id, probationId) => ({
  type: actionTypes.PROBATION_FETCH_REQUEST,
  payload: {
    id,
    probationId
  }
});

export const fetchProbationSuccess = profile => ({
  type: actionTypes.PROBATION_FETCH_SUCCESS,
  payload: {
    profile
  }
});

export const fetchProbationFailure = message => ({
  type: actionTypes.PROBATION_FETCH_FAILURE,
  payload: {
    message
  }
});

export const fetchPerformanceRequest = (id, year) => ({
  type: actionTypes.PERFORMANCE_FETCH_REQUEST,
  payload: {
    id,
    year
  }
});

export const fetchPerformanceSuccess = profile => ({
  type: actionTypes.PERFORMANCE_FETCH_SUCCESS,
  payload: {
    profile
  }
});

export const fetchPerformanceFailure = message => ({
  type: actionTypes.PERFORMANCE_FETCH_FAILURE,
  payload: {
    message
  }
});

export const fetchSelfAssessmentRequest = id => ({
  type: actionTypes.SELFASSESSMENT_FETCH_REQUEST,
  payload: {
    id
  }
});

export const fetchSelfAssessmentSuccess = profile => ({
  type: actionTypes.SELFASSESSMENT_FETCH_SUCCESS,
  payload: {
    profile
  }
});

export const fetchSelfAssessmentFailure = message => ({
  type: actionTypes.SELFASSESSMENT_FETCH_FAILURE,
  payload: {
    message
  }
});

export const clearProbationStore = () => ({
  type: actionTypes.CLEAR_PROBATION_STORE,
});
