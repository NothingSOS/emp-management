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
    'UPDATE projects SET id = $1, name = $2, description = $3, customer = $4, quotation_id = $5, purchased_order = $6, amount = $7, start_date = $8, end_date = $9, updated_user = $10, updated_date = $11, status = $12, payment_type = $13, working_day = $14 WHERE id = $15',
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
      moment().format('YYYY-MM-DD HH:mm:ss'),
      project.status,
      project.paymentType,
      project.workingDay,
      project.id
    ]
  )
);

Project.findAll = () => (
  db.manyOrNone('SELECT projects.id, projects.name, projects.customer, projects.quotation_id, projects.start_date, projects.end_date, projects.status  FROM projects WHERE status = $1', ['In Progress'])
);

Project.findById = id => (
  db.one('SELECT * FROM projects WHERE id = $1', [id])
);

Project.findMemberProject = id => (
  db.manyOrNone('SELECT has_projects.user_id, employee_info.first_name, employee_info.last_name, employee_work.position_id, positions.id, positions.name, has_projects.role FROM has_projects, employee_info, employee_work, positions WHERE has_projects.user_id = employee_info.user_id AND has_projects.user_id = employee_work.user_id AND employee_work.position_id = positions.id  AND has_projects.project_id = $1', [id])
);

module.exports = Project;
