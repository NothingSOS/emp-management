const db = require('../db');
const moment = require('moment');

const Project = {};

Project.create = (project, id) => (
  db.one(
    'INSERT INTO projects (id, name, description, customer, quotation_id, purchased_order, amount, start_date, end_date, created_user, updated_user, payment_type, working_day) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING 1',
    [
      project.id,
      project.name,
      project.description,
      project.customer,
      project.quotationId,
      project.purchasedOrder,
      project.amount,
      project.startDate,
      project.endDate,
      id,
      id,
      project.paymentType,
      project.workingDay
    ]
  )
);

Project.update = (project, id) => (
  db.one(
    'UPDATE projects SET  name = $1, description = $2, customer = $3, quotation_id = $4, purchased_order = $5, amount = $6, start_date = $7, end_date = $8, updated_user = $9, updated_date = $10, status = $11, payment_type = $12, working_day = $13 WHERE id = $14 RETURNING id',
    [
      project.name,
      project.description,
      project.customer,
      project.quotationId,
      project.purchasedOrder,
      project.amount,
      project.startDate,
      project.endDate,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      project.status,
      project.paymentType,
      project.workingDay,
      project.id
    ]
  )
);

Project.findAll = () => (
  db.manyOrNone('SELECT projects.id AS project_id, projects.name, projects.customer, projects.quotation_id, projects.purchased_order, projects.start_date, projects.end_date, projects.status  FROM projects WHERE status = $1', ['In Progress'])
);

Project.findById = id => (
  db.one('SELECT * FROM projects WHERE id = $1', [id])
);

Project.findByYear = year => (
  db.manyOrNone('SELECT * FROM projects WHERE EXTRACT(year from start_date) = $1 ORDER BY id', [year])
);

Project.findByMonthAndYear = (month, year) => (
  db.manyOrNone(`SELECT id AS project_id, * FROM projects WHERE EXTRACT(month from start_date) >= $1 AND EXTRACT(month from end_date) <= $1
    AND EXTRACT(year from start_date) = $2`, [month, year])
);

Project.findMemberProject = projectId => (
  db.manyOrNone(`SELECT employee_info.user_id, employee_work.user_id, has_projects.user_id, employee_info.first_name, 
    employee_info.last_name, employee_work.position_id, positions.id AS position_id, positions.name, has_projects.role, 
    has_projects.start_date, has_projects.end_date, has_projects.amount FROM has_projects, employee_info, employee_work, positions 
    WHERE has_projects.user_id = employee_info.user_id AND has_projects.user_id = employee_work.user_id 
    AND employee_work.position_id = positions.id  AND has_projects.project_id = $1 ORDER BY employee_info.user_id`, [projectId])
);

Project.findProjectByTimesheet = (userId, year, month) => (
  db.manyOrNone(`SELECT DISTINCT timesheets.project_id, projects.name FROM timesheets INNER JOIN projects ON
  timesheets.project_id = projects.id AND EXTRACT(year from timesheets.date) = $1 AND
  EXTRACT(month from timesheets.date) = $2 AND timesheets.user_id = $3`, [year, month, userId])
);

Project.delete = id => (
  db.none('DELETE FROM projects WHERE id = $1', [id])
);

module.exports = Project;
