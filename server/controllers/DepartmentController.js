const Department = require('../models/Department');

exports.create = (req, res, next) => {
  const newDepartment = req.body.department;
  Department.create(newDepartment, req.user.id)
    .then((createdDepartment) => {
      res.json(createdDepartment);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editDepartment = req.body.department;
  Department.update(editDepartment, req.user.id)
    .then((updatedDepartment) => {
      res.json(updatedDepartment);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Department.findAll()
    .then((departments) => {
      res.json(departments);
    })
    .catch(next);
};
