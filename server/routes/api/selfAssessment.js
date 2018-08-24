const router = require('express').Router();
const SelfAssessmentController = require('../../controllers/SelfAssessmentController');
const { can } = require('../../middlewares');

router.get('/check', can(['evaViewAll', 'evaViewOwn']), SelfAssessmentController.check);
router.get('/', can(['evaViewAll', 'evaViewOwn']), SelfAssessmentController.find);
router.post('/', SelfAssessmentController.create);
router.put('/', SelfAssessmentController.update);
router.put('/submit', SelfAssessmentController.submit);

module.exports = router;
