const SelfAssessment = require('../models/SelfAssessment')
const EmployeeInfo = require('../models/EmployeeInfo')
const mail = require('../mail');

exports.check = (req, res, next) => {
  if (req.accessControl.evaViewAll || req.user.id === parseInt(req.query.id)) {
    SelfAssessment.checkExist(req.query.id)
      .then(exist => {
        res.json(exist)
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
};

exports.find = (req, res, next) => {
  if (req.accessControl.evaViewAll || req.user.id === parseInt(req.query.id)) {
    SelfAssessment.findById(req.query.id)
      .then(selfInfo => {
        res.json(selfInfo)
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
};

exports.create = (req, res, next) => {
  const newSelfAssessment = req.body.selfAssessmentInfo;
  if (newSelfAssessment.employeeID === req.user.id) {
    SelfAssessment.insertSelfAssessment(newSelfAssessment, req.user.id)
      .then(() => {
        SelfAssessment.checkExist(req.body.selfAssessmentInfo.employeeID)
          .then(exist => {
            res.json(exist)
          })
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
}

exports.update = (req, res, next) => {
  const newSelfAssessment = req.body.selfAssessmentInfo;
  if (newSelfAssessment.employeeID === req.user.id) {
    SelfAssessment.updateSelfAssessment(newSelfAssessment, req.user.id)
      .then(() => {
        SelfAssessment.checkExist(req.body.selfAssessmentInfo.employeeID)
          .then(exist => {
            res.json(exist)
          })
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
}

exports.submit = (req, res, next) => {
  EmployeeInfo.findAllByUserId(req.user.id)
    .then((empInfo) => {
      const mailOptions = {
        from: 'i.plas.sa.tic@gmail.com',
        to: 'ruby.pwn@hotmail.com',
        subject: 'Self Assessment',
        html:
          `
          <p>SelfAssessment of ${empInfo.firstName} ${empInfo.lastName} already submitted</p>
        `
      };
      mail.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(info);
        }
      });
    })
  SelfAssessment.submitSelfAssessment(req.user.id)
    .then(() => {
      SelfAssessment.checkExist(req.user.id)
        .then(exist => {
          res.json(exist)
        })
    })
    .catch(next);
}
