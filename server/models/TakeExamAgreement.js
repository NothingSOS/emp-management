const db = require('../db');

const TakeExamAgreement = {};

TakeExamAgreement.acceptAgreement = (id, testdate) => (
  db.none('UPDATE exam_users SET agreement_status = \'Read\' WHERE "id" = $1 AND test_date = $2', [id, testdate])
);

module.exports = TakeExamAgreement;
