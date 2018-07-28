const router = require('express').Router();
const ApplicantController = require('../../controllers/ApplicantController');
// const EmployeeInfoController = require('../../controllers/EmployeeInfoController');
const multer = require('multer');

router.post('/', ApplicantController.create);

router.get('/', ApplicantController.findAll);

router.put('/update-status', ApplicantController.updateStatus);

router.put('/update-signed-position', ApplicantController.updateSignedPosition);

router.put('/update-interview-datetime', ApplicantController.updateInterviewDateTime);

router.put('/update-sign-datetime', ApplicantController.updateSignDateTime);

router.put('/update-first-date', ApplicantController.updateFirstDate);

router.put('/update-reject-date', ApplicantController.updateRejectDate);

router.put('/update-cancel-date', ApplicantController.updateCancelDate);

router.put('/update-blacklist-date', ApplicantController.updateBlacklistDate);

router.put('/update-exam-datetime', ApplicantController.updateExamDate);

router.put('/update-note', ApplicantController.updateNote);

router.put('/update-interview-result', ApplicantController.updateInterviewResult);

router.get('/applicant-info', ApplicantController.findInfoById);

router.get('/applicant-file', ApplicantController.findFileById);

router.get('/get-position', ApplicantController.getPosition);

router.post('/uploadGradeProgress', ApplicantController.uploadGradeProgress);

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'server/storage/public/applicants-files');
  },
  filename: (req, res, cb) => {
    cb(null, `${req.body.rowId}_${req.body.type}.pdf`);
  }
});
const upload = multer({ storage });

router.post('/upload-file', upload.single('file'), ApplicantController.upload);

router.post('/get-exam-user', ApplicantController.getExamUser);

router.post('/activate-exam-user', ApplicantController.activateExamUser);

router.post('/update-test-status', ApplicantController.updateTestStatus);

router.get('/getExamDate', ApplicantController.getExamDate);

router.get('/fetchGradingExam', ApplicantController.fetchGradingExam);

router.post('/get-test-status', ApplicantController.getTestStatus);

router.put('/change-test-status', ApplicantController.changeInterviewDone);

router.get('/fetchEPRList', ApplicantController.fetchEPRList);

router.get('/fetchExamId', ApplicantController.fetchExamId);

router.post('/uploadRandomExIdList', ApplicantController.uploadRandomExIdList);

router.post('/getRowId', ApplicantController.getRowId);

router.post('/changeTestStatus', ApplicantController.changeStatus);

module.exports = router;
