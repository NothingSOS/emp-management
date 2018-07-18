const router = require('express').Router();
const ProjectController = require('../../controllers/ProjectController');

router.post('/', ProjectController.create);

router.put('/', ProjectController.update);

router.get('/:id', ProjectController.findById);

router.get('/', ProjectController.findAll);

module.exports = router;
