import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ExamRoute from './ExamRoute';
import LoginPage from './pages/LoginPage';
import TimesheetPage from './pages/TimesheetPage';
import LeavePage from './pages/LeavePage';
import ProjectPage from './pages/ProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProfilePage from './pages/ProfilePage';
import EmployeePage from './pages/EmployeePage';
import ExamPage from './pages/ExamPage';
import RecruitmentPage from './pages/RecruitmentPage';
import RecruitmentDetailPage from './pages/RecruitmentDetailPage';
import ExamLoginPage from './pages/ExamLoginPage';
import TakeExamAgreementPage from './pages/TakeExamAgreementPage';
import TakeExamPage from './pages/TakeExamPage';
import ReportPage from './pages/ReportPage';
import AddTaskPage from './pages/AddTaskPage';
import ErpPage from './pages/ErpPage';
import ErpApprovePage from './pages/ErpApprovePage';
import ErpAddPage from './pages/ErpAddPage';
import ErpBillRecord from './forms/EditBillRecord';
import HolidayPage from './pages/HolidayPage';
import LeaveApprovalPage from './pages/LeaveApprovalPage';
import MasterTablePage from './pages/MasterTablePage';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
    <PrivateRoute exact path="/timesheet" component={TimesheetPage} />
    <PrivateRoute path="/timesheet/new" component={AddTaskPage} />
    <PrivateRoute path="/leave" component={LeavePage} />
    <PrivateRoute exact path="/project" component={ProjectPage} />
    <PrivateRoute path="/project/:id" component={ProjectDetailPage} />
    <Route path="/examlogin" component={ExamLoginPage} />
    <ExamRoute path="/takeexam_agreement" component={TakeExamAgreementPage} />
    <ExamRoute path="/takeexam" component={TakeExamPage} />
    <PrivateRoute path="/profile/:id" component={ProfilePage} />
    <PrivateRoute path="/employee" component={EmployeePage} />
    <PrivateRoute path="/report" component={ReportPage} />
    <PrivateRoute exact path="/erp" component={ErpPage} />
    <PrivateRoute path="/erp/:id" component={ErpBillRecord} />
    <PrivateRoute path="/erpApprove" component={ErpApprovePage} />
    <PrivateRoute path="/add" component={ErpAddPage} />
    <PrivateRoute path="/holiday" component={HolidayPage} />
    <PrivateRoute exact path="/recruitment" component={RecruitmentPage} can="recruitmentManage" />
    <PrivateRoute path="/recruitment/:id" component={RecruitmentDetailPage} can="recruitmentManage" />
    <PrivateRoute path="/exam" component={ExamPage} can="examManage" />
    <PrivateRoute path="/master-table" component={MasterTablePage} can="masterTableManage" />
    <PrivateRoute path="/leave-approval" component={LeaveApprovalPage} can="leaveRequestManage" />
  </Switch>
);

export default Routes;
