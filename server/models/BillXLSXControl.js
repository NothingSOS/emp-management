const db = require('../db');
const moment = require('moment');

const xlsx = {};

xlsx.findAll = userid => (
  db.oneOrNone('SELECT * FROM billrecord WHERE id=$1', [userid])
);
xlsx.findBillData = rec_id => (
  db.manyOrNone('SELECT * FROM billdata WHERE bill_record_id=$1', [rec_id])
);
xlsx.findUser = userid => (
  db.oneOrNone('SELECT i.*,p.* FROM employee_info as i, employee_work as w, positions as p WHERE p.id=w.position_id AND w.user_id=i.user_id AND i.user_id=$1 ', [userid])
);

module.exports = xlsx;
