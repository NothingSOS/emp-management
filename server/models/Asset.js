const db = require('../db');
const moment = require('moment');

const Asset = {};

Asset.create = (asset, id) => (
  db.one(
    'INSERT INTO assets (asset_type_id, name, description, own_flag, serial_number, created_user, updated_user, picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
    [
      asset.assetTypeId,
      asset.name,
      asset.description,
      asset.ownFlag,
      asset.serialNumber,
      id,
      id,
      asset.picture
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

Asset.findById = id => (
  db.oneOrNone(`SELECT asset_types.name AS asset_type_name, assets.* FROM assets INNER JOIN asset_types ON
  assets.asset_type_id = asset_types.id WHERE assets.id = $1`, [id])
);

Asset.findAll = () => (
  db.manyOrNone(`SELECT asset_types.name AS asset_type_name, assets.* FROM assets INNER JOIN asset_types 
  ON assets.asset_type_id = asset_types.id WHERE assets.own_flag = $1 AND assets.status = $2`, ['Company', 'Active'])
);

Asset.delete = id => (
  db.none('DELETE FROM assets WHERE id = $1', [id])
);

module.exports = Asset;
