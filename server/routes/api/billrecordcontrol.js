const router = require('express').Router();
const BillRecord = require('../../controllers/BillRecordController');

router.get('/findallrecord', BillRecord.findAll);

router.get('/', BillRecord.findAllRecordErp);

router.post('/', BillRecord.create);

router.delete('/', BillRecord.deleteByBillId);

module.exports = router;
