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
import holidaySaga from './holiday';
import reportSaga from './report';
import accessControlSaga from './accessControl';
import erpSaga from './erp';
import erpDetailSaga from './erpdetail';
import erpApproveSaga from './erpapprove';

export default function* rootSaga() {
  yield all([
    accessControlSaga(),
    masterTableSaga(),
    profileSaga(),
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
    holidaySaga(),
    reportSaga(),
    erpSaga(),
    erpDetailSaga(),
    erpApproveSaga(),
    authSaga(),
  ]);
}
