const router = require('express').Router();
const AssetTypeController = require('../../controllers/AssetTypeController');

router.post('/', AssetTypeController.create);

router.put('/', AssetTypeController.update);

router.get('/', AssetTypeController.findAll);

router.delete('/', AssetTypeController.delete);

module.exports = router;
