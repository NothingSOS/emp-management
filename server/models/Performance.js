const db = require('../db/');
const moment = require('moment');

const Performance = {};

Performance.checkStatus = (performanceInfo,id) => (
  db.one("SELECT em_sign_date as can_edit FROM Performance WHERE id=$1", [performanceInfo.performanceId])
)

Performance.checkExist = (id) => (
  db.manyOrNone("SELECT extract(year from created_date) as year, sup_sign_date ,md_sign_date FROM Performance WHERE user_id=$1 ORDER BY created_date DESC",[id])
)

Performance.findById = (id,year) => (
  db.oneOrNone("SELECT * FROM Performance WHERE user_id=$1 AND extract(year from created_date)=$2",[id,year])
)

Performance.insertPerformance = (performanceInfo,id) =>(
  db.one("INSERT INTO Performance (user_id,score,expected_score,sup_comment,em_sign_date,sup_sign_date,md_sign_date,created_user,updated_user,level_id,em_sign_name, sup_sign_name, md_sign_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING 1",
  [
    performanceInfo.employeeID,
    performanceInfo.score,
    performanceInfo.expectedScore,
    performanceInfo.supervisorComment,
    performanceInfo.employeeSignDate,
    performanceInfo.supervisorSignDate,
    performanceInfo.MDSignDate,
    id,
    id,
    performanceInfo.level,
    performanceInfo.employeeSignName,
    performanceInfo.supervisorSignName,
    performanceInfo.MDSignName
  ])
)

Performance.updatePerformance = (performanceInfo,id) =>(
  db.none(
    "UPDATE Performance SET score=$1, expected_score=$2, sup_comment=$3, em_sign_date=$4, sup_sign_date=$5, md_sign_date=$6, em_sign_name=$7, sup_sign_name=$8, md_sign_name=$9, updated_user=$10, updated_date=$11 WHERE user_id=$12 and id=$13",
    [
      performanceInfo.score,
      performanceInfo.expectedScore,
      performanceInfo.supervisorComment,
      performanceInfo.employeeSignDate,
      performanceInfo.supervisorSignDate,
      performanceInfo.MDSignDate,
      performanceInfo.employeeSignName,
      performanceInfo.supervisorSignName,
      performanceInfo.MDSignName,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      performanceInfo.employeeID,
      performanceInfo.performanceId
    ])
)

Performance.empSignPerformance = (performanceInfo, id) => (
  db.none(
    "UPDATE Performance SET em_sign_date=$1, em_sign_name=$2, updated_user=$3, updated_date=$4 WHERE user_id=$5 AND id=$6",
    [
      performanceInfo.employeeSignDate,
      performanceInfo.employeeSignName,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      performanceInfo.employeeID,
      performanceInfo.performanceId
    ]
  )
)

module.exports = Performance;
