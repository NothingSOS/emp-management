import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: [],
  activePage: 1,
  searchText: '',
};

const erp = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ERP_CREATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.ERP_CREATE_SUCCESS:
      return {
        ...state,
        lists: action.payload.erp
      };
    case actionTypes.ERP_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };

    case actionTypes.ERP_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.ERP_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.erp,
        activePage: state.activePage
      };

    case actionTypes.ERP_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };

    case actionTypes.ERP_DELETE_REQUEST:
      return {
        ...state,
        id: action.payload.id
      };
    case actionTypes.ERP_DELETE_SUCCESS:
      return {
        ...state,
        lists: action.payload.erp
      };

    case actionTypes.ERP_DELETE_FAILURE:
      return {
        ...state,
        list: [...state.lists]
      };

    case actionTypes.ERP_ADD_REQUEST:
      return {
        ...state,
        isFetching: true,
        test: []
      };
    case actionTypes.ERP_ADD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.erp,
        test: []
      };
    case actionTypes.ERP_ADD_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.ERP_CHANGE_PAGINATION:
      return {
        ...state,
        list: [...state.lists],
        activePage: action.payload.activePage
      };
    case actionTypes.FILTER_ERP:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    // case actionTypes.ERP_DELETE_REQUEST:
    //   return {
    //     ...state,
    //     id: action.payload.id
    //   };
    // case actionTypes.ERP_DELETE_SUCCESS:
    //   return {
    //     ...state,
    //     lists: action.payload.erp
    //   };

    // case actionTypes.ERP_DELETE_FAILURE:
    //   return {
    //     ...state,
    //     list: [...state.lists]
    //   };
    // case actionTypes.ERP_DELETE_REQUEST:
    //   return {
    //     ...state,
    //     id: action.payload.id
    //   };
    // case actionTypes.ERP_DELETE_SUCCESS:
    //   return {
    //     ...state,
    //     lists: action.payload.erp
    //   };

    // case actionTypes.ERP_DELETE_FAILURE:
    //   return {
    //     ...state,
    //     list: [...state.lists]
    //   };

    default:
      return {
        ...state
      };
  }
};

export default erp;
