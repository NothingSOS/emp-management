const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.get('/', UserController.findAll);

router.post('/', UserController.create);

module.exports = router;
