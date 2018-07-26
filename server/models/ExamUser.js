const db = require('../db');
const moment = require('moment');

const ExamUser = {};

// if you uncommend any commend-ed don't forget to change query table
// from user to examUser or something else that is correct

// query of ExamUser.create wrong!
// ExamUser.create = (user, id) => (
//   db.tx((transaction) => {
//     const query = transaction.one(
//       'INSERT INTO exam_users2 (id, password, created_user, updated_user, type, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 1',
//       [
//         user.id,
//         user.password,
//         id,
//         id,
//         user.type,
//         user.status
//       ]
//     );
//     return transaction.batch([query]);
//   })
// );

ExamUser.findById = id => (
  db.oneOrNone('SELECT * FROM exam_users WHERE id = $1 AND test_date = $2', [id, moment().format('YYYY-MM-DD')])
);

// User.findAll = () => (
// db.manyOrNone('SELECT users.id, employee_info.first_name, employee_info.last_name, employee_info.nick_name,
// employee_info.mobile_number, employee_info.email, employee_info.picture FROM employee_info, users WHERE users.id = employee_info.user_id AND users.status = $1 ORDER BY users.id ', ['Active'])
// );

// User.findByName = (firstName, lastName) => (
//   db.oneOrNone('SELECT * FROM employee_info WHERE first_name = $1 AND last_name = $2', [firstName, lastName])
// );

ExamUser.createAdmin = user => (
  db.one(
    'INSERT INTO exam_users (id, password, created_user, updated_user, type, status, id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      user.username,
      user.password,
      10000,
      10000,
      1,
      'Active',
      10000
    ]
  )
);

module.exports = ExamUser;
