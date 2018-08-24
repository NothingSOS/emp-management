const db = require('../db');
const moment = require('moment');

const HasProject = {};

HasProject.create = (hasProject, id) => (
  db.none(
    'INSERT INTO has_projects (user_id, project_id, role, created_user, updated_user, start_date, end_date, amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      hasProject.userId,
      hasProject.projectId,
      hasProject.role,
      id,
      id,
      hasProject.startDate,
      hasProject.endDate,
      hasProject.amount
    ]
  )
);

HasProject.update = (hasProject, id) => (
  db.one(
    'UPDATE has_projects SET role = $1, updated_user = $2, updated_date = $3, start_date  = $4, end_date = $5, amount = $6 WHERE id = $7',
    [
      hasProject.role,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      hasProject.startDate,
      hasProject.endDate,
      hasProject.amount,
      hasProject.id
    ]
  )
);

HasProject.findByUserId = userId => (
  db.manyOrNone('SELECT projects.name AS name, projects.customer, projects.quotation_id, projects.purchased_order, projects.status, has_projects.* FROM has_projects INNER JOIN projects ON has_projects.project_id = projects.id WHERE user_id = $1', [userId])
);

HasProject.findByProjectIdAndUserId = (projectId, userId) => (
  db.one('SELECT * FROM has_projects WHERE project_id = $1 AND user_id = $2', [projectId, userId])
);

HasProject.findByUserIdAndYear = (userId, year) => (
  db.manyOrNone('SELECT * FROM has_projects WHERE user_id = $1 AND extract(year from start_date) = $2', [userId, year])
);

HasProject.delete = (userId, projectId) => (
  db.none('DELETE FROM has_projects WHERE user_id = $1 AND project_id = $2', [userId, projectId])
);

HasProject.findWorkProjectDate = (year, month, userId) => (
  db.manyOrNone(`SELECT users.id, CONCAT(employee_info.first_name, ' ', employee_info.last_name) AS name, employee_info.nick_name,
    positions.name AS position_name, has_projects.project_id, projects.start_date, projects.end_date
    FROM users INNER JOIN employee_info ON users.id = employee_info.user_id
    INNER JOIN employee_work ON users.id = employee_work.user_id
    LEFT OUTER JOIN positions ON employee_work.position_id = positions.id
    LEFT OUTER JOIN has_projects ON users.id = has_projects.user_id
    LEFT OUTER JOIN projects ON has_projects.project_id = projects.id AND
    EXTRACT(year from projects.end_date) = $1 AND EXTRACT(month from projects.end_date) >= $2
    WHERE users.id = $3 ORDER BY projects.start_date, projects.end_date`, [year, month, userId])
);

HasProject.findByProjectIdAndUserId = (projectId, userId) => (
  db.one('SELECT * FROM has_projects WHERE project_id = $1 AND user_id = $2', [projectId, userId])
);

module.exports = HasProject;
