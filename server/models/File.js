const db = require('../db');

const File = {};

File.create = (file, id) => (
  db.one(
    'INSERT INTO files (name, project_id, created_user, updated_user) VALUES ($1, $2, $3, $4) RETURNING 1',
    [
      file.name,
      file.projectId,
      id,
      id
    ]
  )
);

File.findByProjectId = projectId => (
  db.manyOrNone('SELECT * FROM files WHERE project_id = $1', [projectId])
);

module.exports = File;
