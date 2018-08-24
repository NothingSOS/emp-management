const db = require('../db');
const moment = require('moment');

const AssetType = {};

AssetType.create = (assetType, id) => (
  db.one(
    'INSERT INTO asset_types (name, description, created_user, updated_user) VALUES ($1, $2, $3, $4) RETURNING id',
    [
      assetType.name,
      assetType.description,
      id,
      id
    ]
  )
);

AssetType.update = (assetType, id) => (
  db.one(
    'UPDATE asset_types SET name = $1, description = $2, status = $3, updated_user = $4, updated_date = $5 WHERE id = $6',
    [
      assetType.name,
      assetType.description,
      assetType.status,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      assetType.id
    ]
  )
);

AssetType.findById = id => (
  db.oneOrNone('SELECT * FROM asset_types WHERE id = $1', [id])
);

AssetType.findAll = () => (
  db.manyOrNone('SELECT * FROM asset_types WHERE status = $1', ['Active'])
);

AssetType.delete = id => (
  db.none('DELETE FROM asset_types WHERE id = $1', [id])
);

module.exports = AssetType;
