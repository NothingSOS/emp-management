const db = require('../db');
// const moment = require('moment');

const HasAsset = {};

HasAsset.create = (hasAsset, id) => (
  db.one(
    'INSERT INTO has_assets (user_id, asset_id, asset_date, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING 1',
    [
      hasAsset.userId,
      hasAsset.assetId,
      hasAsset.assetDate,
      id,
      id
    ]
  )
);

// HasAsset.update = (hasAsset, id) => (
//   db.one(
//     'UPDATE has_assets SET asset_id = $1, asset_date = $2, updated_user = $3, updated_date = $4 WHERE id = $5',
//     [
//       hasAsset.assetId,
//       hasAsset.assetDate,
//       id,
//       moment().format('YYYY-MM-DD HH:mm:ss'),
//       hasAsset.id
//     ]
//   )
// );

HasAsset.findByUserId = userId => (
  db.manyOrNone('SELECT assets.description AS description, assets.serial_number AS serial_number, has_assets.user_id AS user_id, has_assets.asset_id AS asset_id, assets.name AS asset_name, assets.asset_type_id AS asset_type_id, asset_types.name AS asset_type_name, has_assets.asset_date AS asset_date, has_assets.id AS id FROM has_assets, assets, asset_types WHERE has_assets.asset_id = assets.id AND assets.asset_type_id = asset_types.id AND has_assets.user_id = $1', [userId])
);

HasAsset.delete = (id, userId) => (
  db.none('DELETE FROM has_assets WHERE id = $1 AND user_id = $2', [id, userId])
);

module.exports = HasAsset;
