const HasProject = require('../models/HasProject');

exports.create = (req, res, next) => {
  const newHasProject = req.body.hasProject;
  HasProject.create(newHasProject, req.user.id)
    .then((createdHasProject) => {
      res.json(createdHasProject);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editHasProject = req.body.hasProject;
  HasProject.update(editHasProject, req.user.id)
    .then((updatedHasProject) => {
      req.json(updatedHasProject);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  HasProject.findByUserId(req.query.id)
    .then((hasProjects) => {
      res.json(hasProjects);
    })
    .catch(next);
};
