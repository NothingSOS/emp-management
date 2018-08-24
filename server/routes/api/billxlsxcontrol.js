const router = require('express').Router();
const BillXLSX = require('../../controllers/BillXLSXController');

router.get('/', BillXLSX.attachmentXLSX);


module.exports = router;
