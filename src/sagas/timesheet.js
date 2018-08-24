import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  createTimesheetSuccess,
  createTimesheetFailure,
  fetchTimesheetSuccess,
  fetchTimesheetFailure,
  updateTimesheetSuccess,
  updateTimesheetFailure,
  deleteTimesheetSuccess,
  deleteTimesheetFailure,
  fetchTimesheetProjectSuccess,
  fetchTimesheetProjectFailure
} from '../actions/timesheet';
import { closeModal, clearModal } from '../actions/modal';
import history from '../history';
import api from '../services/api';

function* createTimesheetTask(action) {
  try {
    const timesheets = yield call(
      api.createTimesheet,
      action.payload.isArray ? action.payload.form : { timesheets: [action.payload.form] }
    );
    yield put(createTimesheetSuccess(timesheets));
    yield put(closeModal());
    action.payload.resolve();
    if (action.payload.isArray) yield history.push('/timesheet');
  }
  catch (error) {
    yield put(createTimesheetFailure(error));
    action.payload.reject();
  }
}

function* fetchTimesheetTask(action) {
  try {
    const [timesheets, leaves, holidays] = yield all([
      call(api.fetchTimesheet, action.payload.userId, action.payload.year, action.payload.month),
      call(api.fetchLeave, action.payload.userId, action.payload.year, action.payload.month),
      call(api.fetchHolidays, action.payload.year, action.payload.month)
    ]);
    yield put(fetchTimesheetSuccess(timesheets, leaves, holidays));
  }
  catch (error) {
    yield put(fetchTimesheetFailure(error));
  }
}

function* updateTimesheetTask(action) {
  try {
    const timesheets = yield call(api.updateTimesheet, { timesheet: action.payload.form });
    yield put(closeModal());
    yield put(updateTimesheetSuccess(timesheets));
    action.payload.resolve();
  }
  catch (error) {
    yield put(updateTimesheetFailure(error));
    action.payload.reject();
  }
}

function* deleteTimesheetTask(action) {
  try {
    yield call(api.deleteTimesheet, { id: action.payload.timesheetId });
    yield put(clearModal());
    yield put(deleteTimesheetSuccess(action.payload.timesheetId));
  }
  catch (error) {
    yield put(deleteTimesheetFailure(error));
  }
}

function* fetchTimesheetProject(action) {
  try {
    const projects = yield call(api.fetchTimesheetProject, action.payload.userId);
    yield put(fetchTimesheetProjectSuccess(projects));
  }
  catch (error) {
    yield put(fetchTimesheetProjectFailure());
  }
}

function* watchCreateTimesheetRequest() {
  yield takeEvery(actionTypes.TIMESHEET_CREATE_REQUEST, createTimesheetTask);
}

function* watchFetchTimesheetRequest() {
  yield takeEvery(actionTypes.TIMESHEET_FETCH_REQUEST, fetchTimesheetTask);
}

function* watchUpdateTimesheetRequest() {
  yield takeEvery(actionTypes.TIMESHEET_UPDATE_REQUEST, updateTimesheetTask);
}

function* watchDeleteTimesheetRequest() {
  yield takeEvery(actionTypes.TIMESHEET_DELETE_REQUEST, deleteTimesheetTask);
}

function* watchFetchTimesheetProjectRequest() {
  yield takeEvery(actionTypes.TIMESHEET_PROJECT_FETCH_REQUEST, fetchTimesheetProject);
}

export default function* timesheetSaga() {
  yield all([
    watchCreateTimesheetRequest(),
    watchFetchTimesheetRequest(),
    watchUpdateTimesheetRequest(),
    watchDeleteTimesheetRequest(),
    watchFetchTimesheetProjectRequest()
  ]);
}
