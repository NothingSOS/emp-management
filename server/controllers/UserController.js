const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const mail = require('../mail');
const mailAddUser = require('../mail_template/mailAddUser');

exports.findAll = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};

exports.create = (req, res, next) => {
  const newUser = req.body.user;
  const pass = 'playtorium';
  User.findByName(newUser.firstName, newUser.lastName)
    .then((user1) => {
      if (user1) {
        const err = new Error('User already exit');
        err.status = 409;
        next(err);
      }
      else {
        User.findByUsername(newUser.username)
          .then((user) => {
            if (user) {
              const err = new Error('Username already exist');
              err.status = 409;
              next(err);
            }
            else {
              const name = `${newUser.firstName} ${newUser.lastName}`;
              newUser.password = bcrypt.hashSync(pass, bcrypt.genSaltSync());
              if (newUser.gender === 'Male') {
                newUser.picture = '/static/profile-img/man.jpg';
              }
              else {
                newUser.picture = '/static/profile-img/woman.jpg';
              }
              User.create(newUser, req.user.id)
                .then((createdUser) => {
                  const mailOptions = {
                    from: process.env.MAIL_USER,
                    to: newUser.username,
                    subject: 'Playtorium Account Information',
                    html: mailAddUser(newUser.username, pass, name)
                  };
                  mail.sendMail(mailOptions, (err, info) => {
                    if (err) {
                      console.log(err);
                    }
                    else {
                      console.log(info);
                    }
                  });
                  res.json(createdUser);
                })
                .catch(next);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};
