const router = require('express').Router();
const TimesheetController = require('../../controllers/TimesheetController');

router.post('/', TimesheetController.create);

router.put('/', TimesheetController.update);

router.get('/', TimesheetController.findByUserId);

module.exports = router;
