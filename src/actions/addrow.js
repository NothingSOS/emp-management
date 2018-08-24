import * as actionTypes from '../constants/actionTypes';

export const addRow = (name, props) => ({
  type: actionTypes.ERPADD_ADD_ROW,
  payload: {
    name,
    props
  }
});

export const deleteRow = index => ({
  type: actionTypes.ERPADD_DELETE_ROW,
  payload: {
    index
  }
});

export const changeDropdown = (key, data) => ({
  type: actionTypes.ERPADD_CHANGE_ITEM,
  payload: {
    key,
    data
  }
});

export const fileUpload = img => ({
  type: actionTypes.ERPADD_FILE_UPLOAD,
  payload: {
    img
  }
});

export const deleteUpload = index => ({
  type: actionTypes.ERPADD_DELETE_UPLOAD,
  payload: {
    index
  }
});
