const db = require('../db');
const moment = require('moment');

const Asset = {};

Asset.create = (asset, id) => (
  db.one(
    'INSERT INTO assets (asset_type_id, name, description, own_flag, serial_number, created_user, updated_user, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
    [
      asset.assetTypeId,
      asset.name,
      asset.description,
      asset.ownFlag,
      asset.serialNumber,
      id,
      id,
      asset.status
    ]
  )
);

Asset.update = (asset, id) => (
  db.none(
    'UPDATE assets SET asset_type_id = $1, name = $2, description = $3, own_flag = $4, serial_number = $5, updated_user = $6, updated_date = $7, status = $8 WHERE id = $9',
    [
      asset.assetTypeId,
      asset.name,
      asset.description,
      asset.ownFlag,
      asset.serialNumber,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      asset.status,
      asset.id,
    ]
  )
);

Asset.findAll = () => (
  db.manyOrNone('SELECT * FROM assets')
);

module.exports = Asset;
