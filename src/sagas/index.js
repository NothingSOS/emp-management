import { all } from 'redux-saga/effects';
import authSaga from './auth';
import profileSaga from './profile';
import masterTableSaga from './masterTable';
import employeeSaga from './employee';
import projectSaga from './project';
import projectDetailSaga from './projectDetail';
import leaveSaga from './leave';
import timesheetSaga from './timesheet';
import recruitmentSaga from './recruitment';
import recruitmentProfileSaga from './recruitmentProfile';
import examSaga from './exam';
import examAuthSaga from './examAuth';
import takeExamSaga from './takeExam';
import takeExamAgreementSaga from './takeExamAgreement';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    masterTableSaga(),
    employeeSaga(),
    projectSaga(),
    projectDetailSaga(),
    leaveSaga(),
    timesheetSaga(),
    recruitmentSaga(),
    recruitmentProfileSaga(),
    examSaga(),
    examAuthSaga(),
    takeExamSaga(),
    takeExamAgreementSaga(),
  ]);
}
