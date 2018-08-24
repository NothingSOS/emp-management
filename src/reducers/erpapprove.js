import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: [],
  activePage: 1,
  searchText: '',
  comment: '',
};

const erp = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ERPAPPROVE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        form: action.payload.form
      };
    case actionTypes.ERPAPPROVE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.erpapprove,
        comment: state.comment,
        activePage: state.activePage
      };
    case actionTypes.ERPAPPROVE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: true,
        msg: action.payload.messege
      };
    case actionTypes.ERPAPPROVE_APPROVE_REQUEST:
      return {
        ...state,
        modalapprove: false,
      };
    case actionTypes.ERPAPPROVE_COMMENT_CHANGE:
      return {
        ...state,
        list: state.lists,
        comment: action.payload.comment
      };
    case actionTypes.ERPAPPROVE_COMMENT_DELETE:
      return {
        ...state,
        list: state.lists,
        comment: ''
      };
    case actionTypes.ERPAPPROVE_MODAL_OPEN:
      return {
        ...state,
        modalapprove: true,
      };
    case actionTypes.ERPAPPROVE_MODAL_CLOSE:
      return {
        ...state,
        modalapprove: false,
      };
    case actionTypes.ERPAPPROVE_CHANGE_PAGINATION:
      return {
        ...state,
        list: [...state.lists],
        activePage: action.payload.activePage
      };
    default:
      return {
        ...state
      };
  }
};

export default erp;
