const Major = require('../models/Major');

exports.create = (req, res, next) => {
  const newMajor = req.body.major;
  Major.create(newMajor, req.user.id)
    .then((createdMajor) => {
      res.json(createdMajor);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editMajor = req.body.major;
  Major.update(editMajor, req.user.id)
    .then((updatedMajor) => {
      req.json(updatedMajor);
    })
    .catch(next);
};

exports.findByFaculyId = (req, res, next) => {
  Major.findByFacultyId(req.body.facultyId)
    .then((majors) => {
      res.json(majors);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Major.findAll()
    .then((majors) => {
      res.json(majors);
    })
    .catch(next);
};
