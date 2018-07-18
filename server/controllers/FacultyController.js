const Faculty = require('../models/Faculty');

exports.create = (req, res, next) => {
  const newFaculty = req.body.faculty;
  Faculty.create(newFaculty, req.user.id)
    .then((createdFaculty) => {
      res.json(createdFaculty);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editFaculty = req.body.faculty;
  Faculty.update(editFaculty, req.user.id)
    .then((updatedFaculty) => {
      res.json(updatedFaculty);
    })
    .catch(next);
};

exports.findByUniversityId = (req, res, next) => {
  Faculty.findByUniversityId(req.body.universityId)
    .then((faculties) => {
      res.json(faculties);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Faculty.findAll()
    .then((faculties) => {
      res.json(faculties);
    })
    .catch(next);
};
