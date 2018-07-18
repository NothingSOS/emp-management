import * as actionTypes from '../constants/actionTypes';

export const fetchTimesheetRequest = id => ({
  type: actionTypes.TIMESHEET_FETCH_REQUEST,
  payload: {
    id
  }
});

export const fetchTimesheetSuccess = timesheets => ({
  type: actionTypes.TIMESHHET_FETCH_SUCCESS,
  payload: {
    timesheets
  }
});

export const fetchTimesheetFailure = message => ({
  type: actionTypes.TIMESHHET_FETCH_FAILURE,
  payload: {
    message
  }
});
