const AccessControl = require('../models/AccessControl');

exports.create = (req, res, next) => {
  const newAccessControl = req.body.accessControl;
  AccessControl.create(newAccessControl, req.user.id)
    .then((createdAccessControl) => {
      res.json(createdAccessControl);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  AccessControl.findAll()
    .then((accessControls) => {
      res.json(accessControls);
    })
    .catch(next);
};
