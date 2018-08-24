const router = require('express').Router();
const PerformanceController = require('../../controllers/PerformanceController');
const { can } = require('../../middlewares');

router.get('/check', can(['evaViewAll','evaViewOwn']), PerformanceController.check);
router.get('/', can(['evaViewAll','evaViewOwn']), PerformanceController.find);
router.post('/', can(['performanceAdd']), PerformanceController.create);
router.put('/', can(['performanceEdit','emSign']), PerformanceController.update);

module.exports = router;
