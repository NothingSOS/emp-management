const router = require('express').Router();
const AssetController = require('../../controllers/AssetController');

router.post('/', AssetController.create);

router.put('/', AssetController.update);

router.get('/', AssetController.findAll);

module.exports = router;
