const db = require('../db');
const moment = require('moment');

const Faculty = {};

Faculty.create = (faculty, id) => (
  db.one(
    'INSERT INTO faculties (name, university_id, description, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING 1',
    [
      faculty.name,
      faculty.universityId,
      faculty.description,
      id,
      id
    ]
  )
);

Faculty.update = (faculty, id) => (
  db.one(
    'UPDATE faculties SET name = $1, description = $2, updated_user = $3, updated_date = $4 WHERE id = $5',
    [
      faculty.name,
      faculty.description,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      faculty.id
    ]
  )
);

Faculty.findByUniversityId = universityId => (
  db.manyOrNone('SELECT * FROM faculties WHERE university_id = $1', [universityId])
);

Faculty.findAll = () => (
  db.manyOrNone('SELECT * FROM faculties')
);

module.exports = Faculty;
