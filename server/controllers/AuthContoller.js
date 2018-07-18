const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;

exports.signin = (req, res, next) => {
  console.log(req.body);
  User.findByUsername(req.body.username)
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            id: user.id,
            username: user.username
          }, jwtSecret);
          res.json({
            id: user.id,
            username: user.username,
            token
          });
        }
        else {
          const err = new Error('Incorrect password');
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
  User.findByUsername(newUser.username)
    .then((user) => {
      if (user) {
        const err = new Error('User already exist');
        err.status = 409;
        next(err);
      }
      else {
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync());
        User.createAdmin(newUser)
          .then((createdUser) => {
            res.json(createdUser);
          })
          .catch(next);
      }
    })
    .catch(next);
};
