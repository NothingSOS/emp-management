const jwt = require('jsonwebtoken');
const TakeExamAgreement = require('../models/TakeExamAgreement');

const jwtSecret = process.env.JWT_SECRET;

exports.acceptAgreement = (req, res, next) => {
  console.log('testtest');
  console.log('HERE', req.body);
  TakeExamAgreement.acceptAgreement(req.body.id, req.body.testdate)
    .then(() => {
      const newToken = jwt.sign({
        id: req.body.id,
        agreementStatus: 'Read',
        testdate: req.body.testdate,
      }, jwtSecret);
      res.json({
        id: req.body.id,
        newToken,
        agreementStatus: 'Read',
        testdate: req.body.testdate,
      });
    })
    .catch(next);
};
