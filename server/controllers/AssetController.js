const Asset = require('../models/Asset');

exports.create = (req, res, next) => {
  const newAsset = req.body.asset;
  if (req.file) {
    newAsset.picture = `/server/storage/private/asset/${req.file.filename}`;
  }
  Asset.create(newAsset, req.user.id)
    .then((result) => {
      Asset.findById(result.id)
        .then((asset) => {
          res.json(asset);
        })
        .catch(next);
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

exports.delete = (req, res, next) => {
  Asset.delete(req.body.id)
    .then(() => {
      Asset.findAll()
        .then((assets) => {
          res.json(assets);
        })
        .catch(next);
    })
    .catch(next);
};
