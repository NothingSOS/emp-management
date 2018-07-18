const router = require('express').Router();
const AuthController = require('../controllers/AuthContoller');

router.post('/signup', AuthController.signup);

router.post('/login', AuthController.signin);

router.get('/logout', (req, res) => {
  req.logout();
  res.send('logout');
});

module.exports = router;
