const db = require('../db');
const moment = require('moment');

const Major = {};

Major.create = (major, id) => (
  db.one(
    'INSERT INTO majors (name, faculty_id, description, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING 1',
    [
      major.name,
      major.facultyId,
      major.description,
      id,
      id
    ]
  )
);

Major.update = (major, id) => (
  db.one(
    'UPDATE majors SET name = $1, description = $2, updated_user = $3, updated_date = $4 WHERE id = $5',
    [
      major.name,
      major.description,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      major.id
    ]
  )
);

Major.findByFacultyId = facultyId => (
  db.manyOrNone('SELECT * FROM majors WHERE faculty_id = $1', [facultyId])
);

Major.findAll = () => (
  db.manyOrNone('SELECT * FROM majors')
);

module.exports = Major;
