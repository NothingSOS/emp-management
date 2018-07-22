import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import todo from './todo';
import modal from './modal';
import profile from './profile';
import masterTable from './masterTable';
import employee from './employee';
import project from './project';
import projectDetail from './projectDetail';
import leave from './leave';
import timesheet from './timesheet';
import recruitment from './recruitment';
import recruitmentProfile from './recruitmentProfile';
import exam from './exam';
import examAuth from './examAuth';
import takeExamAgreement from './takeExamAgreement';
import takeExam from './takeExam';

export default combineReducers({
  form: formReducer,
  auth,
  todo,
  modal,
  profile,
  masterTable,
  employee,
  project,
  projectDetail,
  leave,
  timesheet,
  recruitment,
  recruitmentProfile,
  exam,
  examAuth,
  takeExamAgreement,
  takeExam,
});
