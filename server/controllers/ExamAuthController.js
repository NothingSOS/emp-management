const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const ExamUser = require('../models/ExamUser');
const moment = require('moment');

const jwtSecret = process.env.JWT_SECRET;

exports.signin = (req, res, next) => {
  ExamUser.findById(req.body.id)
    .then((user) => {
      if (user) {
        if (moment(user.testDate).add({ minutes: user.activationLifetimes }).diff(moment()) > 0) {
          const token = jwt.sign({
            id: user.id,
            agreementStatus: user.agreementStatus,
            testdate: user.testDate,
          }, jwtSecret);
          res.json({
            id: user.id,
            token,
            agreementStatus: user.agreementStatus,
            testdate: user.testDate,
          });
        }
        else {
          const err = new Error('This user is not activated');
          err.status = 401;
          next(err);
        }
      }
      else {
        const err = new Error('User not found');
        err.status = 404;
        next(err);
      }
    })
    .catch(next);
};

exports.signup = (req, res, next) => {
  const newUser = req.body.user;
  ExamUser.findByUsername(newUser.userid)
    .then((user) => {
      if (user) {
        const err = new Error('User already exist');
        err.status = 409;
        next(err);
      }
      else {
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync());
        ExamUser.createAdmin(newUser)
          .then((createdUser) => {
            res.json(createdUser);
          })
          .catch(next);
      }
    })
    .catch(next);
};
