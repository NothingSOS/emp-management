const db = require('../db/');
const mail = require('../mail');
const moment = require('moment');

const Probation = {};

Probation.checkStatus = (probationInfo,id) => (
  db.one("SELECT em_sign_date as can_edit FROM Probation WHERE id=$1", [probationInfo.proId])
)

Probation.checkExist = (id) => (
  db.manyOrNone("SELECT id, pass_pro, continued, continued_date,sup_sign_date, md_sign_date FROM Probation WHERE user_id=$1 ORDER BY id DESC", [id])
)

Probation.findProById = (id, proId) => (
  db.oneOrNone("SELECT * FROM Probation WHERE user_id=$1 AND id=$2", [id, proId])
)

Probation.insertProbation = (probationInfo, id) => (
  db.one("INSERT INTO Probation (user_id,pass_pro_date,based_salary,mobile,transporation_allowance,other_allowance,pass_pro,confirmed_by_employment,sup_comment,em_sign_date,sup_sign_date,md_sign_date,continued,score,expected_score,created_user,updated_user,terminated_date,continued_date,level_id,em_sign_name, sup_sign_name, md_sign_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 , $15 , $16 , $17, $18, $19, $20, $21, $22, $23) RETURNING 1",
    [
      probationInfo.employeeID,
      probationInfo.endProbationDate,
      probationInfo.basedSalary,
      probationInfo.mobile,
      probationInfo.transporationAllowance,
      probationInfo.otherAllowance,
      probationInfo.passPro,
      probationInfo.confirmed,
      probationInfo.supervisorComment,
      probationInfo.employeeSignDate,
      probationInfo.supervisorSignDate,
      probationInfo.MDSignDate,
      probationInfo.continued,
      probationInfo.score,
      probationInfo.expectedScore,
      id,
      id,
      probationInfo.terminationDate,
      probationInfo.continuedDate,
      probationInfo.level,
      probationInfo.employeeSignName,
      probationInfo.supervisorSignName,
      probationInfo.MDSignName,
    ])
)

Probation.updateProbation = (probationInfo, id) => (
  db.none(
    "UPDATE Probation SET pass_pro_date=$1, based_salary=$2, mobile=$3, transporation_allowance=$4, other_allowance=$5, pass_pro=$6, confirmed_by_employment=$7, sup_comment=$8, em_sign_date=$9, sup_sign_date=$10, md_sign_date=$11, continued=$12, score=$13, expected_score=$14, updated_user=$15, terminated_date=$16, continued_date=$17, em_sign_name=$18, sup_sign_name=$19, md_sign_name=$20, updated_date=$21 WHERE user_id=$22 AND id=$23",
    [
      probationInfo.endProbationDate,
      probationInfo.basedSalary,
      probationInfo.mobile,
      probationInfo.transporationAllowance,
      probationInfo.otherAllowance,
      probationInfo.passPro,
      probationInfo.confirmed,
      probationInfo.supervisorComment,
      probationInfo.employeeSignDate,
      probationInfo.supervisorSignDate,
      probationInfo.MDSignDate,
      probationInfo.continued,
      probationInfo.score,
      probationInfo.expectedScore,
      id,
      probationInfo.terminationDate,
      probationInfo.continuedDate,
      probationInfo.employeeSignName,
      probationInfo.supervisorSignName,
      probationInfo.MDSignName,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      probationInfo.employeeID,
      probationInfo.proId
    ])
)

Probation.empSignProbation = (probationInfo, id) => (
  db.none(
    "UPDATE Probation SET em_sign_date=$1, em_sign_name=$2, updated_user=$3, updated_date=$4 WHERE user_id=$5 AND id=$6",
    [
      probationInfo.employeeSignDate,
      probationInfo.employeeSignName,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      probationInfo.employeeID,
      probationInfo.proId
    ]
  )
)
module.exports = Probation;
