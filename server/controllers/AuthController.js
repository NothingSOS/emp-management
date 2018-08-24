const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/User');
const EmployeeInfo = require('../models/EmployeeInfo');

const jwtSecret = process.env.JWT_SECRET;

exports.signin = (req, res, next) => {
  User.findByUsername(req.body.username)
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          EmployeeInfo.findOwnByUserId(user.id)
            .then((info) => {
              const accessToken = jwt.sign({
                id: user.id,
                username: user.username,
                type: user.type,
                name: `${info.firstName} ${info.lastName}`,
              }, jwtSecret, { expiresIn: 3600 });
              const refreshToken = jwt.sign({
                id: user.id,
                username: user.username
              }, jwtSecret);
              User.updateRefreshToken(user.id, refreshToken)
                .then(() => res.json({
                  id: user.id,
                  username: user.username,
                  accessToken,
                  refreshToken,
                  type: user.type,
                  name: `${info.firstName} ${info.lastName}`,
                }))
                .catch(next);
            })
            .catch(next);
        }
        else {
          const err = new Error('Incorrect Username or Password');
          err.status = 404;
          next(err);
        }
      }
      else {
        const err = new Error('Incorrect Username or Password');
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

exports.refreshToken = (req, res, next) => {
  const { refreshToken } = req.body;
  const { id, username } = jwt.decode(refreshToken);
  User.getRefreshToken(id)
    .then((data) => {
      if (data.refreshToken === refreshToken) {
        const accessToken = jwt.sign({
          id,
          username
        }, jwtSecret, { expiresIn: 3600 });
        res.json({
          accessToken
        });
      }
      else {
        res.status(401).json({
          message: 'Invalid refresh token'
        });
      }
    })
    .catch(next);
};
