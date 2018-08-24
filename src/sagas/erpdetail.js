import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  createErpDetailSuccess,
  createErpDetailFailure,
  fetchErpDetailFailure,
  fetchErpDetailSuccess
} from '../actions/erpdetail';
import api from '../services/api';

export function* createErpDetailTask(action) {
  try {
    yield call(api.createErpDetail, {
      user: [
        { idbill: action.payload.form.idbill },
        { type: action.payload.form.type },
        {
          fieldlist: [...action.payload.form.lists]
        }
      ]
    });
    yield call(api.updateUploadImage, {
      img: action.payload.form.img,
      idrecord: action.payload.form.idbill
    });
    const formData = new FormData();
    const imgarray = action.payload.form.imgupdate;
    // console.log(imgarray[0].files[0].files[0]);
    for (let i = 0; i < imgarray.length; i += 1) {
      formData.append('addrow', imgarray[i].files[0]);
    }
    formData.append('idrecord', action.payload.form.idbill);
    yield call(api.uploadErp, formData);
    yield put(createErpDetailSuccess());
    window.location.reload();
    // action.payload.resolve();
  }
  catch (error) {
    yield put(createErpDetailFailure(error));
    // action.payload.reject();
  }
}

export function* fetchErpDetailTask(action) {
  try {
    const erpdetail = yield call(api.fetchErpDetail, action.payload);
    yield put(fetchErpDetailSuccess(erpdetail));
  }
  catch (error) {
    yield put(fetchErpDetailFailure(error));
  }
}

export function* watchFetchErpDetailRequest() {
  yield takeEvery(actionTypes.ERPDETAIL_FETCH_REQUEST, fetchErpDetailTask);
}

export function* watchCreateErpDetailRequest() {
  yield takeEvery(actionTypes.ERPDETAIL_CREATE_REQUEST, createErpDetailTask);
}

export default function* erpdetailSaga() {
  yield all([
    watchFetchErpDetailRequest(),
    watchCreateErpDetailRequest()
  ]);
}
