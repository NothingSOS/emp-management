const router = require('express').Router();
const PositionController = require('../../controllers/PositionController');

router.post('/', PositionController.create);

router.put('/', PositionController.update);

router.get('/', PositionController.findAll);

module.exports = router;
