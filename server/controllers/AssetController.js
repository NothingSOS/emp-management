const Asset = require('../models/Asset');

exports.create = (req, res, next) => {
  const newAsset = req.body.asset;
  Asset.create(newAsset, req.user.id)
    .then((createdAsset) => {
      res.json(createdAsset);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editAsset = req.body.asset;
  Asset.update(editAsset, req.user.id)
    .then((updatedAsset) => {
      res.json(updatedAsset);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Asset.findAll()
    .then((assets) => {
      res.json(assets);
    })
    .catch(next);
};
