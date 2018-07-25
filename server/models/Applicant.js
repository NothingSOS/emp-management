const db = require('../db');
const moment = require('moment');
// const moment = require('moment');

// utility function to shuffle array
const shuffle = (a) => {
  for (let i = a.length - 1; i >= 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Applicant = {};

Applicant.create = applicant => (
  db.one(
    'INSERT INTO applicants (first_name, last_name, position, mobile_number, email, first_name_th, last_name_th, citizen_id, status, registration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING row_id',
    [
      applicant.firstName,
      applicant.lastName,
      applicant.position,
      applicant.mobileNumber,
      applicant.email,
      applicant.firstNameTH,
      applicant.lastNameTH,
      applicant.citizenID,
      'Apply',
      applicant.registrationDate,
    ]
  )
  // edit here
);

Applicant.findAll = () => (
  db.manyOrNone('SELECT * FROM applicants')
);

Applicant.updateStatus = applicant => (
  db.none(
    `UPDATE applicants
    SET
    status = $1
    WHERE row_id = $2`,
    [
      applicant.status,
      applicant.rowId,
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateInterviewDateTime = applicant => (
  db.none(
    `UPDATE applicants
    SET
    interview_date = $1, interview_time = $2
    WHERE  row_id = $3`,
    [
      applicant.date,
      applicant.time,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateSignDateTime = applicant => (
  db.none(
    `UPDATE applicants
    SET
    sign_date = $1, sign_time = $2
    WHERE row_id = $3`,
    [
      applicant.date,
      applicant.time,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateFirstDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    first_date = $1
    WHERE row_id = $2`,
    [
      applicant.date,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateRejectDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    reject_date = $1
    WHERE row_id = $2`,
    [
      applicant.date,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateCancelDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    cancel_date = $1
    WHERE row_id = $2`,
    [
      applicant.date,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateBlacklistDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    blacklist_date = $1
    WHERE row_id = $2`,
    [
      applicant.date,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateSignedPosition = applicant => (
  db.none(
    `UPDATE applicants
    SET
    signed_position = $1
    WHERE row_id = $2`,
    [
      applicant.signedPosition,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateExamDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    exam_date = $1, exam_time = $2
    WHERE row_id = $3`,
    [
      applicant.date,
      applicant.time,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateNote = applicant => (
  db.none(
    `UPDATE applicants
    SET
    note = $1
    WHERE row_id = $2`,
    [
      applicant.note,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateInterviewResult = applicant => (
  db.none(
    `UPDATE applicants
    SET
    interview_result = $1
    WHERE row_id = $2`,
    [
      applicant.interviewResult,
      applicant.rowId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.findInfoById = rowId => (
  db.oneOrNone('SELECT * FROM applicants WHERE row_id = $1', [rowId])
);

Applicant.findFileById = rowId => (
  db.manyOrNone('SELECT * FROM applicants_files WHERE row_id = $1', [rowId])
);

Applicant.upload = (path, name, citizenId, type, rowId) => (
  db.none('INSERT INTO applicants_files (citizen_id, file_path, file_name, type, row_id) VALUES ($1, $2, $3, $4,$5);', [citizenId, path, name, type, rowId])
);

Applicant.getPosition = () => (
  db.manyOrNone('SELECT name FROM positions WHERE status = $1', ['Active'])
);

Applicant.getExamUser = (id, testDate) => (
  db.none(
    'INSERT INTO exam_users (id, test_date, latest_activated_time, activation_lifetimes, agreement_status) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id, test_date) DO NOTHING'
    , [id, testDate, null, 0, 'NotRead']
  )
    .then(() => db.one('SELECT * FROM exam_users WHERE id = $1 AND test_date = $2', [id, testDate]))
);

// (find required number of each exam).then((get exam id for each required category).then(get random examId and update exam_users table))
Applicant.getAndUpdateRequiredExam = (rowId, testDate, lifetime) => (
  db.manyOrNone('SELECT'
    + ' epr_ex_category as category'
    + ', epr_ex_subcategory as subcategory'
    + ', epr_ex_type as type'
    + ', epr_requirednumber as required_number'
    + ' FROM applicants a'
    + ' JOIN exams_position_required epr'
    + ' ON epr.epr_position = ANY( a.position )'
    + ' WHERE a.row_id = $1', [rowId])
    .then((result) => {
      // need to have data for each position first! (It's not handle the position that not have exam required list)
      let getExamIdCommand = 'SELECT ex_category as category, ex_subcategory as subcategory, ex_type as type, ARRAY_AGG( ex_id ) as ex_id_list FROM exams';

      getExamIdCommand += ` WHERE (exams.ex_category = '${result[0].category.toLowerCase()}' AND exams.ex_subcategory = '${result[0].subcategory.toLowerCase()}' AND exams.ex_type = '${result[0].type}')`;
      for (let i = 1; i < result.length; i += 1) {
        getExamIdCommand += ` OR (exams.ex_category = '${result[i].category.toLowerCase()}' AND exams.ex_subcategory = '${result[i].subcategory.toLowerCase()}' AND exams.ex_type = '${result[i].type}')`;
      }

      getExamIdCommand += 'GROUP BY ex_category, ex_subcategory, ex_type ORDER BY ex_category, ex_subcategory, ex_type';
      return db.manyOrNone(getExamIdCommand).then((examIdList) => {
        let allRandomIdList = [];
        for (let i = 0; i < examIdList.length; i += 1) {
          for (let j = 0; j < result.length; j += 1) {
            if (examIdList[i].category.toLowerCase() === result[j].category.toLowerCase()
              && examIdList[i].subcategory.toLowerCase() === result[j].subcategory.toLowerCase()) {
              const eachRandomIdList = (shuffle(examIdList[i].exIdList.slice())).slice(0, result[j].requiredNumber);
              allRandomIdList = allRandomIdList.concat(eachRandomIdList);
              break;
            }
          }
        }
        return db.none(
          'UPDATE exam_users SET latest_activated_time = $1, activation_lifetimes = $2, random_ex_id_list = $3 WHERE row_id = $4 AND test_date = $5'
          , [moment().format('YYYY-MM-DD HH:mm:ss'), lifetime, allRandomIdList, rowId, testDate]
        );
      });
    })
);

Applicant.updateTestStatus = (rowId, registerDate, testStatus) => (
  db.none(
    'UPDATE applicants SET test_status = $1 WHERE row_id = $2'
    , [testStatus, rowId]
  )

);

Applicant.getTestStatus = rowId => (
  db.oneOrNone(
    'SELECT test_status FROM applicants WHERE row_id = $1 '
    , [rowId]
  )

);

Applicant.changeInterviewDone = rowId => (
  db.none(
    'UPDATE applicants SET interview_done = $1 WHERE row_id = $2'
    , [true, rowId]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.changeStatus = (id, status) => (
  db.none('UPDATE applicants SET test_status = $2 WHERE citizen_id = $1', [id, status])
);

Applicant.getExamDate = citizenId => (
  db.oneOrNone('SELECT exam_date FROM applicants WHERE citizen_id = $1', citizenId)
);

// Recruitment : View Result part
// 456 refactor
// exCorrect , exAnswer for more clear-&-clean-ness
// maybe ex_choices or ex_choice too
Applicant.fetchGradingExam = rowId => (
  db.manyOrNone(
    'SELECT'
    + ' exam_result.cd_id AS cd_id,'
    + ' exam_result.ex_id AS ex_id,'
    + ' exam_result.test_date AS test_date,'
    + ' exam_result.cd_answer AS cd_answer,'
    + ' exam_result.point AS point,'
    + ' exam_result.status AS status,'
    + ' exam_result.comment AS comment,'
    + ' exams.ex_type AS ex_type,'
    + ' exams.ex_choice AS ex_choices,'
    + ' exams.ex_answer AS ex_correct,'
    + ' exams.ex_question AS ex_question,'
    + ' exams.ex_category AS ex_category,'
    + ' exams.ex_subcategory AS ex_sub_category,'
    + ' ARRAY_LENGTH(exams.ex_answer, 1) AS ex_answer_length'
    + ' FROM exam_result, exams'
    + ' WHERE exam_result.ex_id = exams.ex_id'
    + ' AND exam_result.row_id = $1',
    [rowId]
  )
);

module.exports = Applicant;
