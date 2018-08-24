const EmployeeInfo = require('../models/EmployeeInfo');

exports.create = (req, res, next) => {
  const newEmployeeInfo = req.body.employeeInfo;
  EmployeeInfo.create(newEmployeeInfo, req.user.id)
    .then((createdEmployeeInfo) => {
      res.json(createdEmployeeInfo);
    })
    .catch(next);
};

exports.findById = (req, res, next) => {
  if (req.accessControl.employeeInfoViewAll) {
    EmployeeInfo.findAllByUserId(req.query.userId)
      .then((employeeInfo) => {
        res.json(employeeInfo);
      })
      .catch(next);
  }
  else if (req.accessControl.employeeInfoViewOwn) {
    EmployeeInfo.findOwnByUserId(req.query.userId)
      .then((employeeInfo) => {
        res.json(employeeInfo);
      })
      .catch(next);
  }
};

exports.update = (req, res, next) => {
  const editEmployeeInfo = req.body.employeeInfo;
  // for admin
  if (req.accessControl.employeeInfoEditAll) {
    EmployeeInfo.updateAll(editEmployeeInfo, req.user.id)
      .then((updatedEmployeeInfo) => {
        res.json(updatedEmployeeInfo);
      })
      .catch(next);
  }
  // for user
  else if (req.accessControl.employeeInfoEditOwn) {
    if (editEmployeeInfo.userId === req.user.id) {
      EmployeeInfo.updateOwn(editEmployeeInfo, req.user.id)
        .then((updatedEmployeeInfo) => {
          res.json(updatedEmployeeInfo);
        })
        .catch(next);
    }
    else {
      res.status(401).json({
        message: `You don't have permission to do this.`
      });
    }
  }
};

exports.updateProfileImg = (req, res, next) => {
  const path = `/static/profile-img/${req.file.filename}`;
  // for admin
  if (req.accessControl.employeeInfoEditAll) {
    EmployeeInfo.updateProfileImg(path, req.body.userId, req.user.id)
      .then(() => {
        res.json({ path });
      })
      .catch(next);
  }
  // for user
  else if (req.accessControl.employeeInfoEditOwn) {
    if (parseInt(req.body.userId, 10) === req.user.id) {
      EmployeeInfo.updateProfileImg(path, req.body.userId, req.user.id)
        .then(() => {
          res.json({ path });
        })
        .catch(next);
    }
    else {
      res.status(401).json({
        message: `You don't have permission to do this.`
      });
    }
  }
};
