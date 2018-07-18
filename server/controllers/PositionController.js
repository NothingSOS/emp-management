const Position = require('../models/Position');

exports.create = (req, res, next) => {
  const newPosition = req.body.position;
  Position.create(newPosition, req.user.id)
    .then((createdPosition) => {
      res.json(createdPosition);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editPosition = req.body.position;
  Position.update(editPosition, req.user.id)
    .then((updatedPosition) => {
      res.json(updatedPosition);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Position.findAll()
    .then((positions) => {
      res.json(positions);
    })
    .catch(next);
};
