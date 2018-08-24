import * as actionTypes from '../constants/actionTypes';

const initialState = {
  count: 0,
  name: null,
  props: [],
  img: [],
  select: { key: 'key', data: '1' },
};

const addrow = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ERPADD_ADD_ROW:
      return {
        ...state,
        count: state.count + 1,
        name: action.payload.name,
        props: [...state.props, action.payload.props],
        img: [...state.img]
      };
    case actionTypes.ERPADD_DELETE_ROW:
      return {
        ...state,
        count: state.count - 1,
        name: state.name,
        props: state.props.filter((item, index) => index !== action.payload.index),
        img: [...state.img]
      };
    case actionTypes.ERPADD_CHANGE_ITEM:
      return {
        ...state,
        count: 0,
        props: [],
        name: state.name,
        select: action.payload,
        img: [...state.img]
      };
    case actionTypes.ERPADD_FILE_UPLOAD:
      return {
        ...state,
        count: state.count,
        name: state.name,
        props: [...state.props],
        select: state.select,
        img: [...state.img, action.payload.img]
      };
    case actionTypes.ERPADD_DELETE_UPLOAD:
      return {
        ...state,
        count: state.count,
        name: state.name,
        props: [...state.props],
        select: state.select,
        // img: [...state.img.slice(0, state.img.length - 1)]
        img: state.img.filter((item, index) => index !== action.payload.index),
      };

    default:
      return state;
  }
};

export default addrow;
