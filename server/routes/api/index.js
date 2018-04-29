const router = require('express').Router();
const employeeInfo = require('./employeeInfo');
const employeeWork = require('./employeeWork');
const user = require('./user');
const position = require('./position');
const department = require('./department');
const level = require('./level');
const contract = require('./contract');
const educate = require('./educate');

router.use('/employee-info', employeeInfo);

router.use('/employee-work', employeeWork);

router.use('/users', user);

router.use('/positions', position);

router.use('/departments', department);

router.use('/levels', level);

router.use('/contracts', contract);

router.use('/educates', educate);

module.exports = router;
