const db = require('../db');
const moment = require('moment');

const Position = {};

Position.create = (position, id) => (
  db.one(
    'INSERT INTO positions (name, description, status, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING 1',
    [
      position.name,
      position.description,
      position.status,
      id,
      id
    ]
  )
);

Position.update = (position, id) => (
  db.one(
    'UPDATE positions SET name = $1, description = $2, status = $3, updated_date = $4, updated_user = $5 WHERE id = $6',
    [
      position.name,
      position.description,
      position.status,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      id,
      position.id
    ]
  )
);

Position.findAll = () => (
  db.manyOrNone('SELECT * FROM positions WHERE status = $1', ['Active'])
);

Position.findById = id => (
  id ? db.oneOrNone('SELECT * FROM positions WHERE id = $1', [id]) : ''
);

module.exports = Position;
