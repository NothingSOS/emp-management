const db = require('../db');
const moment = require('moment');

const ApplyPosition = {};

ApplyPosition.create = (applyPosition, id) => (
  db.none(
    'INSERT INTO apply_positions (name, description, created_user, updated_user) VALUES ($1, $2, $3, $4)',
    [
      applyPosition.name,
      applyPosition.description,
      id,
      id
    ]
  )
);

ApplyPosition.findAll = () => (
  db.manyOrNone('SELECT * FROM apply_positions')
);

ApplyPosition.delete = id => (
  db.none('DELETE FROM apply_positions WHERE id = $1', [id])
);

module.exports = ApplyPosition;
