import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  data: []
};

const recruitmentProfile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECRUITMENT_PROFILE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.RECRUITMENT_PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_PROFILE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default recruitmentProfile;
