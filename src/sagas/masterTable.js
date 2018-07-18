import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchMasterTableSucesss, fetchMasterTableFailure } from '../actions/masterTable';
import api from '../services/api';

export function* fetchMasterTableTask() {
  try {
    const masterTable = {};
    masterTable.departments = yield call(api.fetchDepartments);
    masterTable.positions = yield call(api.fetchPositions);
    masterTable.levels = yield call(api.fetchLevels);
    masterTable.contracts = yield call(api.fetchContracts);
    masterTable.universities = yield call(api.fetchUniversities);
    masterTable.degrees = yield call(api.fetchDegrees);
    masterTable.faculties = yield call(api.fetchFaculties);
    masterTable.majors = yield call(api.fetchMajors);
    masterTable.certificates = yield call(api.fetchCertificates);
    masterTable.assets = yield call(api.fetchAssets);
    masterTable.assetTypes = yield call(api.fetchAssetTypes);
    masterTable.accessTypes = yield call(api.fetchAcessTypes);
    yield put(fetchMasterTableSucesss(masterTable));
  }
  catch (error) {
    yield put(fetchMasterTableFailure(error));
  }
}

export function* watchFetchMasterTableRequest() {
  yield takeEvery(actionTypes.MASTER_TABLE_FETCH_REQUEST, fetchMasterTableTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchMasterTableRequest()
  ]);
}
