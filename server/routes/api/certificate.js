const router = require('express').Router();
const CertificateController = require('../../controllers/CertificateController');

router.post('/', CertificateController.create);

router.put('/', CertificateController.update);

router.get('/', CertificateController.findAll);

router.delete('/', CertificateController.delete);

module.exports = router;
