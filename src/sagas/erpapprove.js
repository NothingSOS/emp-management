import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { closeModal } from '../actions/modal';
import {
  fetchErpApproveSuccess,
  fetchErpApproveFailure,
  // approveErpRequest
} from '../actions/erpapprove';
import api from '../services/api';

export function* fetchErpApproveTask() {
  try {
    const approve = yield call(api.fetchApprove);
    yield put(fetchErpApproveSuccess(approve));
  }
  catch (error) {
    yield put(fetchErpApproveFailure(error));
  }
}

export function* approveMethodTask(action) {
  try {
    const approvesuccess = yield call(api.approveUpdate, {
      id: action.payload.approveId,
      comment: action.payload.comment,
      type: action.payload.type,
      approvement: 1
    });
    yield put(fetchErpApproveSuccess(approvesuccess));
    yield put(closeModal());
  }
  catch (error) {
    console.log(error);
  }
}

export function* rejectMethodTask(action) {
  try {
    const approvefail = yield call(api.approveUpdate, {
      id: action.payload.approveId.id,
      comment: action.payload.approveId.comment,
      type: action.payload.approveId.type,
      approvement: 2
    });
    yield put(fetchErpApproveSuccess(approvefail));
    yield put(closeModal());
  }
  catch (error) {
    console.log(error);
  }
}

export function* watchFetchErpApproveRequest() {
  yield takeEvery(actionTypes.ERPAPPROVE_FETCH_REQUEST, fetchErpApproveTask);
}

export function* watchApproveErpRequest() {
  yield takeEvery(actionTypes.ERPAPPROVE_APPROVE_REQUEST, approveMethodTask);
}

export function* watchRejectErpRequest() {
  yield takeEvery(actionTypes.ERPAPPROVE_REJECT_REQUEST, rejectMethodTask);
}
// export function* watchCreateErpDetailRequest() {
//   yield takeEvery(actionTypes.ERPDETAIL_CREATE_REQUEST, createErpDetailTask);
// }

export default function* erpApproveSaga() {
  yield all([
    watchFetchErpApproveRequest(),
    watchApproveErpRequest(),
    watchRejectErpRequest(),
    // watchCreateErpDetailRequest()
  ]);
}
