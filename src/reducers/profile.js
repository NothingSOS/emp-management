import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        id: action.payload.id
      };
    case actionTypes.PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload.profile
      };
    case actionTypes.PROFILE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload.profile
      };
    case actionTypes.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.PROFILE_DELETE_REQUEST:
      return {
        ...state,
        profileType: action.payload.profileType,
        profileId: action.payload.profileId,
        isDeleting: true
      };
    case actionTypes.PROFILE_DELETE_SUCCESS:
      return {
        ...state,
        [`${action.payload.profileType}s`]: state[`${action.payload.profileType}s`].filter(p => p.id !== action.payload.profileId),
        isDeleting: false
      };
    case actionTypes.PROFILE_DELETE_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isDeleting: false
      };
    default:
      return state;
  }
};

export default profile;
