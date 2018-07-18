const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = nodemailer.createTransport(smtpTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  secure: true
}));