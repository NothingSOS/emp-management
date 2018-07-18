const Level = require('../models/Level');

exports.create = (req, res, next) => {
  const newLevel = req.body.level;
  Level.create(newLevel, req.user.id)
    .then((createdLevel) => {
      res.json(createdLevel);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editLevel = req.body.level;
  Level.update(editLevel, req.user.id)
    .then((updatedLevel) => {
      res.json(updatedLevel);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Level.findAll()
    .then((levels) => {
      res.json(levels);
    })
    .catch(next);
};
