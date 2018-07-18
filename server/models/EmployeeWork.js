const db = require('../db');
const moment = require('moment');

const EmployeeWork = {};

EmployeeWork.create = (employeeWork, id) => (
  db.one(
    'INSERT INTO employee_work (user_id, department_id, contract_id, position_id, level_id, created_user, updated_user, start_date, probation_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING 1',
    [
      employeeWork.userId,
      employeeWork.departmentId,
      employeeWork.contractId,
      employeeWork.positionId,
      employeeWork.levelId,
      id,
      id,
      employeeWork.startDate,
      employeeWork.probationDate,
      employeeWork.endDate
    ]
  )
);

EmployeeWork.update = (employeeWork, id) => (
  db.none(
    'UPDATE employee_work SET department_id = $1, contract_id = $2, position_id = $3, level_id = $4, updated_user = $5, start_date = $6, probation_date = $7, end_date = $8, updated_date = $9 WHERE user_id = $10',
    [
      employeeWork.departmentId,
      employeeWork.contractId,
      employeeWork.positionId,
      employeeWork.levelId,
      id,
      employeeWork.startDate,
      employeeWork.probationDate,
      employeeWork.endDate,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      employeeWork.userId
    ]
  )
);

EmployeeWork.findByUserId = userId => (
  db.oneOrNone('SELECT * FROM employee_work WHERE user_id = $1', [userId])
);

module.exports = EmployeeWork;
