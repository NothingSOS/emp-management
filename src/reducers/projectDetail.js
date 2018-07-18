import * as actionTypes from '../constants/actionTypes';

const projectDetail = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PROJECT_DETAIL_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        projectId: action.payload.projectId
      };
    case actionTypes.PROJECT_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload.projectDetail
      };
    case actionTypes.PROJECT_DETAIL_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default projectDetail;
