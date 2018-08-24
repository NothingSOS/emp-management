const Performance = require('../models/Performance');
const mail = require('../mail');

exports.check = (req, res, next) => {
  if (req.accessControl.evaViewAll || req.user.id === parseInt(req.query.id)) {
    Performance.checkExist(req.query.id)
      .then((exist) => {
        console.log(exist)
        res.json(exist);
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
};

exports.find = (req, res, next) => {
  if (req.accessControl.evaViewAll || req.user.id === parseInt(req.query.id)) {
    Performance.findById(req.query.id, req.query.year)
      .then((performance) => {
        res.json(performance);
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
};

exports.create = (req, res, next) => {
  const newPerformanceInfo = req.body.performanceInfo;
  Performance.insertPerformance(newPerformanceInfo, req.user.id)
    .then(() => {
      Performance.checkExist(req.body.performanceInfo.employeeID)
        .then((performances) => {
          if (performances[0].supSignDate != null && performances[0].mdSignDate == null) {
            performanceMailer(req);
          }
          res.json(performances)
        });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const newPerformanceInfo = req.body.performanceInfo;
  if (req.accessControl.performanceEdit ) {
    Performance.checkStatus(newPerformanceInfo)
      .then((status) => {
        if (status.canEdit != newPerformanceInfo.employeeSignDate) {
          const err = new Error('Employee already accept');
          err.status = 409;
          next(err);
        } else {
          Performance.updatePerformance(newPerformanceInfo, req.user.id)
            .then(() => {
              Performance.checkExist(req.body.performanceInfo.employeeID)
                .then((performances) => {
                  if (performances[0].supSignDate != null && performances[0].mdSignDate == null) {
                    performanceMailer(req);
                  }
                  res.json(performances)
                });
            })
            .catch(next);
        }
      })
      .catch(next);
  } else if (req.accessControl.emSign && req.user.id === req.body.performanceInfo.employeeID) {
    Performance.empSignPerformance(newPerformanceInfo, req.user.id)
      .then(() => {
        Performance.checkExist(req.body.performanceInfo.employeeID)
          .then((performances) => {
            res.json(performances)
          });
      })
      .catch(next);
  } else res.status(401).json({
    message: `You don't have permission to do this.`
  });
};

const performanceMailer = (req) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'ruby.pwn@hotmail.com',
    subject: 'Performance',
    html:
      `
        <p>Performance of ${req.body.performanceInfo.name} already sumitted</p>
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