const db = require('../db');
const moment = require('moment');

const Faculty = {};

Faculty.create = (faculty, id) => (
  db.one(
    'INSERT INTO faculties (name, university_id, description, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING id',
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

Faculty.findById = id => (
  db.oneOrNone(`SELECT faculties.*, universities.name AS university_name FROM faculties INNER JOIN universities
  ON faculties.university_id = universities.id WHERE faculties.id = $1`, [id])
);

Faculty.findAll = () => (
  db.manyOrNone(`SELECT faculties.*, universities.name AS university_name FROM faculties INNER JOIN universities ON
  faculties.university_id = universities.id`)
);

module.exports = Faculty;
