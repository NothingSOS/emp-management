import * as actionTypes from '../constants/actionTypes';

export const fetchProjectDetailRequest = projectId => ({
  type: actionTypes.PROJECT_DETAIL_FETCH_REQUEST,
  payload: {
    projectId
  }
});

export const fetchProjectDetailSuccess = projectDetail => ({
  type: actionTypes.PROJECT_DETAIL_FETCH_SUCCESS,
  payload: {
    projectDetail
  }
});

export const fetchProjectDetailFailure = message => ({
  type: actionTypes.PROJECT_DETAIL_FETCH_FAILURE,
  payload: {
    message
  }
});
