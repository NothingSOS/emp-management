const db = require('../db');
const moment = require('moment');

const EmployeeInfo = {};

EmployeeInfo.create = (employeeInfo, id) => (
  db.one(
    'INSERT INTO employee_info (user_id, first_name, last_name, nick_name, mobile_number, line_id, email, facebook_id, picture, birthday, citizen_id, created_user, updated_user, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING 1',
    [
      employeeInfo.userId,
      employeeInfo.firstName,
      employeeInfo.lastName,
      employeeInfo.nickName,
      employeeInfo.mobileNumber,
      employeeInfo.lineId,
      employeeInfo.email,
      employeeInfo.facebookId,
      employeeInfo.picture,
      employeeInfo.birthday,
      employeeInfo.citizenId,
      id,
      id,
      employeeInfo.address
    ]
  )
);

EmployeeInfo.update = (employeeInfo, id) => (
  db.one(
    `UPDATE employee_info
    SET
    first_name = $1,
    last_name = $2,
    nick_name = $3,
    mobile_number = $4,
    line_id = $5,
    email = $6,
    facebook_id = $7,
    picture = $8,
    birthday = $9,
    citizen_id = $10,
    updated_user = $11,
    address = $12,
    updated_date = $13,
    first_name_th = $14,
    last_name_th = $15
    WHERE user_id = $16
    RETURNING user_id`,
    [
      employeeInfo.firstName,
      employeeInfo.lastName,
      employeeInfo.nickName,
      employeeInfo.mobileNumber,
      employeeInfo.lineId,
      employeeInfo.email,
      employeeInfo.facebookId,
      employeeInfo.picture,
      employeeInfo.birthday,
      employeeInfo.citizenId,
      id,
      employeeInfo.address,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      employeeInfo.firstNameTh,
      employeeInfo.lastNameTh,
      employeeInfo.userId
    ]
  )
    .then(result => db.one(`SELECT * FROM employee_info WHERE user_id = $1`, [result.userId]))
);

EmployeeInfo.findById = id => (
  db.oneOrNone('SELECT * FROM employee_info WHERE user_id = $1', [id])
);

EmployeeInfo.updateProfileImg = (path, id) => (
  db.none('UPDATE employee_info SET picture = $1 WHERE user_id = $2', [path, id])
);

module.exports = EmployeeInfo;
