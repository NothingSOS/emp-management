const db = require('../db');
const moment = require('moment');

const University = {};

University.create = (university, id) => (
  db.one(
    'INSERT INTO universities (name, description, created_user, updated_user) VALUES ($1, $2, $3, $4) RETURNING 1',
    [
      university.name,
      university.description,
      id,
      id
    ]
  )
);

University.update = (university, id) => (
  db.one(
    'UPDATE universities SET name = $1, description = $2, updated_user = $3, updated_date = $4 WHERE id = $5',
    [
      university.name,
      university.description,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      university.id
    ]
  )
);

University.findAll = () => (
  db.manyOrNone('SELECT * FROM universities')
);

module.exports = University;
