const router = require('express').Router();
const BillRecord = require('../../controllers/BillRecordController');

router.post('/', BillRecord.createErpDetail);

// router.post('/', BillRecord.updataByDetailId);

module.exports = router;
