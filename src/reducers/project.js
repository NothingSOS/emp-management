import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: [],
  searchText: '',
  sortKey: null,
  direction: null
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROJECT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.PROJECT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.projects
      };
    case actionTypes.PROJECT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.PROJECT_CREATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.PROJECT_CREATE_SUCCESS:
      return {
        ...state,
        lists: action.payload.projects
      };
    case actionTypes.PROJECT_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.FILTER_PROJECT:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    case actionTypes.SORT_PROJECT:
      return {
        ...state,
        sortKey: action.payload.sortKey,
        direction: action.payload.direction
      };
    default:
      return state;
  }
};

export default project;
