import { call, put, takeEvery, all, select, take } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchMasterTableRequest,
  fetchMasterTableSucesss,
  fetchMasterTableFailure,
  createAssetTypeSuccess,
  createAssetTypeFailure,
  deleteAssetTypeSuccess,
  deleteAssetTypeFailure,
  createAssetSuccess,
  createAssetFailure,
  deleteAssetSuccess,
  deleteAssetFailure,
  createCertificateSuccess,
  createCertificateFailure,
  deleteCertificateSuccess,
  deleteCertificateFailure,
  createContractSuccess,
  createContractFailure,
  deleteContractSuccess,
  deleteContractFailure,
  createDegreeSuccess,
  createDegreeFailure,
  createDepartmentSuccess,
  createDepartmentFailure,
  createLevelSuccess,
  createLevelFailure,
  createMajorSuccess,
  createMajorFailure,
  createPositionSuccess,
  createPositionFailure,
  createUniversitySuccess,
  createUniversityFailure,
  createFacultySuccess,
  createFacultyFailure
} from '../actions/masterTable';
import { getMasterTable } from '../selectors/masterTable';
import api from '../services/api';
import { closeModal } from '../actions/modal';

function* fetchMasterTableTask() {
  try {
    const masterTable = yield call(api.fetchMasterTable);
    yield put(fetchMasterTableSucesss(masterTable));
  }
  catch (error) {
    yield put(fetchMasterTableFailure(error));
  }
}

function* addAssetTypeTask(action) {
  try {
    const assetType = yield call(api.addAssetType, { assetType: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createAssetTypeSuccess(assetType));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createAssetTypeFailure(error));
    action.payload.reject();
  }
}

function* deleteAssetTypeTask(action) {
  try {
    const assetTypes = yield call(api.deleteAssetType, { id: action.payload.id });
    yield put(deleteAssetTypeSuccess(assetTypes));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteAssetTypeFailure(error));
  }
}

function* addAssetTask(action) {
  try {
    const asset = yield call(api.addAsset, { asset: { assetTypeId: action.payload.form.assetTypeId, name: action.payload.form.name, serialNumber: action.payload.form.serialNumber, description: action.payload.form.description, ownFlag: 'Company' } });
    yield put(createAssetSuccess(asset));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createAssetFailure(error));
    action.payload.reject();
  }
}

function* deleteAssetTask(action) {
  try {
    const assets = yield call(api.deleteAsset, { id: action.payload.id });
    yield put(deleteAssetSuccess(assets));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteAssetFailure(error));
  }
}

function* addCertificateTask(action) {
  try {
    const certificate = yield call(api.addCertificate, { certificate: { name: action.payload.form.name, institute: action.payload.form.institute, description: action.payload.form.description } });
    yield put(createCertificateSuccess(certificate));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createCertificateFailure(error));
    action.payload.reject();
  }
}

function* deleteCertificateTask(action) {
  try {
    const certificates = yield call(api.deleteCertificate, { id: action.payload.id });
    yield put(deleteCertificateSuccess(certificates));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteCertificateFailure(error));
  }
}

function* addContractTask(action) {
  try {
    const contract = yield call(api.addContract, { contract: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createContractSuccess(contract));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createContractFailure(error));
    action.payload.reject();
  }
}

function* deleteContractTask(action) {
  try {
    const contracts = yield call(api.deleteContract, { id: action.payload.id });
    yield put(deleteContractSuccess(contracts));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteContractFailure(error));
  }
}

function* addDegreeTask(action) {
  try {
    const degree = yield call(api.addDegree, { degree: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createDegreeSuccess(degree));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createDegreeFailure(error));
    action.payload.reject();
  }
}

function* addDepartmentTask(action) {
  try {
    const department = yield call(api.addDepartment, { department: { name: action.payload.form.name } });
    yield put(createDepartmentSuccess(department));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createDepartmentFailure(error));
    action.payload.reject();
  }
}

function* addFacultyTask(action) {
  try {
    const faculty = yield call(api.addFaculty, { faculty: { universityId: action.payload.form.universityId, name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createFacultySuccess(faculty));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createFacultyFailure(error));
    action.payload.reject();
  }
}

function* addLevelTask(action) {
  try {
    const level = yield call(api.addLevel, { level: { name: action.payload.form.name, description: action.payload.form.description, annualLeave: action.payload.form.annualLeave } });
    yield put(createLevelSuccess(level));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createLevelFailure(error));
    action.payload.reject();
  }
}

function* addMajorTask(action) {
  try {
    const major = yield call(api.addMajor, { major: { facultyId: action.payload.form.facultyId, name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createMajorSuccess(major));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createMajorFailure(error));
    action.payload.reject();
  }
}

function* addPositionTask(action) {
  try {
    const position = yield call(api.addPosition, { position: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createPositionSuccess(position));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createPositionFailure(error));
    action.payload.reject();
  }
}

function* addUniversityTask(action) {
  try {
    const university = yield call(api.addUniversity, { university: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createUniversitySuccess(university));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createUniversityFailure(error));
    action.payload.reject();
  }
}

function* watchFetchMasterTableRequest() {
  yield takeEvery(actionTypes.MASTER_TABLE_FETCH_REQUEST, fetchMasterTableTask);
}

function* watchFetchMasterTable() {
  while (true) {
    const masterTable = yield select(getMasterTable);
    yield take(actionTypes.BOOTSTRAP);
    if (!Object.keys(masterTable).length) {
      yield put(fetchMasterTableRequest());
    }
  }
}

function* watchAddAssetTypeRequest() {
  yield takeEvery(actionTypes.ASSET_TYPE_CREATE_REQUEST, addAssetTypeTask);
}

function* watchDeleteAssetTypeRequest() {
  yield takeEvery(actionTypes.ASSET_TYPE_DELETE_REQUEST, deleteAssetTypeTask);
}

function* watchAddAssetRequest() {
  yield takeEvery(actionTypes.ASSET_CREATE_REQUEST, addAssetTask);
}

function* watchDeleteAssetRequest() {
  yield takeEvery(actionTypes.ASSET_DELETE_REQUEST, deleteAssetTask);
}

function* watchAddCertificateRequest() {
  yield takeEvery(actionTypes.CERTIFICATE_CREATE_REQUEST, addCertificateTask);
}

function* watchDeleteCertificateRequest() {
  yield takeEvery(actionTypes.CERTIFICATE_DELETE_REQUEST, deleteCertificateTask);
}

function* watchAddContractRequest() {
  yield takeEvery(actionTypes.CONTRACT_CREATE_REQUEST, addContractTask);
}

function* watchDeleteContractRequest() {
  yield takeEvery(actionTypes.CONTRACT_DELETE_REQUEST, deleteContractTask);
}

function* watchAddDegreeRequest() {
  yield takeEvery(actionTypes.DEGREE_CREATE_REQUEST, addDegreeTask);
}

function* watchAddDepartmentRequest() {
  yield takeEvery(actionTypes.DEPARTMENT_CREATE_REQUEST, addDepartmentTask);
}

function* watchAddFacultyRequest() {
  yield takeEvery(actionTypes.FACULTY_CREATE_REQUEST, addFacultyTask);
}

function* watchAddLevelRequest() {
  yield takeEvery(actionTypes.LEVEL_CREATE_REQUEST, addLevelTask);
}

function* watchAddMajorRequest() {
  yield takeEvery(actionTypes.MAJOR_CREATE_REQUEST, addMajorTask);
}

function* watchAddPositionRequest() {
  yield takeEvery(actionTypes.POSITION_CREATE_REQUEST, addPositionTask);
}

function* watchAddUniversityRequest() {
  yield takeEvery(actionTypes.UNIVERSITY_CREATE_REQUEST, addUniversityTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchMasterTableRequest(),
    watchFetchMasterTable(),
    watchAddAssetTypeRequest(),
    watchDeleteAssetTypeRequest(),
    watchAddAssetRequest(),
    watchDeleteAssetRequest(),
    watchAddCertificateRequest(),
    watchDeleteCertificateRequest(),
    watchAddContractRequest(),
    watchDeleteContractRequest(),
    watchAddDegreeRequest(),
    watchAddDepartmentRequest(),
    watchAddFacultyRequest(),
    watchAddLevelRequest(),
    watchAddMajorRequest(),
    watchAddPositionRequest(),
    watchAddUniversityRequest()
  ]);
}
