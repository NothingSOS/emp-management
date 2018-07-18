const db = require('../db');
const moment = require('moment');

const Department = {};

Department.create = (department, id) => (
  db.one(
    'INSERT INTO departments (name, status, created_user, updated_user) VALUES ($1, $2, $3, $4) RETURNING 1',
    [
      department.name,
      department.status,
      id,
      id
    ]
  )
);

Department.update = (department, id) => (
  db.one(
    'UPDATE departments SET name = $1, status = $2, updated_date = $3, updated_user = $4 WHERE id = $5',
    [
      department.name,
      department.status,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      id,
      department.id
    ]
  )
);

Department.findAll = () => (
  db.manyOrNone('SELECT * FROM departments WHERE status = $1', ['Active'])
);

Department.findById = id => (
  db.oneOrNone('SELECT * FROM departments WHERE id = $1', [id])
);

module.exports = Department;
