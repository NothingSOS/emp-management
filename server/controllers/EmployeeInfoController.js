const EmployeeInfo = require('../models/EmployeeInfo');

exports.create = (req, res, next) => {
  const newEmployeeInfo = req.body.employeeInfo;
  EmployeeInfo.create(newEmployeeInfo, req.user.id)
    .then((createdEmployeeInfo) => {
      res.json(createdEmployeeInfo);
    })
    .catch(next);
};

exports.find = (req, res, next) => {
  EmployeeInfo.findById(req.query.id)
    .then((employeeInfo) => {
      res.json(employeeInfo);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editEmployeeInfo = req.body.employeeInfo;
  EmployeeInfo.update(editEmployeeInfo, req.user.id)
    .then((updatedEmployeeInfo) => {
      res.json(updatedEmployeeInfo);
    })
    .catch(next);
};

exports.updateProfileImg = (req, res, next) => {
  EmployeeInfo.updateProfileImg(`${req.file.destination}/${req.file.filename}`, req.user.id)
    .then(() => {
      res.json('upload complete!!!');
    });
};
