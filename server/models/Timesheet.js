const db = require('../db');
const moment = require('moment');

const Timesheet = {};

Timesheet.create = (timesheet, id) => (
  db.none(
    `INSERT INTO timesheets (user_id, date, project_id, time_in, time_out, totalhours, created_user, updated_user, task, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (user_id, date, project_id, time_in) DO UPDATE
      SET project_id = $3, time_in = $4, time_out = $5, totalhours = $6, updated_user = $8, task = $9, description = $10`,
    [
      timesheet.userId,
      timesheet.date,
      timesheet.projectId,
      timesheet.timeIn,
      timesheet.timeOut,
      timesheet.totalhours,
      id,
      id,
      timesheet.task,
      timesheet.description
    ]
  )
);

Timesheet.update = (timesheet, id) => (
  db.none(
    'UPDATE timesheets SET project_id = $1, time_in = $2, time_out = $3, totalhours = $4, updated_user = $5, updated_date = $6, task = $7, description = $8 WHERE id = $9',
    [
      timesheet.projectId,
      timesheet.timeIn,
      timesheet.timeOut,
      timesheet.totalhours,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      timesheet.task,
      timesheet.description,
      timesheet.id,
    ]
  )
);

Timesheet.findByUserId = userId => (
  db.manyOrNone('SELECT * FROM timesheets WHERE user_id = $1', [userId])
);

Timesheet.findTimesheetInProject = (year, month, projectId, userId) => (
  db.manyOrNone('SELECT * FROM timesheets WHERE extract(year from date) = $1 AND extract(month from date) = $2 AND project_id = $3 AND user_id = $4', [year, month, projectId, userId])
);

Timesheet.findSummaryTimesheet = year => (
  db.manyOrNone(`SELECT users.id, CONCAT(employee_info.first_name, ' ', employee_info.last_name) as name,
  timesheets.project_id, EXTRACT(MONTH FROM timesheets.date) as month, SUM(timesheets.totalhours) / $1 as days
  FROM users INNER JOIN timesheets ON users.id = timesheets.user_id INNER JOIN employee_info
  ON users.id = employee_info.user_id
  WHERE EXTRACT(year from timesheets.date) = $2
  GROUP BY users.id, timesheets.project_id, month, name
  ORDER BY users.id, timesheets.project_id, month`, [8, year])
);

Timesheet.findById = id => (
  db.oneOrNone('SELECT * FROM timesheets WHERE id = $1', [id])
);

Timesheet.findSummaryTimesheetInMonth = (projectId, year, month) => (
  db.manyOrNone(`SELECT timesheets.user_id as user_id, CONCAT(employee_info.first_name, ' ', employee_info.last_name) AS name, 
  SUM(timesheets.totalhours) / $1 AS days, has_projects.amount AS amount FROM timesheets 
  INNER JOIN employee_info ON timesheets.user_id = employee_info.user_id
  INNER JOIN has_projects ON has_projects.user_id = timesheets.user_id AND has_projects.project_id = $4
  WHERE EXTRACT(year from timesheets.date) = $2 AND EXTRACT(month from date) = $3 AND timesheets.project_id = $4 
  GROUP BY timesheets.user_id, timesheets.project_id, name, amount`, [8, year, month, projectId])
);

Timesheet.findByMonthAndYear = (month, year, userId) => (
  db.manyOrNone(`SELECT timesheets.id, timesheets.project_id, projects.name, timesheets.date,
  timesheets.time_in, timesheets.time_out, timesheets.task, timesheets.description, timesheets.totalhours
  FROM timesheets INNER JOIN projects ON timesheets.project_id = projects.id
  WHERE EXTRACT(month from timesheets.date) = $1 AND EXTRACT(year from timesheets.date) = $2
  AND timesheets.user_id = $3 ORDER BY timesheets.date, timesheets.time_in`, [month, year, userId])
);

Timesheet.delete = id => (
  db.none('DELETE FROM timesheets WHERE id = $1', [id])
);

module.exports = Timesheet;
