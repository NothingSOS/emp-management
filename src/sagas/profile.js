import { call, put, takeEvery, all, select, take } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileSuccess,
  deleteProfileFailure,
  updateProfilePictureSuccess,
  updateProfilePictureFailure,
  fetchProbationSuccess,
  fetchProbationFailure,
  fetchPerformanceSuccess,
  fetchPerformanceFailure,
  fetchSelfAssessmentSuccess,
  fetchSelfAssessmentFailure
} from '../actions/profile';
import { closeModal } from '../actions/modal';
import { getAccessControl } from '../selectors/accessControl';
import api from '../services/api';

const token = jwt.decode(localStorage.accessToken);

export function* fetchSelfAssessmentTask(action) {
  try {
    const profile = {};
    profile.selfInfo = yield call(api.fetchSelfAssessment, action.payload.id);
    yield put(fetchSelfAssessmentSuccess(profile));
  }
  catch (error) {
    yield put(fetchSelfAssessmentFailure(error));
  }
}

export function* fetchPerformanceTask(action) {
  try {
    const profile = {};
    profile.perfInfo = yield call(api.fetchPerformance, [action.payload.id, action.payload.year]);
    yield put(fetchPerformanceSuccess(profile));
  }
  catch (error) {
    yield put(fetchPerformanceFailure(error));
  }
}

export function* fetchProbationTask(action) {
  try {
    const profile = {};
    profile.evaInfo = yield call(api.fetchProbation, [action.payload.id, action.payload.probationId]);
    yield put(fetchProbationSuccess(profile));
  }
  catch (error) {
    yield put(fetchProbationFailure(error));
  }
}

function* fetchProfileTask(action) {
  try {
    // Wait until access control fetching complete
    let { can } = yield select(getAccessControl);
    while (!can) {
      yield take(actionTypes.ACCESS_CONTROL_FETCH_SUCCESS);
      ({ can } = yield select(getAccessControl));
    }
    const calls = [
      call(api.fetchGeneralProfile, action.payload.userId),
      call(api.fetchWorkProfile, action.payload.userId),
      call(api.fetchCertificateProfile, action.payload.userId),
      call(api.fetchAssetProfile, action.payload.userId)
    ];
    if (can.workExperienceView) {
      yield calls.push(call(api.fetchWorkExperience, action.payload.userId));
    }
    if (can.educateView) {
      yield calls.push(call(api.fetchEducationProfile, action.payload.userId));
    }
    if (can.toeicView) {
      yield calls.push(call(api.fetchToeicProfile, action.payload.userId));
    }

    const [general, work, certificates, assets, workExperiences, educations, toeics] = yield all(calls);
    const profile = {
      general,
      work,
      certificates,
      assets,
      workExperiences,
      educations,
      toeics
    };
    console.log(token);
    if (can.evaViewAll || token.id === action.payload.userId) {
      profile.eva = yield call(api.checkProbation, action.payload.userId);
      profile.perf = yield call(api.checkPerformance, action.payload.userId);
      profile.self = yield call(api.checkSelfAssessment, action.payload.userId);
    }
    yield put(fetchProfileSuccess(profile));
  }
  catch (error) {
    yield put(fetchProfileFailure(error));
  }
}

function* updateProfileTask(action) {
  try {
    const profile = {};
    switch (action.payload.type) {
      case 'submitSelfAssessment':
        profile.self = yield call(api.submitSelfAssessment, {
          selfAssessmentInfo: action.payload.form
        });
        break;
      case 'addSelfAssessment':
        profile.self = yield call(api.addSelfAssessment, {
          selfAssessmentInfo: action.payload.form
        });
        break;
      case 'updateSelfAssessment':
        profile.self = yield call(api.updateSelfAssessment, {
          selfAssessmentInfo: action.payload.form
        });
        break;
      case 'addPerformance':
        profile.perf = yield call(api.addPerformance, {
          performanceInfo: action.payload.form
        });
        break;
      case 'updatePerformance':
        profile.perf = yield call(api.updatePerformance, {
          performanceInfo: action.payload.form
        });
        break;
      case 'updateProbation':
        profile.eva = yield call(api.updateProbation, {
          probationInfo: action.payload.form
        });
        break;
      case 'addProbation':
        profile.eva = yield call(api.addProbation, {
          probationInfo: action.payload.form
        });
        break;
      case 'editGeneralProfile':
        profile.general = yield call(api.updateGeneralProfile, {
          employeeInfo: action.payload.form
        });
        break;
      case 'editWorkProfile':
        profile.work = yield call(api.updateWorkProfile, {
          employeeWork: action.payload.form
        });
        break;
      case 'addWorkExperienceProfile':
        profile.workExperience = yield call(api.createWorkExperienceProfile, {
          workExperience: action.payload.form
        });
        break;
      case 'editEducationProfile':
        profile.educations = yield call(api.updateEducationProfile, {
          educate: action.payload.form
        });
        break;
      case 'addEducationProfile':
        profile.educations = yield call(api.createEducationProfile, {
          educate: action.payload.form
        });
        break;
      case 'addCertificateProfile':
        profile.certificates = yield call(api.createCertificateProfile, {
          hasCertificate: action.payload.form
        });
        break;
      case 'addAssetProfile':
        profile.assets = yield call(api.createAssetProfile, action.payload.form);
        break;
      case 'profilePicture':
        profile.general.picture = yield call(api.uploadProfilePicture, action.payload.form);
        break;
      case 'addToeicProfile':
        profile.toeics = yield call(api.createToeicProfile, {
          toeic: action.payload.form
        });
        break;
      default:
        action.payload.reject();
    }
    yield put(updateProfileSuccess(profile));
    if (action.payload.type !== 'updateSelfAssessment' && action.payload.type !== 'addSelfAssessment') yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(updateProfileFailure(error));
    if (error === 'Employee already accept') {
      alert(error);
      yield put(closeModal());
    }
    action.payload.reject();
  }
}

function* deleteProfileTask(action) {
  try {
    let profile;
    switch (action.payload.profileType) {
      case 'educations':
        profile = yield call(api.deleteEducationProfile, {
          id: action.payload.profileId
        });
        break;
      case 'certificates':
        profile = yield call(api.deleteCertificateProfile, {
          id: action.payload.profileId
        });
        break;
      case 'assets':
        profile = yield call(api.deleteAssetProfile, {
          id: action.payload.profileId
        });
        break;
      case 'workExperience':
        profile = yield call(api.deleteWorkExperienceProfile, {
          id: action.payload.profileId
        });
        break;
      case 'toeics':
        profile = yield call(api.deleteToeicProfile, {
          id: action.payload.profileId
        });
        break;
      default:
        yield put(deleteProfileFailure('Something gone wrong'));
    }
    yield put(deleteProfileSuccess(action.payload.profileType, profile));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteProfileFailure(error));
  }
}

function* updateProfilePictureTask(action) {
  try {
    const formData = new FormData();
    formData.append('userId', action.payload.userId);
    formData.append('profileImage', action.payload.picture);
    const { path } = yield call(api.updateProfilePicture, formData);
    yield put(updateProfilePictureSuccess(`${path}?time=${new Date()}`));
    yield put(closeModal());
  }
  catch (error) {
    yield put(updateProfilePictureFailure(error));
  }
}

function* watchFetchProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_FETCH_REQUEST, fetchProfileTask);
}

function* watchUpdateProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_UPDATE_REQUEST, updateProfileTask);
}

function* watchDeleteProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_DELETE_REQUEST, deleteProfileTask);
}

function* watchUpdateProfilePictureRequest() {
  yield takeEvery(actionTypes.PROFILE_PICTURE_UPDATE_REQUEST, updateProfilePictureTask);
}

export function* watchFetchProbationRequest() {
  yield takeEvery(actionTypes.PROBATION_FETCH_REQUEST, fetchProbationTask);
}

export function* watchFetchPerformanceRequest() {
  yield takeEvery(actionTypes.PERFORMANCE_FETCH_REQUEST, fetchPerformanceTask);
}

export function* watchFetchSelfAssessmentRequest() {
  yield takeEvery(actionTypes.SELFASSESSMENT_FETCH_REQUEST, fetchSelfAssessmentTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchProfileRequest(),
    watchUpdateProfileRequest(),
    watchDeleteProfileRequest(),
    watchUpdateProfilePictureRequest(),
    watchFetchProbationRequest(),
    watchFetchPerformanceRequest(),
    watchFetchSelfAssessmentRequest()
  ]);
}
