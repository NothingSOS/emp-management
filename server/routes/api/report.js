const router = require('express').Router();
const ReportController = require('../../controllers/ReportController');

router.post('/', ReportController.createReport);

module.exports = router;
