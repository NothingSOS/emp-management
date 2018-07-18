const router = require('express').Router();
const UniversityController = require('../../controllers/UniversityController');

router.post('/', UniversityController.create);

router.put('/', UniversityController.update);

router.get('/', UniversityController.findAll);

module.exports = router;
