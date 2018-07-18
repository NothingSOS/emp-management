const db = require('../db');
const moment = require('moment');

const Holiday = {};

Holiday.create = (holiday, id) => (
  db.one(
    'INSERT INTO holidays (date, date_name, created_user, updated_user) VALUES ($1, $2, $3, $4) RETURNING 1',
    [
      holiday.date,
      holiday.dateName,
      id,
      id
    ]
  )
);

Holiday.update = (holiday, id) => (
  db.one(
    'UPDATE holidays SET date = $1, date_name = $2, updated_user = $3, updated_date = $4 WHERE id = $5',
    [
      holiday.date,
      holiday.dateName,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      holiday.id
    ]
  )
);

Holiday.findAll = () => (
  db.manyOrNone('SELECT * FROM holidays')
);

Holiday.findByYear = year => (
  db.manyOrNone('SELECT * FROM holidays WHERE EXTRACT(YEAR FROM date) = $1', [year])
);

module.exports = Holiday;
