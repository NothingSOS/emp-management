const router = require('express').Router();
const DepartmentController = require('../../controllers/DepartmentController');

router.post('/', DepartmentController.create);

router.put('/', DepartmentController.update);

router.get('/', DepartmentController.findAll);

module.exports = router;
