const EmployeeWork = require('../models/EmployeeWork');
const Level = require('../models/Level');
const Department = require('../models/Department');
const Position = require('../models/Position');
const Contract = require('../models/Contract');

exports.create = (req, res, next) => {
  const newEmployeeWork = req.body.employeeWork;
  console.log(newEmployeeWork);
  EmployeeWork.create(newEmployeeWork, req.user.id)
    .then((createdEmployeeWork) => {
      res.json(createdEmployeeWork);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  EmployeeWork.findByUserId(req.query.id)
    .then((employeeWork) => {
      const level = Level.findById(employeeWork.levelId);
      const department = Department.findById(employeeWork.departmentId);
      const position = Position.findById(employeeWork.positionId);
      const contract = Contract.findById(employeeWork.contractId);
      Promise.all([level, department, position, contract])
        .then((values) => {
          employeeWork.levelName = values[0].name;
          employeeWork.departmentName = values[1].name;
          employeeWork.positionName = values[2].name;
          employeeWork.contractName = values[3].name;
        })
        .then(() => {
          res.json(employeeWork);
        });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editEmployeeWork = req.body.employeeWork;
  EmployeeWork.update(editEmployeeWork, req.user.id)
    .then(() => {
      EmployeeWork.findByUserId(req.user.id)
        .then((employeeWorks) => {
          res.json(employeeWorks);
        });
    })
    .catch(next);
};
