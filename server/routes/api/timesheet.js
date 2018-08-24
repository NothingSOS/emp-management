const router = require('express').Router();
const TimesheetController = require('../../controllers/TimesheetController');
const { can } = require('../../middlewares');

router.post('/', can(['timesheetAddOwn']), TimesheetController.create);

router.put('/', can(['timesheetEditOwn']), TimesheetController.update);

router.get('/', can(['timesheetViewOwn']), TimesheetController.findByMonthAndYear);

router.delete('/', can(['timesheetDeleteOwn']), TimesheetController.delete);

router.delete('/', TimesheetController.delete);

module.exports = router;
