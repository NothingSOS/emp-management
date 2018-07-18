import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: []
};

const exam = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_EXAM_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.ADD_EXAM_SUCCESS:
      return {
        ...state,
        lists: action.payload.exam
      };
    case actionTypes.ADD_EXAM_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.EXAM_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.EXAM_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.exams
      };
    case actionTypes.EXAM_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.DELETE_EXAM_REQUEST:
      return {
        ...state,
        id: action.payload.id
      };
    case actionTypes.DELETE_EXAM_SUCCESS:
      return {
        ...state,
        id: action.payload.id
      };
    case actionTypes.DELETE_EXAM_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.EDIT_EXAM_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.EDIT_EXAM_SUCCESS:
      return {
        ...state,
        lists: action.payload.exam
      };
    case actionTypes.EDIT_EXAM_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.FILTER_EXAMS:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
};

export default exam;
