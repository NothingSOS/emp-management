import * as actionTypes from '../constants/actionTypes';

export const createLeaveRequest = (form, resolve, reject) => ({
  type: actionTypes.LEAVE_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createLeaveSuccess = leaves => ({
  type: actionTypes.LEAVE_CREATE_SUCCESS,
  payload: {
    leaves
  }
});

export const createLeaveFailure = message => ({
  type: actionTypes.LEAVE_CREATE_FAILURE,
  payload: {
    message
  }
});

export const fetchLeaveRequest = () => ({
  type: actionTypes.LEAVE_FETCH_REQUEST
});

export const fetchLeaveSuccess = leaves => ({
  type: actionTypes.LEAVE_FETCH_SUCCESS,
  payload: {
    leaves
  }
});

export const fetchLeaveFailure = message => ({
  type: actionTypes.LEAVE_FETCH_SUCCESS,
  payload: {
    message
  }
});

export const updateLeaveRequest = (userId, leave) => ({
  type: actionTypes.LEAVE_UPDATE_REQUEST,
  payload: {
    userId,
    leave
  }
});

export const updateLeaveSuccess = leaves => ({
  type: actionTypes.LEAVE_UPDATE_SUCCESS,
  payload: {
    leaves
  }
});

export const updateLeaveFailure = message => ({
  type: actionTypes.LEAVE_UPDATE_FAILURE,
  payload: {
    message
  }
});

export const filterLeave = (key, value) => ({
  type: actionTypes.FILTER_LEAVE,
  payload: {
    key,
    value
  }
});
