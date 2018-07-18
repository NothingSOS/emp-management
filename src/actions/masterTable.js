import * as actionTypes from '../constants/actionTypes';

export const fetchMasterTableRequest = () => ({
  type: actionTypes.MASTER_TABLE_FETCH_REQUEST
});

export const fetchMasterTableSucesss = masterTable => ({
  type: actionTypes.MASTER_TABLE_FETCH_SUCCESS,
  payload: {
    masterTable
  }
});

export const fetchMasterTableFailure = message => ({
  type: actionTypes.MASTER_TABLE_FETCH_FAILURE,
  payload: {
    message
  }
});
