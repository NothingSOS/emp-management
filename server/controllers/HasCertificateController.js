const HasCertificate = require('../models/HasCertificate');

exports.create = (req, res, next) => {
  const newHasCertificate = req.body.hasCertificate;
  HasCertificate.create(newHasCertificate, req.user.id)
    .then(() => {
      HasCertificate.findByUserId(req.user.id)
        .then((hasCertificates) => {
          res.json(hasCertificates);
        });
    })
    .catch(next);
};

// exports.update = (req, res, next) => {
//   const editHasCertificate = req.body.hasCertificate;
//   HasCertificate.update(editHasCertificate, req.user.id)
//     .then(() => {
//       HasCertificate.findByUserId(req.user.id)
//         .then((hasCertificates) => {
//           res.json(hasCertificates);
//         });
//     })
//     .catch(next);
// };

exports.findByUserId = (req, res, next) => {
  HasCertificate.findByUserId(req.query.id)
    .then((hasCertificates) => {
      res.json(hasCertificates);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  HasCertificate.delete(req.body.id, req.user.id)
    .then(() => {
      HasCertificate.findByUserId(req.user.id)
        .then((hasCertificates) => {
          res.json(hasCertificates);
        })
        .catch(next);
    })
    .catch(next);
};
