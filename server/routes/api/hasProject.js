const router = require('express').Router();
const HasProjectController = require('../../controllers/HasProjectController');
const { can } = require('../../middlewares');

router.post('/', can(['hasProjectAdd']), HasProjectController.create);

router.put('/', HasProjectController.update);

router.get('/', HasProjectController.findByUserId);

router.delete('/', can(['hasProjectDelete']), HasProjectController.delete);

module.exports = router;
