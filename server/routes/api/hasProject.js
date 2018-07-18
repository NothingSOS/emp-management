const router = require('express').Router();
const HasProjectController = require('../../controllers/HasProjectController');

router.post('/', HasProjectController.create);

router.put('/', HasProjectController.update);

router.get('/', HasProjectController.findByUserId);

module.exports = router;
