const Degree = require('../models/Degree');

exports.create = (req, res, next) => {
  const newDegree = req.body.degree;
  Degree.create(newDegree, req.user.id)
    .then((result) => {
      Degree.findById(result.id)
        .then((degree) => {
          res.json(degree);
        })
        .catch(next);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editDegree = req.body.degree;
  Degree.update(editDegree, req.user.id)
    .then((updatedDegree) => {
      res.json(updatedDegree);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Degree.findAll()
    .then((degrees) => {
      res.json(degrees);
    })
    .catch(next);
};
