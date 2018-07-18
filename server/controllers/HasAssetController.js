const HasAsset = require('../models/HasAsset');
const Asset = require('../models/Asset');

exports.create = (req, res, next) => {
  if (req.body.own) {
    const newAsset = req.body;
    const newHasAsset = {};
    Asset.create(newAsset, req.user.id)
      .then((id) => {
        newHasAsset.userId = req.body.userId;
        newHasAsset.assetId = id;
        newHasAsset.assetDate = req.body.assetDate;
      })
      .then(() => {
        HasAsset.create(newHasAsset, req.user.id)
          .then(() => {
            HasAsset.findByUserId(req.user.id)
              .then((hasAssets) => {
                res.json(hasAssets);
              });
          })
          .catch(next);
      });
  }
  else {
    const newHasAsset = req.body;
    HasAsset.create(newHasAsset, req.user.id)
      .then(() => {
        HasAsset.findByUserId(req.user.id)
          .then((hasAssets) => {
            res.json(hasAssets);
          });
      });
  }
};

exports.update = (req, res, next) => {
  const editHasAsset = req.body.hasAsset;
  HasAsset.update(editHasAsset, req.user.id)
    .then(() => {
      HasAsset.findByUserId(req.user.id)
        .then((hasAssets) => {
          res.json(hasAssets);
        });
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  HasAsset.findByUserId(req.query.id)
    .then((hasAssets) => {
      res.json(hasAssets);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  HasAsset.delete(req.body.id, req.user.id)
    .then(() => {
      HasAsset.findByUserId(req.user.id)
        .then((hasAssets) => {
          res.json(hasAssets);
        })
        .catch(next);
    })
    .catch(next);
};
