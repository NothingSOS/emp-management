const db = require('../db');
const moment = require('moment');

const TakeExam = {};

TakeExam.fetchAllExam = () => (
  db.many('SELECT * from exams')
);

TakeExam.fetchRandomExIdList = rowId => (
  db.oneOrNone('SELECT random_ex_id_list FROM exam_users WHERE row_id = $1', [rowId])
);

TakeExam.fetchExamSpecifyId = idList => (
  db.manyOrNone('SELECT'
    + ' ex_id'
    + ', ex_category'
    + ', ex_subcategory'
    + ', ex_type'
    + ', ex_question'
    + ', ex_choice'
    + ', ARRAY_LENGTH(ex_answer, 1) as ex_answer_length'
    + ' FROM exams WHERE ex_id = ANY ($1)', [idList])
);

TakeExam.fetchSolutionSpecifyId = idList => (
  db.manyOrNone('SELECT'
    + ' ex_id'
    + ', ex_category'
    + ', ex_subcategory'
    + ', ex_type'
    + ', ex_question'
    + ', ex_choice'
    + ', ex_answer'
    + ', ARRAY_LENGTH(ex_answer, 1) as ex_answer_length'
    + ' FROM exams WHERE ex_id = ANY ($1)', [idList])
);

TakeExam.fetchCandidateAnswer = rowId => (
  db.manyOrNone('SELECT * FROM exam_candidate_submitted WHERE row_id = $1', [rowId])
);

TakeExam.uploadResult = resultList => (
  db.tx((t) => {
    const queryList = [];
    Object(resultList).map((eachObject) => {
      const aquery = t.none(
        ' INSERT INTO exam_result (cd_id, ex_id, test_date, cd_answer, point, status, row_id)'
        + ' VALUES ($1, $2, $3, $4, $5, $6, $7)'
        + ' ON CONFLICT (cd_id, ex_id, test_date)'
        + ' DO UPDATE SET cd_answer = $4, point = $5, status = $6, row_id = $7',
        [
          eachObject.cd_id,
          eachObject.ex_id,
          eachObject.test_date,
          eachObject.cd_answer,
          eachObject.point,
          eachObject.status,
          eachObject.rowId,
        ]
      );
      queryList.push(aquery);
      return null;
    });
    return t.batch(queryList);
  })
);

TakeExam.createBufferAnswer = (id, answerList, testDate, startTime, rowId) => (
  db.none(
    'INSERT INTO exam_candidate_submitted (id, answer_list, test_date, start_time, row_id) VALUES ($1, $2, $3, $4, $5)'
    + ' ON CONFLICT (id, test_date) DO NOTHING',
    [id, answerList, testDate, moment(startTime).format('YYYY-MM-DD HH:mm:ss'), rowId]
  )
    .then()
);

TakeExam.findUploadedAnswer = (rowId, type) => {
  if (type === 'existing check') {
    return db.oneOrNone('SELECT 1 as is_exist FROM exam_candidate_submitted WHERE row_id = $1', [rowId]);
  }
  else if (type === 'progress check') {
    return db.oneOrNone('SELECT * FROM exam_candidate_submitted WHERE row_id = $1', [rowId]);
  }
  return null;
};

TakeExam.updateAnswer = (rowId, answerList, submittedTime) => (
  db.oneOrNone('UPDATE exam_candidate_submitted SET (answer_list, submitted_time) = ($2, $3)'
    + ' WHERE row_id = $1', [rowId, answerList, submittedTime])
);

TakeExam.updateSubmittedTime = (rowId, time) => (
  db.none('UPDATE exam_candidate_submitted SET submitted_time = $2 WHERE row_id = $1', [rowId, moment(time).format('YYYY-MM-DD HH:mm:ss')])
);

TakeExam.changeStatus = (rowId, status) => (
  db.none('UPDATE applicants SET test_status = $2 WHERE row_id =$1', [rowId, status])
);

TakeExam.expiredActivationLifetime = rowId => (
  db.none('UPDATE exam_users SET activation_lifetimes = 0 WHERE row_id = $1', [rowId])
);

TakeExam.getName = (id, current) => (
  db.oneOrNone('SELECT first_name, last_name FROM applicants WHERE citizen_id = $1 AND exam_date = $2', [id, current])
);

TakeExam.getRowId = (id, testDate) => (
  db.oneOrNone('SELECT row_id FROM applicants WHERE citizen_id = $1 AND exam_date = $2', [id, testDate])
);

module.exports = TakeExam;
