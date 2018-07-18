const Certificate = require('../models/Certificate');

exports.create = (req, res, next) => {
  const newCertificate = req.body.certificate;
  Certificate.create(newCertificate, req.user.id)
    .then((createdCertificate) => {
      res.json(createdCertificate);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editCertificate = req.body.certificate;
  Certificate.update(editCertificate, req.user.id)
    .then((updatedCertificate) => {
      res.json(updatedCertificate);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Certificate.findAll()
    .then((certificates) => {
      res.json(certificates);
    })
    .catch(next);
};
