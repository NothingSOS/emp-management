import { call, put, takeEvery, all } from 'redux-saga/effects';
import { saveAs } from 'file-saver';
// import { browserHistory } from 'react-router';
import * as actionTypes from '../constants/actionTypes';
import {
  createErpSuccess,
  createErpFailure,
  fetchErpFailure,
  fetchErpSuccess,
  deleteErpSuccess,
  deleteErpFailure
} from '../actions/erp';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* createErpTask(action) {
  try {
    const idrecord = yield call(api.createErp, {
      billrecord: [
        { data: action.payload.form[0][0].data },
        {
          fieldlist: [...action.payload.form[1]]
        }
      ]
    });
    const imgarray = action.payload.form[2];
    const formData = new FormData();

    for (let i = 0; i < imgarray.length; i += 1) {
      console.log('1111');
      formData.append('addrow', imgarray[i].files[0]);
    }
    formData.append('idrecord', idrecord);
    if (imgarray.length > 0) {
      yield call(api.uploadErp, formData);
    }
    yield put(createErpSuccess());
    window.location.href = '/erp';
  }
  catch (error) {
    yield put(createErpFailure(error));
  }
}

export function* fetchErpTask() {
  try {
    const erp = yield call(api.fetchErp);
    yield put(fetchErpSuccess(erp));
  }
  catch (error) {
    yield put(fetchErpFailure(error));
  }
}

export function* genExcelTask(action) {
  try {
    // console.log(action.payload);
    const excel = yield call(api.getExcel, action.payload.id);
    // console.log(excel);
    saveAs(excel, (action.payload.createDate.substring(0, 10)).concat(' ', action.payload.name));
    // yield put()
  }
  catch (error) {
    console.log(error);
  }
}

export function* deleteErpTask(action) {
  try {
    yield call(api.deleteErp, { id: action.payload.id });
    const erp = yield call(api.fetchErp);
    // console.log(erp);
    yield put(deleteErpSuccess(erp));
    yield put(closeModal());
    // action.payload.resolve();
  }
  catch (error) {
    yield put(deleteErpFailure(error));
    action.payload.reject();
  }
}

export function* watchFetchErpRequest() {
  yield takeEvery(actionTypes.ERP_FETCH_REQUEST, fetchErpTask);
}

export function* watchCreateErpRequest() {
  yield takeEvery(actionTypes.ERP_CREATE_REQUEST, createErpTask);
}

export function* watchDeleteErpRequest() {
  yield takeEvery(actionTypes.ERP_DELETE_REQUEST, deleteErpTask);
}

export function* watchGetExcel() {
  yield takeEvery(actionTypes.ERP_GENERATE_EXCEL, genExcelTask);
}

export default function* erpSaga() {
  yield all([
    watchFetchErpRequest(),
    watchCreateErpRequest(),
    watchDeleteErpRequest(),
    watchGetExcel()
  ]);
}
