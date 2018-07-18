const File = require('../models/File');

exports.create = (req, res, next) => {
  const newFile = req.body.file;
  File.create(newFile, req.user.id)
    .then((createdFile) => {
      res.json(createdFile);
    })
    .catch(next);
};

exports.findByProjectId = (req, res, next) => {
  File.findByProjectId(req.body.projectId)
    .then((files) => {
      res.json(files);
    })
    .catch(next);
};
