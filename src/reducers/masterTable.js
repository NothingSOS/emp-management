import * as actionTypes from '../constants/actionTypes';

const masterTable = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.MASTER_TABLE_FETCH_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.MASTER_TABLE_FETCH_SUCCESS:
      return {
        isFetching: false,
        ...action.payload.masterTable
      };
    case actionTypes.MASTER_TABLE_FETCH_FAILURE:
      return {
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default masterTable;
