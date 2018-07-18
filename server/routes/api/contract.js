const router = require('express').Router();
const ContractController = require('../../controllers/ContractController');

router.post('/', ContractController.create);

router.put('/', ContractController.update);

router.get('/', ContractController.findAll);

module.exports = router;
