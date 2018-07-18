const db = require('../db');
const moment = require('moment');

const Contract = {};

Contract.create = (contract, id) => (
  db.one(
    'INSERT INTO contracts (name, status, description, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING 1',
    [
      contract.name,
      contract.status,
      contract.description,
      id,
      id
    ]
  )
);

Contract.update = (contract, id) => (
  db.one(
    'UPDATE contracts SET name = $1, status = $2, description = $3, updated_user = $4, updated_date = $5 WHERE id = $6',
    [
      contract.name,
      contract.status,
      contract.description,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      contract.id
    ]
  )
);

Contract.findAll = () => (
  db.manyOrNone('SELECT * FROM contracts WHERE status = $1', ['Active'])
);

Contract.findById = id => (
  id ? db.oneOrNone('SELECT * FROM contracts WHERE id = $1', [id]) : ''
);

module.exports = Contract;
