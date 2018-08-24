const db = require('../db');
const moment = require('moment');

const SelfAssessment={};

SelfAssessment.checkExist = (id) => (
  db.oneOrNone("SELECT submited as submited FROM SelfAssessment WHERE user_id=$1",[id])
)

SelfAssessment.findById = (id) => (
  db.oneOrNone("SELECT * FROM SelfAssessment WHERE user_id=$1",[id])
)

SelfAssessment.insertSelfAssessment = (selfAssessmentInfo,id) => (
  db.one("INSERT INTO SelfAssessment (user_id, level_id, responsibilities, accomplishments, activities, strengths, improvements, goal_1, goal_2 ,goal_3, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING 1",
  [
    selfAssessmentInfo.employeeID,
    selfAssessmentInfo.level,
    selfAssessmentInfo.majorResponsibilities,
    selfAssessmentInfo.significantAccomplishments,
    selfAssessmentInfo.contribution,
    selfAssessmentInfo.strengths,
    selfAssessmentInfo.improvements,
    selfAssessmentInfo.goal1,
    selfAssessmentInfo.goal2,
    selfAssessmentInfo.goal3,
    id,
    id
  ])
)

SelfAssessment.updateSelfAssessment = (selfAssessmentInfo,id) => (
  db.none("UPDATE SelfAssessment SET responsibilities=$1, accomplishments=$2, activities=$3, strengths=$4, improvements=$5, goal_1=$6, goal_2=$7, goal_3=$8, updated_user=$9, updated_date=$10 WHERE user_id=$11",
  [
    selfAssessmentInfo.majorResponsibilities,
    selfAssessmentInfo.significantAccomplishments,
    selfAssessmentInfo.contribution,
    selfAssessmentInfo.strengths,
    selfAssessmentInfo.improvements,
    selfAssessmentInfo.goal1,
    selfAssessmentInfo.goal2,
    selfAssessmentInfo.goal3,
    id,
    moment().format('YYYY-MM-DD HH:mm:ss'),
    selfAssessmentInfo.employeeID
  ])
)

SelfAssessment.submitSelfAssessment = (id) => (
  db.none("UPDATE SelfAssessment SET submited=$1 WHERE user_id=$2",
  [
    true,
    id
  ])
)

module.exports = SelfAssessment;
