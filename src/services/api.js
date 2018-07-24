const callApi = (endpoint, request) => {
  if (request && request.body) {
    request.body = request.body instanceof FormData ? request.body : JSON.stringify(request.body);
  }

  const token = localStorage.getItem('token');
  const examToken = localStorage.getItem('examToken');

  const headers = {
    Authorization: (endpoint.includes('takeExam') || endpoint.includes('takeexamagreement')) ? `Bearer ${examToken}` : `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

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

const api = {};

// Auth

api.login = form => (
  callApi('/auth/login', {
    method: 'POST',
    body: form
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
  callApi('api/access-control')
);

// Profile

api.fetchGeneralProfile = id => (
  callApi(`/api/employee-info?id=${id}`)
);

api.fetchWorkProfile = id => (
  callApi(`/api/employee-work?id=${id}`)
);

api.fetchEducationProfile = id => (
  callApi(`/api/educates?id=${id}`)
);

api.fetchCertificateProfile = id => (
  callApi(`/api/has-certificates?id=${id}`)
);

api.fetchAssetProfile = id => (
  callApi(`/api/has-assets?id=${id}`)
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

api.createAssetProfile = body => (
  callApi('/api/has-assets', {
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

api.deleteAssetProfile = body => (
  callApi('/api/has-assets', {
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

api.fetchProject = () => (
  callApi('/api/projects')
);

api.createProject = body => (
  callApi('/api/projects', {
    method: 'POST',
    body
  })
);

// Project detail

api.fetchProjectDetail = id => (
  callApi(`/api/projects/${id}`)
);

api.createMember = body => (
  callApi(`/api/has-project`, {
    method: 'POST',
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

api.fetchLeave = () => (
  callApi('/api/leave-request')
);

api.updateLeave = body => (
  callApi('/api/leave-request', {
    method: 'PUT',
    body
  })
);

// Timesheet

api.fetchTimesheet = id => (
  callApi(`/api/timesheets/?id=${id}`)
);

// Applicant
api.fetchApplicant = () => (
  callApi('/api/applicants')
);

api.fetchTestStatus = rowId => (
  callApi('api/applicants/get-test-status', {
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
  callApi('api/applicants/update-status', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentInterviewDateTime = body => (
  callApi('api/applicants/update-interview-datetime', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentExamDateTime = body => (
  callApi('api/applicants/update-exam-datetime', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentSignDateTime = body => (
  callApi('api/applicants/update-sign-datetime', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentCompleteDateTime = body => (
  callApi('api/applicants/update-first-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentRejectDate = body => (
  callApi('api/applicants/update-reject-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentCancelDate = body => (
  callApi('api/applicants/update-cancel-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentBlacklistDate = body => (
  callApi('api/applicants/update-blacklist-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentNote = body => (
  callApi('api/applicants/update-note', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentInterviewResult = body => (
  callApi('api/applicants/update-interview-result', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentSignedPosition = body => (
  callApi('api/applicants/update-signed-position', {
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

// Recruitment : Basic API

api.getExamDate = citizenId => (
  callApi(`/api/applicants/getExamDate/?citizenId=${citizenId}`)
);

// Recruitment : Grading

api.fetchGradingExam = rowId => (
  callApi(`/api/applicants/fetchGradingExam/?rowId=${rowId}`)
);

// vvvvvvvvvv Exam api (Need to clear unused api) vvvvvvvvvv

// Recruitment

api.getExamUser = body => (
  callApi('api/applicants/get-exam-user', {
    method: 'POST',
    body
  })
);

api.activateExamUser = body => (
  callApi('api/applicants/activate-exam-user', {
    method: 'POST',
    body
  })
);

api.updateRecruitmentTestStatus = body => (
  callApi('api/applicants/update-test-status', {
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

// become row id
api.changeTestStatus = (id, regisDate, status) => (
  callApi(`/api/applicants/changeTestStatus/?id=${id}&regisDate=${regisDate}&status=${status}`)
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

api.fetchEPRList = id => (
  callApi(`/api/takeExam/fetchEPRList/?id=${id}`)
);

api.fetchExamId = () => (
  callApi(`/api/takeExam/fetchExamId`)
);

api.fetchRandomExIdList = (id, testDate) => (
  callApi(`/api/takeExam/fetchRandomExIdList/`, {
    method: 'POST',
    body: {
      id,
      testDate,
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

api.checkProgress = (id, testDate, startTime, answerList) => (
  callApi(`/api/takeExam/checkProgress/`, {
    method: 'POST',
    body: {
      id,
      testDate,
      startTime,
      answerList,
    }
  })
);

api.uploadAnswer = (id, answerList, testDate) => {
  console.log(testDate);
  return callApi(`/api/takeExam/uploadAnswer/`, {
    method: 'POST',
    body: {
      id,
      answerList,
      testDate,
    }
  });
};

api.updateSubmittedTime = (id, time, testDate) => (
  callApi(`/api/takeExam/updateSubmittedTime`, {
    method: 'POST',
    body: {
      id,
      time,
      testDate,
    }
  })
);

api.deActivate = (id, status) => (
  callApi(`/api/takeExam/deActivate`, {
    method: 'POST',
    body: {
      id,
      status,
    }
  })
);

api.grading = (id, testDate) => (
  callApi(`/api/takeExam/grading/`, {
    method: 'POST',
    body: {
      id,
      testDate,
    }
  })
);

export default api;
