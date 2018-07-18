import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  lists: [],
  filter: ''
};

const employee = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_FETCH_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.EMPLOYEE_FETCH_SUCCESS:
      return {
        isFetching: false,
        lists: action.payload.employees
      };
    case actionTypes.EMPLOYEE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.FILTER_EMPLOYEE:
      return {
        ...state,
        filter: action.payload.text
      };
    default:
      return state;
  }
};

export default employee;
