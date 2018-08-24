import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  edited: false,
  proFetching: false,
  item: { currentPage: 0 }
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_PROBATION_STORE:
      return {
        ...state,
        edited: false,
        evaInfo: null,
        perfInfo: null,
        selfInfo: null,
        item: { currentPage: 0 }
      };
    case actionTypes.UPDATE_PROBATION_STORE:
      let { edited } = state;
      if (action.payload.type === 'probation') {
        if (action.payload.item.passPro && !action.payload.item.confirmed) {
          if (action.payload.item.basedSalary || action.payload.item.mobile || action.payload.item.transporationAllowance || action.payload.item.otherAllowance)edited = true;
          else edited = false;
        }
        else if (action.payload.item.passPro === action.payload.item.notPassPro) edited = false;
        else edited = true;
      }
      else if (action.payload.type === 'performance') {
        edited = true;
      }
      else if (action.payload.type === 'selfassessment') {
        if (action.payload.item.validate) edited = true;
        else edited = false;
      }
      else if (action.payload.type === 'page') {
        if (edited !== true)edited = false;
      }
      return {
        ...state,
        item: action.payload.item,
        edited
      };
    case actionTypes.SELFASSESSMENT_FETCH_REQUEST:
      return {
        ...state,
        proFetching: true,
        id: action.payload.id
      };
    case actionTypes.SELFASSESSMENT_FETCH_SUCCESS:
      return {
        ...state,
        proFetching: false,
        ...action.payload.profile
      };
    case actionTypes.SELFASSESSMENT_FETCH_FAILURE:
      return {
        ...state,
        proFetching: false,
        message: action.payload.message
      };
    case actionTypes.PERFORMANCE_FETCH_REQUEST:
      return {
        ...state,
        proFetching: true,
        id: action.payload.id
      };
    case actionTypes.PERFORMANCE_FETCH_SUCCESS:
      return {
        ...state,
        proFetching: false,
        ...action.payload.profile
      };
    case actionTypes.PERFORMANCE_FETCH_FAILURE:
      return {
        ...state,
        proFetching: false,
        message: action.payload.message
      };
    case actionTypes.PROBATION_FETCH_REQUEST:
      return {
        ...state,
        proFetching: true,
        id: action.payload.id
      };
    case actionTypes.PROBATION_FETCH_SUCCESS:
      return {
        ...state,
        proFetching: false,
        ...action.payload.profile
      };
    case actionTypes.PROBATION_FETCH_FAILURE:
      return {
        ...state,
        proFetching: false,
        message: action.payload.message
      };
    case actionTypes.PROFILE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        userId: action.payload.userId
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
        submitting: false,
        message: action.payload.message
      };
    case actionTypes.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        submitting: true,
        confirmed: false,
        form: action.payload.form
      };
    case actionTypes.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        submitting: false,
        edited: false,
        item: { currentPage: 0 },
        confirmed: true,
        saved: true,
        ...action.payload.profile
      };
    case actionTypes.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        submitting: false,
        item: { currentPage: 0 },
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
        [action.payload.profileType]: action.payload.profile,
        isDeleting: false
      };
    case actionTypes.PROFILE_DELETE_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isDeleting: false
      };
    case actionTypes.PROFILE_PICTURE_UPDATE_REQUEST:
      return {
        ...state
      };
    case actionTypes.PROFILE_PICTURE_UPDATE_SUCCESS:
      return {
        ...state,
        general: {
          ...state.general,
          picture: action.payload.pictureURL
        }
      };
    case actionTypes.PROFILE_PICTURE_UPDATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default profile;
