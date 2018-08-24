import * as actionTypes from '../constants/actionTypes';

export const createErpRequest = form => ({
  type: actionTypes.ERP_CREATE_REQUEST,
  payload: {
    form
  }
});

export const createErpSuccess = form => ({
  type: actionTypes.ERP_CREATE_SUCCESS,
  payload: {
    form
  }
});

export const createErpFailure = message => ({
  type: actionTypes.ERP_CREATE_FAILURE,
  payload: {
    message
  }
});
export const addErpRequest = (form, resolve, reject) => ({
  type: actionTypes.ERP_ADD_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const addErpSuccess = erp => ({
  type: actionTypes.ERP_ADD_SUCCESS,
  payload: {
    erp
  }
});

export const addErpFailure = message => ({
  type: actionTypes.ERP_ADD_FAILURE,
  payload: {
    message
  }
});

export const fetchErpRequest = () => ({
  type: actionTypes.ERP_FETCH_REQUEST,
});

export const fetchErpSuccess = erp => ({
  type: actionTypes.ERP_FETCH_SUCCESS,
  payload: {
    erp
  }
});

export const fetchErpFailure = message => ({
  type: actionTypes.ERP_FETCH_FAILURE,
  payload: {
    message
  }
});

export const deleteErpRequest = id => ({
  type: actionTypes.ERP_DELETE_REQUEST,
  payload: {
    id
  }
});

export const deleteErpSuccess = erp => ({
  type: actionTypes.ERP_DELETE_SUCCESS,
  payload: {
    erp
  }
});

export const deleteErpFailure = message => ({
  type: actionTypes.ERP_DELETE_FAILURE,
  payload: {
    message
  }
});

export const changePagination = activePage => ({
  type: actionTypes.ERP_CHANGE_PAGINATION,
  payload: {
    activePage
  }
});

export const filterErp = text => ({
  type: actionTypes.FILTER_ERP,
  payload: {
    searchText: text
  }
});

export const approveErpRequest = id => ({
  type: actionTypes.ERP_DELETE_REQUEST,
  payload: {
    id
  }
});

export const approveErpSuccess = erp => ({
  type: actionTypes.ERP_DELETE_SUCCESS,
  payload: {
    erp
  }
});

export const approveErpFailure = message => ({
  type: actionTypes.ERP_DELETE_FAILURE,
  payload: {
    message
  }
});

export const disapproveErpRequest = id => ({
  type: actionTypes.ERP_DELETE_REQUEST,
  payload: {
    id
  }
});

export const disapproveErpSuccess = erp => ({
  type: actionTypes.ERP_DELETE_SUCCESS,
  payload: {
    erp
  }
});

export const disapproveErpFailure = message => ({
  type: actionTypes.ERP_DELETE_FAILURE,
  payload: {
    message
  }
});

export const generateExcel = (id, name, createDate) => ({
  type: actionTypes.ERP_GENERATE_EXCEL,
  payload: {
    id,
    name,
    createDate
  }
});
