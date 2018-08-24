const router = require('express').Router();
const ApplyPositionController = require('../../controllers/ApplyPositionController');

router.post('/', ApplyPositionController.create);

router.get('/', ApplyPositionController.findAll);

router.delete('/', ApplyPositionController.delete);

module.exports = router;
