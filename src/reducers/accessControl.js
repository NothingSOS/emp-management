import * as actionTypes from '../constants/actionTypes';

const initialState = {
  fetched: false,
  can: {
    view: true
  }
};

const accessControl = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACCESS_CONTROL_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.ACCESS_CONTROL_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        can: {
          ...state.can,
          ...action.payload.accessControl
        },
        fetched: true
      };
    case actionTypes.ACCESS_CONTROL_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.LOGOUT:
      return {
        initialState
      };
    default:
      return state;
  }
};

export default accessControl;
