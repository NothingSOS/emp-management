const db = require('../db');
// const moment = require('moment');

const HasCertificate = {};

HasCertificate.create = (hasCertificate, id) => (
  db.one(
    'INSERT INTO has_certificates (user_id, certificate_id, certificate_date, score, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 1',
    [
      hasCertificate.userId,
      hasCertificate.certificateId,
      hasCertificate.certificateDate,
      hasCertificate.score,
      id,
      id
    ]
  )
);

// HasCertificate.update = (hasCertificate, id) => (
//   db.one(
//     'UPDATE has_certificates SET certificate_id = $1, certificate_date = $2, score = $3, updated_user = $4, updated_date = $5 WHERE id = $6',
//     [
//       hasCertificate.certificateId,
//       hasCertificate.certificateDate,
//       hasCertificate.score,
//       id,
//       moment().format('YYYY-MM-DD HH:mm:ss'),
//       hasCertificate.id
//     ]
//   )
// );

HasCertificate.findByUserId = userId => (
  db.manyOrNone('SELECT has_certificates.user_id AS user_id, has_certificates.certificate_id AS certificate_id, has_certificates.certificate_date AS certificate_date, has_certificates.score AS score, has_certificates.id AS id, certificates.name AS name, certificates.institute AS institute FROM has_certificates, certificates WHERE has_certificates.certificate_id = certificates.id AND has_certificates.user_id = $1', [userId])
);

HasCertificate.delete = (id, userId) => (
  db.none('DELETE FROM has_certificates WHERE id = $1 AND user_id = $2', [id, userId])
);

module.exports = HasCertificate;
