const ApplyPosition = require('../models/ApplyPosition');

exports.create = (req, res, next) => {
  const newApplyPosition = req.body.applyPosition;
  ApplyPosition.create(newApplyPosition, req.user.id)
    .then(() => {
      ApplyPosition.findAll()
        .then((applyPositions) => {
          res.json(applyPositions);
        })
        .catch(next);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  ApplyPosition.findAll()
    .then((applyPositions) => {
      res.json(applyPositions);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  ApplyPosition.delete(req.body.id)
    .then(() => {
      ApplyPosition.findAll()
        .then((applyPositions) => {
          res.json(applyPositions);
        })
        .catch(next);
    })
    .catch(next);
};
