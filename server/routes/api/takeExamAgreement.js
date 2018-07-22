const router = require('express').Router();
const TakeExamAgreementController = require('../../controllers/TakeExamAgreementController');

router.put('/acceptagreement', TakeExamAgreementController.acceptAgreement);

module.exports = router;
