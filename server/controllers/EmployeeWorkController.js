const EmployeeWork = require('../models/EmployeeWork');
const EmployeeInfo = require('../models/EmployeeInfo');
const Level = require('../models/Level');
const Department = require('../models/Department');
const Position = require('../models/Position');
const Contract = require('../models/Contract');

exports.create = (req, res, next) => {
  const newEmployeeWork = req.body.employeeWork;
  EmployeeWork.create(newEmployeeWork, req.user.id)
    .then((createdEmployeeWork) => {
      res.json(createdEmployeeWork);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  if (req.accessControl.employeeWorkViewAll) {
    EmployeeWork.findAllByUserId(req.query.userId)
      .then((employeeWork) => {
        const level = Level.findById(employeeWork.levelId);
        const department = Department.findById(employeeWork.departmentId);
        const position = Position.findById(employeeWork.positionId);
        const contract = Contract.findById(employeeWork.contractId);
        const boss = EmployeeInfo.findOwnByUserId(employeeWork.bossId);
        Promise.all([level, department, position, contract, boss])
          .then((values) => {
            employeeWork.levelName = values[0].name;
            employeeWork.departmentName = values[1].name;
            employeeWork.positionName = values[2].name;
            employeeWork.contractName = values[3].name;
            if (values[4]) {
              employeeWork.bossName = `${values[4].firstName} ${values[4].lastName}`;
            }
            res.json(employeeWork);
          })
          .catch(next);
      })
      .catch(next);
  }
  else if (req.accessControl.employeeWorkViewOwn) {
    EmployeeWork.findOwnByUserId(req.query.userId)
      .then((employeeWork) => {
        const level = Level.findById(employeeWork.levelId);
        const department = Department.findById(employeeWork.departmentId);
        const position = Position.findById(employeeWork.positionId);
        const boss = EmployeeInfo.findOwnByUserId(employeeWork.bossId);
        Promise.all([level, department, position, boss])
          .then((values) => {
            employeeWork.levelName = values[0].name;
            employeeWork.departmentName = values[1].name;
            employeeWork.positionName = values[2].name;
            if (values[3]) {
              employeeWork.bossName = `${values[3].firstName} ${values[3].lastName}`;
            }
            res.json(employeeWork);
          })
          .catch(next);
      })
      .catch(next);
  }
  else {
    res.status(401).json({
      message: `You don't have permission to do this.`
    });
  }
};

exports.update = (req, res, next) => {
  const editEmployeeWork = req.body.employeeWork;
  EmployeeWork.update(editEmployeeWork, req.user.id)
    .then(() => {
      EmployeeWork.findAllByUserId(editEmployeeWork.userId)
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
              res.json(employeeWork);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};
