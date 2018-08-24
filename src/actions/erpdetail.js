import * as actionTypes from '../constants/actionTypes';

export const createErpDetailRequest = form => ({
  type: actionTypes.ERPDETAIL_CREATE_REQUEST,
  payload: {
    form
  }
});

export const createErpDetailSuccess = form => ({
  type: actionTypes.ERPDETAIL_CREATE_SUCCESS,
  payload: {
    form
  }
});

export const createErpDetailFailure = message => ({
  type: actionTypes.ERPDETAIL_CREATE_FAILURE,
  payload: {
    message
  }
});
export const fetchErpDetailRequest = dataid => ({
  type: actionTypes.ERPDETAIL_FETCH_REQUEST,
  payload: {
    dataid
  }
});

export const fetchErpDetailSuccess = erpdetail => ({
  type: actionTypes.ERPDETAIL_FETCH_SUCCESS,
  payload: {
    erpdetail
  }
});

export const fetchErpDetailFailure = message => ({
  type: actionTypes.ERPDETAIL_FETCH_Failure,
  payload: {
    message
  }
});

export const deleteRow = index => ({
  type: actionTypes.ERPDETAIL_DELETE_ROW,
  payload: {
    index
  }
});

export const addRow = (name, props) => ({
  type: actionTypes.ERPDETAIL_ADD_ROW,
  payload: {
    name,
    props
  }
});

export const deleteImage = index => ({
  type: actionTypes.ERPDETAIL_DELETE_IMAGE,
  payload: {
    index
  }
});

export const addImage = img => ({
  type: actionTypes.ERPDETAIL_ADD_IMAGE,
  payload: {
    img
  }
});

export const deleteImageUpdate = index => ({
  type: actionTypes.ERPDETAIL_UPDATE_DELETE_IMAGE,
  payload: {
    index
  }
});
