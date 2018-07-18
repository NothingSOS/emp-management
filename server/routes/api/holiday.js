const router = require('express').Router();
const HolidayController = require('../../controllers/HolidayController');

router.post('/', HolidayController.create);

router.put('/', HolidayController.update);

router.get('/', HolidayController.findAll);

module.exports = router;
