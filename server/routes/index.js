const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const auth = require('./auth');
const examAuth = require('./examAuth');
const api = require('./api');

router.use('/auth', auth);
router.use('/examauth', examAuth);
router.use('/api', passport.authenticate('jwt', { session: false }), api);

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

module.exports = router;
