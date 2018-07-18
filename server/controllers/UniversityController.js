const University = require('../models/University');

exports.create = (req, res, next) => {
  const newUniversity = req.body.university;
  University.create(newUniversity, req.user.id)
    .then((createdUniversity) => {
      res.json(createdUniversity);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editUniversity = req.body.university;
  University.update(editUniversity, req.user.id)
    .then((updatedUniversity) => {
      req.json(updatedUniversity);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  University.findAll()
    .then((universities) => {
      res.json(universities);
    })
    .catch(next);
};
