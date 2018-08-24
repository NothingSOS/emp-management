const Probation = require('../models/Probation');
const mail = require('../mail');

exports.check = (req, res, next) => {
  if (req.accessControl.evaViewAll || req.user.id === parseInt(req.query.id)) {
    Probation.checkExist(req.query.id)
      .then((exist) => {
        console.log(exist);
        res.json(exist);
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
};

exports.find = (req, res, next) => {
  if (req.accessControl.evaViewAll || req.user.id === parseInt(req.query.id)) {
    Probation.findProById(req.query.id, req.query.proId)
      .then((users) => {
        res.json(users);
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
};

exports.create = (req, res, next) => {
  const newProbationInfo = req.body.probationInfo;
  Probation.insertProbation(newProbationInfo, req.user.id)
    .then(() => {
      Probation.checkExist(req.body.probationInfo.employeeID)
        .then((probations) => {
          if (probations[0].supSignDate != null && probations[0].mdSignDate == null) {
            probationMailer(req);
          }
          res.json(probations)
        });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const newProbationInfo = req.body.probationInfo;
  if (req.accessControl.probationEdit) {
    Probation.checkStatus(newProbationInfo)
      .then((status) => {
        if (status.canEdit != newProbationInfo.employeeSignDate) {
          const err = new Error('Employee already accept');
          err.status = 409;
          next(err);
        } else {
          Probation.updateProbation(newProbationInfo, req.user.id)
            .then(() => {
              Probation.checkExist(req.body.probationInfo.employeeID)
                .then((probations) => {
                  if (probations[0].supSignDate != null && probations[0].mdSignDate == null) {
                    probationMailer(req);
                  }
                  res.json(probations)
                });
            })
            .catch(next);
        }
      })
      .catch(next);
  } else if (req.accessControl.emSign && req.user.id === req.body.probationInfo.employeeID) {
    Probation.empSignProbation(newProbationInfo, req.user.id)
      .then(() => {
        Probation.checkExist(req.body.probationInfo.employeeID)
          .then((probations) => {
            res.json(probations)
          });
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
};

const probationMailer = (req) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'ruby.pwn@hotmail.com',
    subject: 'Probation',
    html:
      `
        <p>Probation of ${req.body.probationInfo.name} already sumitted</p>
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
};