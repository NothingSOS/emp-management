import { call } from '../../node_modules/redux-saga/effects';

let token;

const callApi = (endpoint, request) => {
  let isFormData;

  if (request && request.body) {
    if (request.body instanceof FormData) isFormData = true;
    request.body = isFormData ? request.body : JSON.stringify(request.body);
  }

  token = localStorage.getItem('accessToken');

  let headers;
  if (isFormData) {
    headers = {
      Authorization: `Bearer ${token}`
    };
  }
  else {
    headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  const requestWithHeaders = {
    ...{ headers },
    ...request
  };

  return fetch(endpoint, requestWithHeaders)
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        return Promise.reject(body);
      }
      return Promise.resolve(body);
    });
};

const download = (endpoint, request) => {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  token = localStorage.getItem('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const requestWithHeaders = {
    ...{ headers },
    ...request
  };

  return fetch(endpoint, requestWithHeaders)
    .then(response => response.blob().then(blob => ({ response, blob })))
    .then(({ response, blob }) => {
      if (!response.ok) {
        return Promise.reject();
      }
      return Promise.resolve(blob);
    });
};

const api = {};

// Auth

api.login = form => (
  callApi('/auth/login', {
    method: 'POST',
    body: form
  })
);

api.refreshToken = body => (
  callApi('/auth/token', {
    method: 'POST',
    body
  })
);

api.signup = form => (
  callApi('/auth/signup', {
    method: 'POST',
    body: form
  })
);

api.hello = () => (
  callApi('/api/hello')
);

// Master table

api.fetchMasterTable = () => (
  callApi('/api/master-table')
);

api.fetchDepartments = () => (
  callApi('/api/departments')
);

api.fetchPositions = () => (
  callApi('/api/positions')
);

api.fetchLevels = () => (
  callApi('/api/levels')
);

api.fetchContracts = () => (
  callApi('/api/contracts')
);

api.fetchUniversities = () => (
  callApi('/api/universities')
);

api.fetchDegrees = () => (
  callApi('/api/degrees')
);

api.fetchFaculties = () => (
  callApi('/api/faculties')
);

api.fetchMajors = () => (
  callApi('/api/majors')
);

api.fetchCertificates = () => (
  callApi('/api/certificates')
);

api.fetchAssets = () => (
  callApi('/api/assets')
);

api.fetchAssetTypes = () => (
  callApi('/api/asset-types')
);

api.fetchAcessTypes = () => (
  callApi('/api/access-control')
);

// Asset Type

api.addAssetType = body => (
  callApi('/api/asset-types', {
    method: 'POST',
    body
  })
);

api.deleteAssetType = body => (
  callApi('/api/asset-types', {
    method: 'DELETE',
    body
  })
);

// Asset

api.addAsset = body => (
  callApi('/api/assets', {
    method: 'POST',
    body
  })
);

api.deleteAsset = body => (
  callApi('/api/assets', {
    method: 'DELETE',
    body
  })
);

// Certificate

api.addCertificate = body => (
  callApi('/api/certificates', {
    method: 'POST',
    body
  })
);

api.deleteCertificate = body => (
  callApi('/api/certificates', {
    method: 'DELETE',
    body
  })
);

// Contract

api.addContract = body => (
  callApi('/api/contracts', {
    method: 'POST',
    body
  })
);

api.deleteContract = body => (
  callApi('/api/contracts', {
    method: 'DELETE',
    body
  })
);

// Degree
api.addDegree = body => (
  callApi('/api/degrees', {
    method: 'POST',
    body
  })
);

// Department
api.addDepartment = body => (
  callApi('/api/departments', {
    method: 'POST',
    body
  })
);

// Faculty
api.addFaculty = body => (
  callApi('/api/faculties', {
    method: 'POST',
    body
  })
);

// Level

api.addLevel = body => (
  callApi('/api/levels', {
    method: 'POST',
    body
  })
);

// Major

api.addMajor = body => (
  callApi('/api/majors', {
    method: 'POST',
    body
  })
);

// Position

api.addPosition = body => (
  callApi('/api/positions', {
    method: 'POST',
    body
  })
);

// University

api.addUniversity = body => (
  callApi('/api/universities', {
    method: 'POST',
    body
  })
);

// Profile

api.fetchGeneralProfile = userId => (
  callApi(`/api/employee-info?userId=${userId}`)
);

api.fetchWorkProfile = userId => (
  callApi(`/api/employee-work?userId=${userId}`)
);

api.fetchEducationProfile = userId => (
  callApi(`/api/educates?userId=${userId}`)
);

api.fetchCertificateProfile = userId => (
  callApi(`/api/has-certificates?userId=${userId}`)
);

api.fetchToeicProfile = userId => (
  callApi(`/api/toeic?userId=${userId}`)
);

api.fetchAssetProfile = userId => (
  callApi(`/api/has-assets?userId=${userId}`)
);

api.fetchWorkExperience = userId => (
  callApi(`/api/work-experience?userId=${userId}`)
);

api.updateGeneralProfile = body => (
  callApi('/api/employee-info', {
    method: 'PUT',
    body
  })
);

api.updateWorkProfile = body => (
  callApi('/api/employee-work', {
    method: 'PUT',
    body
  })
);

api.updateEducationProfile = body => (
  callApi('/api/educates', {
    method: 'PUT',
    body
  })
);

api.updateCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'PUT',
    body
  })
);

api.updateAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'PUT',
    body
  })
);

api.createWorkExperienceProfile = body => (
  callApi('/api/work-experience', {
    method: 'POST',
    body
  })
);

api.createEducationProfile = body => (
  callApi('/api/educates', {
    method: 'POST',
    body
  })
);

api.createCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'POST',
    body
  })
);

api.createToeicProfile = body => (
  callApi('/api/toeic', {
    method: 'POST',
    body
  })
);

api.createAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'POST',
    body
  })
);

api.updateProfilePicture = body => (
  callApi('/api/employee-info/upload-profile-img', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body
  })
);

api.deleteEducationProfile = body => (
  callApi('/api/educates', {
    method: 'DELETE',
    body
  })
);

api.deleteCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'DELETE',
    body
  })
);

api.deleteToeicProfile = body => (
  callApi('/api/toeic', {
    method: 'DELETE',
    body
  })
);

api.deleteAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'DELETE',
    body
  })
);

api.deleteWorkExperienceProfile = body => (
  callApi('/api/work-experience', {
    method: 'DELETE',
    body
  })
);

// Employee

api.createEmployee = body => (
  callApi('/api/users', {
    method: 'POST',
    body
  })
);

api.fetchEmployee = () => (
  callApi('/api/users')
);

// Project

api.fetchProject = userId => (
  callApi(`/api/projects?userId=${userId}`)
);

api.createProject = body => (
  callApi('/api/projects', {
    method: 'POST',
    body
  })
);

// Project detail

api.fetchProjectDetail = id => (
  callApi(`/api/projects?id=${id}`)
);

api.updateProjectDetail = body => (
  callApi('/api/projects', {
    method: 'PUT',
    body
  })
);

api.createMember = body => (
  callApi(`/api/has-projects`, {
    method: 'POST',
    body
  })
);

api.deleteMember = body => (
  callApi(`/api/has-projects`, {
    method: 'DELETE',
    body
  })
);

api.downloadFile = fileId => (
  download(`/api/files/download?fileId=${fileId}`)
);

api.uploadFile = body => (
  callApi(`/api/files`, {
    method: 'POST',
    body
  })
);

api.deleteFile = body => (
  callApi(`/api/files`, {
    method: 'DELETE',
    body
  })
);

// Leave

api.createLeave = body => (
  callApi('/api/leave-request', {
    method: 'POST',
    body
  })
);

api.fetchLeave = (userId, year, month) => (
  callApi(`/api/leave-request?userId=${userId}&year=${year}&month=${month}`)
);

api.fetchLeaveAll = () => (
  callApi('/api/leave-request')
);

api.updateLeave = body => (
  callApi('/api/leave-request', {
    method: 'PUT',
    body
  })
);
api.fetchLeaveHistory = (userId, year) => (
  callApi(`/api/leave-history?userId=${userId}&year=${year}`)
);

// Timesheet

api.createTimesheet = body => (
  callApi('/api/timesheets', {
    method: 'POST',
    body
  })
);

api.fetchTimesheet = (userId, year, month) => (
  callApi(`/api/timesheets/?userId=${userId}&year=${year}&month=${month}`)
);

api.updateTimesheet = body => (
  callApi('/api/timesheets', {
    method: 'PUT',
    body
  })
);

api.deleteTimesheet = body => (
  callApi('/api/timesheets', {
    method: 'DELETE',
    body
  })
);

// Holiday
api.fetchHolidays = (year, month = null) => {
  if (month) return callApi(`/api/holidays?year=${year}&month=${month}`);
  return callApi(`/api/holidays?year=${year}`);
};
api.deleteHoliday = body => (
  callApi('/api/holidays', {
    method: 'DELETE',
    body
  })
);
api.addHoliday = body => (
  callApi('/api/holidays', {
    method: 'POST',
    body
  })
);

api.fetchTimesheetProject = userId => (
  callApi(`/api/has-projects?userId=${userId}`)
);

// Report

api.fetchOwnProject = (userId, year, month) => {
  if (userId) return callApi(`/api/projects?userId=${userId}&year=${year}&month=${month}`);
  return callApi(`/api/projects?year=${year}&month=${month}`);
};

api.downloadReport = (reportType, template, userId, projectId, year, month) => (
  download(`/api/report?reportType=${reportType}&template=${template}&userId=${userId}&projectId=${projectId}&year=${year}&month=${month}`)
);

// Access Control

api.fetchAccessControl = () => (
  callApi(`/api/access-control`)
);

api.deleteTimesheet = body => (
  callApi('/api/timesheets', {
    method: 'DELETE',
    body
  })
);

// Erp
api.createErp = body => (
  callApi('/api/billrecords-control', {
    method: 'POST',
    body
  })
);

api.fetchErp = () => (
  callApi(`/api/billrecords-control/`)
);

api.fetchErpDetail = body => (
  callApi(`/api/billrecords-editcontrol/`, {
    method: 'POST',
    body
  })
);

api.createErpDetail = body => (
  callApi(`/api/billrecords-createeditcontrol/`, {
    method: 'POST',
    body
  })
);

api.deleteErp = body => (
  callApi(`/api/billrecords-control/`, {
    method: 'DELETE',
    body
  })
);


api.uploadErp = body => (
  callApi(`/api/billrecords-imgupload/upload`, {
    headers: {
      Authorization: ('Bearer ').concat(localStorage.getItem('accessToken'))
    },
    method: 'POST',
    body
  })
);

api.updateUploadImage = body => (
  callApi(`/api/billrecords-imgupload/`, {
    method: 'POST',
    body
  })
);

api.fetchApprove = () => (
  callApi(`/api/approverecords-control/`)
);

api.getExcel = id => (
  download(`/api/billxlsx-control/?id=${id}`)
);

api.approveUpdate = body => (
  callApi(`/api/approverecords-control/`, {
    method: 'POST',
    body
  })
);

// Applicant
api.fetchApplicant = () => (
  callApi('/api/applicants')
);

api.fetchTestStatus = rowId => (
  callApi('/api/applicants/get-test-status', {
    method: 'POST',
    body: {
      rowId,
    }
  })
);

// Recruitment
api.fetchRecruitment = () => (
  callApi('/api/applicants')
);

api.fetchPositionRecruitment = () => (
  callApi('/api/positions')
);

api.changeRecruitmentStatus = body => (
  callApi('/api/applicants/update-status', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentInterviewDateTime = body => (
  callApi('/api/applicants/update-interview-datetime', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentExamDateTime = body => (
  callApi('/api/applicants/update-exam-datetime', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentSignDateTime = body => (
  callApi('/api/applicants/update-sign-datetime', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentCompleteDateTime = body => (
  callApi('/api/applicants/update-first-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentRejectDate = body => (
  callApi('/api/applicants/update-reject-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentCancelDate = body => (
  callApi('/api/applicants/update-cancel-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentBlacklistDate = body => (
  callApi('/api/applicants/update-blacklist-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentNote = body => (
  callApi('/api/applicants/update-note', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentInterviewResult = body => (
  callApi('/api/applicants/update-interview-result', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentSignedPosition = body => (
  callApi('/api/applicants/update-signed-position', {
    method: 'PUT',
    body
  })
);

api.fetchRecruitmentProfile = rowId => (
  callApi(`../api/applicants/applicant-info/?id=${rowId}`)
);

api.fetchRecruitmentFile = rowId => (
  callApi(`../api/applicants/applicant-file/?id=${rowId}`)
);

api.fetchViewResult = rowId => (
  callApi(`/api/applicants/fetchViewResult/?id=${rowId}`)
);

api.fetchGradedExam = rowId => (
  callApi(`/api/applicants/fetchGradedExam/?rowId=${rowId}`)
);

api.fetchWeight = categoryList => (
  callApi(`/api/applicants/fetchWeight`, {
    method: 'POST',
    body: {
      categoryList,
    }
  })
);
// Recruitment : Basic API

api.getExamDate = citizenId => (
  callApi(`/api/applicants/getExamDate/?citizenId=${citizenId}`)
);

api.getRecruitmentRowId = (id, testDate) => (
  callApi(`/api/applicants/getRowId`, {
    method: 'POST',
    body: {
      id,
      testDate,
    }
  })
);

// Recruitment : Grading

api.fetchGradingExam = rowId => (
  callApi(`/api/applicants/fetchGradingExam/?rowId=${rowId}`)
);

api.uploadRandomExIdList = (rowId, randomExIdList) => (
  callApi(`/api/applicants/uploadRandomExIdList/`, {
    method: 'POST',
    body: {
      rowId,
      randomExIdList,
    }
  })
);


api.uploadGradeProgress = gradingList => (
  callApi(`/api/applicants/uploadGradeProgress`, {
    method: 'POST',
    body: {
      gradingList,
    }
  })
);

// Recruitment

api.getExamUser = body => (
  callApi('/api/applicants/get-exam-user', {
    method: 'POST',
    body
  })
);

api.activateExamUser = body => (
  callApi('/api/applicants/activate-exam-user', {
    method: 'POST',
    body
  })
);

api.updateRecruitmentTestStatus = body => (
  callApi('/api/applicants/update-test-status', {
    method: 'POST',
    body
  })
);

api.changeInterviewStatus = body => (
  callApi('/api/applicants/change-test-status', {
    method: 'PUT',
    body
  })
);

api.fetchEPRList = id => (
  callApi(`/api/applicants/fetchEPRList/?id=${id}`)
);

api.fetchExamId = () => (
  callApi(`/api/applicants/fetchExamId`)
);

// this is a same method as changeStatus
// but this stand for recruitment page
// cause recruitment and take-exam pages use dif. token
api.changeTestStatus = (rowId, status) => (
  callApi(`/api/applicants/changeTestStatus/`, {
    method: 'POST',
    body: {
      rowId,
      status,
    }
  })
);

api.checkApproveStatus = rowId => (
  callApi(`/api/applicants/checkApproveStatus/?rowId=${rowId}`)
);

// Exam

api.uploadImageExam = body => (
  callApi('/api/exam/upload-image-exam', {
    headers: {
      Authorization: ('Bearer ').concat(localStorage.getItem('token'))
    },
    method: 'POST',
    body
  })
);

api.addExam = body => (
  callApi('/api/exam', {
    method: 'POST',
    body
  })
);

api.fetchExam = () => (
  callApi('/api/exam')
);

api.deleteExam = body => (
  callApi('/api/exam', {
    method: 'DELETE',
    body
  })
);

api.editExam = body => (
  callApi('/api/exam', {
    method: 'PUT',
    body
  })
);

// Exam Auth

api.signup = form => (
  callApi(`/examauth/signup`, {
    method: 'POST',
    body: form
  })
);

api.examLogin = form => (
  callApi(`/examauth/login`, {
    method: 'POST',
    body: form
  })
);

// Take Exam Agreement
// 456
api.startExam = body => (
  callApi('/api/takeexamagreement/acceptagreement', {
    method: 'PUT',
    body
  })
);

// Take Exam

api.sendMailFinishExam = (id, currentTime, needCheck) => (
  callApi('/api/takeExam/sendMail', {
    method: 'POST',
    body: {
      id,
      currentTime,
      needCheck,
    }
  })
);

api.fetchRandomExIdList = rowId => (
  callApi(`/api/takeExam/fetchRandomExIdList/`, {
    method: 'POST',
    body: {
      rowId,
    }
  })
);

api.fetchExamSpecifyId = idList => (
  callApi(`/api/takeExam/fetchExamSpecifyId/`, {
    method: 'POST',
    body: {
      idList,
    },
  })
);

api.checkProgress = (rowId, id, testDate, startTime, answerList) => (
  callApi(`/api/takeExam/checkProgress/`, {
    method: 'POST',
    body: {
      rowId,
      id,
      testDate,
      startTime,
      answerList,
    }
  })
);

api.uploadAnswer = (rowId, answerList, id, testDate) => (
  callApi(`/api/takeExam/uploadAnswer/`, {
    method: 'POST',
    body: {
      rowId,
      answerList,
      id,
      testDate,
    }
  })
);

api.updateSubmittedTime = (rowId, time) => (
  callApi(`/api/takeExam/updateSubmittedTime`, {
    method: 'POST',
    body: {
      rowId,
      time,
    }
  })
);

api.deActivate = (rowId, status) => (
  callApi(`/api/takeExam/deActivate`, {
    method: 'POST',
    body: {
      rowId,
      status,
    }
  })
);

api.grading = rowId => (
  callApi(`/api/takeExam/grading`, {
    method: 'POST',
    body: {
      rowId,
    }
  })
);

api.getRowId = (id, testDate) => (
  callApi(`/api/takeExam/getRowId`, {
    method: 'POST',
    body: {
      id,
      testDate,
    }
  })
);

// Evaluate

api.checkProbation = id => (
  callApi(`/api/probation/check?id=${id}`)
);

api.checkPerformance = id => (
  callApi(`/api/performance/check?id=${id}`)
);

api.checkSelfAssessment = id => (
  callApi(`/api/selfassessment/check?id=${id}`)
);

api.fetchProbation = data => (
  callApi(`/api/probation/?id=${data[0]}&proId=${data[1]}`)
);

api.fetchPerformance = data => (
  callApi(`/api/performance/?id=${data[0]}&year=${data[1]}`)
);

api.fetchSelfAssessment = id => (
  callApi(`/api/selfassessment/?id=${id}`)
);

api.addProbation = body => (
  callApi('/api/probation', {
    method: 'POST',
    body
  })
);

api.updateProbation = body => (
  callApi('/api/probation', {
    method: 'PUT',
    body
  })
);

api.addPerformance = body => (
  callApi('/api/performance', {
    method: 'POST',
    body
  })
);

api.updatePerformance = body => (
  callApi('/api/performance', {
    method: 'PUT',
    body
  })
);

api.addSelfAssessment = body => (
  callApi('/api/selfassessment', {
    method: 'POST',
    body
  })
);

api.updateSelfAssessment = body => (
  callApi('/api/selfassessment', {
    method: 'PUT',
    body
  })
);

api.submitSelfAssessment = body => (
  callApi('/api/selfassessment/submit', {
    method: 'PUT',
    body
  })
);

export default api;
