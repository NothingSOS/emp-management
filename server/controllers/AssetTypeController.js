const AssetType = require('../models/AssetType');

exports.create = (req, res, next) => {
  const newAssetType = req.body.assetType;
  AssetType.create(newAssetType, req.user.id)
    .then((createdAssetType) => {
      res.json(createdAssetType);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editAssetType = req.body.assetType;
  AssetType.update(editAssetType, req.user.id)
    .then((updatedAssetType) => {
      res.json(updatedAssetType);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  AssetType.findAll()
    .then((assetTypes) => {
      res.json(assetTypes);
    })
    .catch(next);
};
