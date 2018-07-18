const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  secure: true
}));


exports.findAll = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};

exports.create = (req, res, next) => {
  const newUser = req.body.user;
  const pass = newUser.password;
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
              newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync());
              User.create(newUser, req.user.id)
                .then((createdUser) => {
                  const mailOptions = {
                    from: process.env.MAIL_USER,
                    to: newUser.email,
                    subject: 'Hello',
                    html: `<p>${newUser.username} ${pass}</p>`
                  };
                  transporter.sendMail(mailOptions, (err, info) => {
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
