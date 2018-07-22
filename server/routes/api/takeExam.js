const router = require('express').Router();
const TakeExamController = require('../../controllers/TakeExamController');

router.get('/fetchEPRList', TakeExamController.fetchEPRList);

router.get('/fetchExamId', TakeExamController.fetchExamId);

router.post('/fetchRandomExIdList', TakeExamController.fetchRandomExIdList);

router.post('/fetchExamSpecifyId', TakeExamController.fetchExamSpecifyId);

router.post('/checkProgress', TakeExamController.findUploadedAnswer);

router.post('/uploadAnswer', TakeExamController.updateAnswer);

router.post('/updateSubmittedTime', TakeExamController.updateSubmittedTime);

router.post('/deActivate', TakeExamController.deActivate);

router.post('/grading', TakeExamController.grading);

router.post('/sendMail', TakeExamController.sendMail);

module.exports = router;
