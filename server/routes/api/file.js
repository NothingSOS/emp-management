const router = require('express').Router();
const FileController = require('../../controllers/FileController');

router.post('/', FileController.create);

router.get('/', FileController.findByProjectId);

module.exports = router;
