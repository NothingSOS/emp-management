const db = require('../db');
const moment = require('moment');

const Level = {};

Level.create = (level, id) => (
  db.one(
    'INSERT INTO levels (name, description, status, annual_leave, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 1',
    [
      level.name,
      level.description,
      level.status,
      level.annualLeave,
      id,
      id
    ]
  )
);

Level.update = (level, id) => (
  db.one(
    'UPDATE levels SET name = $1, description = $2, status = $3, annual_leave = $4, updated_user = $5, updated_date = $6 WHERE id = $7',
    [
      level.name,
      level.description,
      level.status,
      level.annualLeave,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      level.id
    ]
  )
);

Level.findAll = () => (
  db.manyOrNone('SELECT * FROM levels WHERE status = $1', ['Active'])
);

Level.findById = id => (
  db.oneOrNone('SELECT * FROM levels WHERE id = $1', [id])
);

module.exports = Level;
