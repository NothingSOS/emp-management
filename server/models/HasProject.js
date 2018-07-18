const db = require('../db');
const moment = require('moment');

const HasProject = {};

HasProject.create = (hasProject, id) => (
  db.one(
    'INSERT INTO has_projects (user_id, project_id, role, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING 1',
    [
      hasProject.userId,
      hasProject.projectId,
      hasProject.role,
      id,
      id
    ]
  )
);

HasProject.update = (hasProject, id) => (
  db.one(
    'UPDATE has_projects SET role = $1, updated_user = $2, updated_date = $3 WHERE id = $4',
    [
      hasProject.role,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      hasProject.id
    ]
  )
);

HasProject.findByUserId = userId => (
  db.manyOrNone('SELECT * FROM has_projects WHERE user_id = $1', [userId])
);

HasProject.findByProjectIdAndUserId = (projectId, userId) => (
  db.one('SELECT * FROM has_projects WHERE project_id = $1 AND user_id = $2', [projectId, userId])
);

module.exports = HasProject;
