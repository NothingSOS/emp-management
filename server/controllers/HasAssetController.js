const HasAsset = require('../models/HasAsset');
const Asset = require('../models/Asset');

const createHasAsset = (newAsset, creatorId) => new Promise(async (resolve, reject) => {
  try {
    const newHasAsset = {};
    const asset = await Asset.create(newAsset, creatorId);
    newHasAsset.userId = newAsset.userId;
    newHasAsset.assetId = asset.id;
    newHasAsset.assetDate = newAsset.assetDate;
    const hasAsset = await HasAsset.create(newHasAsset, creatorId);
    resolve(hasAsset);
  }
  catch (error) {
    reject(error);
  }
});

exports.create = (req, res, next) => {
  if (req.accessControl.hasAssetAddAll) {
    if (req.body.ownFlag) {
      const newAsset = req.body;
      newAsset.ownFlag = 'MySelf';
      if (req.file) {
        newAsset.picture = `/server/storage/private/asset/${req.file.filename}`;
      }
      createHasAsset(newAsset, req.user.id)
        .then(() => {
          HasAsset.findByUserId(newAsset.userId)
            .then((hasAssets) => {
              res.json(hasAssets);
            })
            .catch(next);
        })
        .catch(next);
    }
    else {
      const newHasAsset = req.body;
      HasAsset.create(newHasAsset, req.user.id)
        .then(() => {
          HasAsset.findByUserId(newHasAsset.userId)
            .then((hasAssets) => {
              res.json(hasAssets);
            });
        });
    }
  }
  else if (req.accessControl.hasAssetAddOwn) {
    if (req.body.ownFlag) {
      const newAsset = req.body;
      if (newAsset.userId === req.user.id) {
        if (req.file) {
          newAsset.picture = `/server/storage/private/asset/${req.file.filename}`;
        }
        createHasAsset(newAsset, req.user.id)
          .then(() => {
            HasAsset.findByUserId(req.query.userId)
              .then((hasAssets) => {
                res.json(hasAssets);
              })
              .catch(next);
          })
          .catch(next);
      }
      else {
        res.status(401).json({
          message: `You don't have permission to do this.`
        });
      }
    }
    else {
      res.status(401).json({
        message: `You don't have permission to do this.`
      });
    }
  }
};

exports.findByUserId = (req, res, next) => {
  HasAsset.findByUserId(req.query.userId)
    .then((hasAssets) => {
      res.json(hasAssets);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  HasAsset.findById(req.body.id)
    .then((hasAsset) => {
      const { userId } = hasAsset;
      HasAsset.delete(req.body.id, req.user.id)
        .then(() => {
          HasAsset.findByUserId(userId)
            .then((hasAssets) => {
              res.json(hasAssets);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};
