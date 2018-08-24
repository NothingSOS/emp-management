import * as actionTypes from '../constants/actionTypes';

export const fetchErpApproveRequest = form => ({
  type: actionTypes.ERPAPPROVE_FETCH_REQUEST,
  payload: {
    form
  }
});

export const fetchErpApproveSuccess = erpapprove => ({
  type: actionTypes.ERPAPPROVE_FETCH_SUCCESS,
  payload: {
    erpapprove
  }
});

export const fetchErpApproveFailure = messege => ({
  type: actionTypes.ERPAPPROVE_FETCH_FAILURE,
  payload: {
    messege
  }
});

export const approveErpRequest = (approveId, comment, type) => ({
  type: actionTypes.ERPAPPROVE_APPROVE_REQUEST,
  payload: {
    approveId,
    comment,
    type
  }
});

// export const approveErpSuccess = ()

export const rejectErpRequest = (approveId, comment, type) => ({
  type: actionTypes.ERPAPPROVE_REJECT_REQUEST,
  payload: {
    approveId,
    comment,
    type
  }
});

export const commentChange = comment => ({
  type: actionTypes.ERPAPPROVE_COMMENT_CHANGE,
  payload: {
    comment
  }
});

export const deleteComment = () => ({
  type: actionTypes.ERPAPPROVE_COMMENT_DELETE
});

export const modalApproveOpen = () => ({
  type: actionTypes.ERPAPPROVE_MODAL_OPEN
});

export const modalApproveClose = () => ({
  type: actionTypes.ERPAPPROVE_MODAL_CLOSE
});

export const changePagination = activePage => ({
  type: actionTypes.ERPAPPROVE_CHANGE_PAGINATION,
  payload: {
    activePage
  }
});
