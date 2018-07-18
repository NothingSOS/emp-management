const passportJwt = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const ExamUser = require('../models/ExamUser');

const jwtOptions = {};
jwtOptions.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  const strategy = new JwtStrategy(jwtOptions, (jwtPayload, cb) => {
    if (jwtPayload.testdate !== null && jwtPayload.testdate !== undefined) {
      ExamUser.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            cb(null, user);
          }
          else {
            cb(null, false);
          }
        })
        .catch(error => cb(error));
    }
    else {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            cb(null, user);
          }
          else {
            cb(null, false);
          }
        })
        .catch(error => cb(error));
    }
  });
  passport.use(strategy);
};
