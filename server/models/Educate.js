const db = require('../db');
const moment = require('moment');

const Educate = {};

Educate.create = (educate, id) => (
  db.one(
    'INSERT INTO educates (user_id, university_id, faculty_id, major_id, degree_id, gpax, graduation_date, program, honor_flag, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING 1',
    [
      educate.userId,
      educate.universityId,
      educate.facultyId,
      educate.majorId,
      educate.degreeId,
      educate.gpax,
      educate.graduationDate,
      educate.program,
      educate.honorFlag,
      id,
      id
    ]
  )
);

Educate.update = (educate, id) => (
  db.none(
    'UPDATE educates SET university_id = $1, faculty_id = $2, major_id = $3, degree_id = $4, gpax = $5, graduation_date = $6, program = $7, honor_flag = $8, updated_date = $9, updated_user = $10 WHERE id = $11',
    [
      educate.universityId,
      educate.facultyId,
      educate.majorId,
      educate.degreeId,
      educate.gpax,
      educate.graduationDate,
      educate.program,
      educate.honorFlag,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      id,
      educate.id
    ]
  )
);

Educate.findByUserId = userId => (
  db.manyOrNone('SELECT educates.id, educates.user_id, educates.university_id, universities.name AS university_name, educates.faculty_id, faculties.name AS faculty_name, educates.major_id, majors.name AS major_name, educates.degree_id, degrees.name AS degree_name, educates.gpax, educates.graduation_date, educates.program, educates.honor_flag FROM educates, universities, faculties, majors, degrees WHERE educates.university_id = universities.id AND educates.faculty_id = faculties.id AND educates.major_id = majors.id AND educates.degree_id = degrees.id AND user_id = $1 ORDER BY educates.graduation_date', [userId])
);

Educate.delete = (id, userId) => (
  db.none('DELETE FROM educates WHERE id = $1 AND user_id = $2', [id, userId])
);

module.exports = Educate;
