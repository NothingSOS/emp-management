const db = require('../db');
const moment = require('moment');

const Certificate = {};

Certificate.create = (certificate, id) => (
  db.one(
    'INSERT INTO certificates (name, description, institute, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [
      certificate.name,
      certificate.description,
      certificate.institute,
      id,
      id
    ]
  )
);

Certificate.update = (certificate, id) => (
  db.one(
    'UPDATE certificates SET name = $1, description = $2, institute = $3, updated_user = $4, updated_date = $5 WHERE id = $6',
    [
      certificate.name,
      certificate.description,
      certificate.institute,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      certificate.id
    ]
  )
);

Certificate.findById = id => (
  db.oneOrNone('SELECT * FROM certificates WHERE id = $1', [id])
);

Certificate.findAll = () => (
  db.manyOrNone('SELECT * FROM certificates')
);

Certificate.delete = id => (
  db.none('DELETE FROM certificates WHERE id = $1', [id])
);

module.exports = Certificate;
