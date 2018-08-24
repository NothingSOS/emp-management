const router = require('express').Router();
const ProbationController = require('../../controllers/ProbationController');
const { can } = require('../../middlewares');

router.get('/check', can(['evaViewAll','evaViewOwn']), ProbationController.check);
router.get('/', can(['evaViewAll','evaViewOwn']), ProbationController.find);
router.post('/', can(['probationAdd']), ProbationController.create);
router.put('/', can(['probationEdit','emSign']), ProbationController.update);

module.exports = router;