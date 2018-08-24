const router = require('express').Router();
const ApproveBillRecord = require('../../controllers/ApproveBillRecordController');

router.get('/', ApproveBillRecord.findAll);

router.post('/', ApproveBillRecord.updateStatus);

// router.put('/', ApproveBillRecord.updateById);

// router.delete('/',ApproveBillRecord.deleteById);

// router.put('/', AssetTypeController.update);

// router.get('/', AssetTypeController.findAll);

module.exports = router;
