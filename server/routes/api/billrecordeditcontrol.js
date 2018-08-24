const router = require('express').Router();
const BillRecord = require('../../controllers/BillRecordController');

router.post('/', BillRecord.findByDetailId);

// router.post('/', BillRecord.updataByDetailId);

module.exports = router;
