import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: [],
  type: 1,
  idbill: -1,
  imgupdate: []
};

const erpdetail = (state = initialState, action) => {
  // console.log(action.payload.index);
  switch (action.type) {
    // console.log()
    case actionTypes.ERPDETAIL_CREATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.ERPDETAIL_CREATE_SUCCESS:
      return {
        ...state,
        lists: action.payload.erpdetail
      };
    case actionTypes.ERPDETAIL_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };

    case actionTypes.ERPDETAIL_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.ERPDETAIL_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        idbill: action.payload.erpdetail[0][0].billRecordId,
        type: action.payload.erpdetail[0][0].typeId,
        lists: action.payload.erpdetail[0],
        img: action.payload.erpdetail[1],
        imgupdate: state.imgupdate
      };
    case actionTypes.ERPDETAIL_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.ERPDETAIL_DELETE_ROW:
      return {
        ...state,
        isFetching: false,
        type: state.type,
        idbill: state.idbill,
        lists: state.lists.filter((item, index) => index !== action.payload.index),
        img: [...state.img],
        imgupdate: state.imgupdate
      };
    case actionTypes.ERPDETAIL_ADD_ROW:
      return {
        ...state,
        isFetching: false,
        type: state.type,
        idbill: state.idbill,
        lists: [...state.lists, action.payload.props],
        img: [...state.img],
        imgupdate: state.imgupdate
      };
    case actionTypes.ERPDETAIL_DELETE_IMAGE:
      return {
        ...state,
        isFetching: false,
        type: state.type,
        idbill: state.idbill,
        lists: [...state.lists],
        img: state.img.filter((item, index) => index !== action.payload.index),
        imgupdate: state.imgupdate
      };
    case actionTypes.ERPDETAIL_UPDATE_DELETE_IMAGE:
      return {
        ...state,
        isFetching: false,
        type: state.type,
        idbill: state.idbill,
        lists: [...state.lists],
        img: state.img,
        imgupdate: state.imgupdate.filter((item, index) => index !== action.payload.index)
      };
    case actionTypes.ERPDETAIL_ADD_IMAGE:
      return {
        ...state,
        isFetching: false,
        type: state.type,
        idbill: state.idbill,
        lists: state.lists,
        img: state.img,
        imgupdate: [...state.imgupdate, action.payload.img]
      };
    default:
      return {
        ...state
      };
  }
};

export default erpdetail;
