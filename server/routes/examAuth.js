const router = require('express').Router();
const ExamAuthController = require('../controllers/ExamAuthController');

router.post('/login', ExamAuthController.signin);

router.get('/logout', (req, res) => {
  req.logout();
  res.send('logout');
});

module.exports = router;
