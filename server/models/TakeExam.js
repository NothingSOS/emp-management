const db = require('../db');
const moment = require('moment');

const TakeExam = {};

TakeExam.fetchAllExam = () => (
  db.many('SELECT * from exams')
);

TakeExam.fetchEPRList = id => (
  db.manyOrNone('SELECT'
    + ' epr_ex_category as category'
    + ', epr_ex_subcategory as subcategory'
    + ', epr_ex_type as type'
    + ', epr_requirednumber as required_number'
    + ' FROM recruitments r'
    + ' JOIN exams_position_required epr'
    + ' ON epr.epr_position = ANY( r.position )'
    + ' WHERE r.citizen_id = $1', [id])
);

TakeExam.fetchExamId = () => (
  db.manyOrNone('SELECT'
    + ' ex_category as category'
    + ', ex_subcategory as subcategory'
    + ', ex_type as type'
    + ', ARRAY_AGG( ex_id ) as ex_id_list'
    + ' FROM exams'
    + ' GROUP BY ex_category, ex_subcategory, ex_type'
    + ' ORDER BY ex_category, ex_subcategory, ex_type')
);

TakeExam.fetchRandomExIdList = (id, testDate) => (
  db.oneOrNone('SELECT random_ex_id_list FROM exam_users WHERE id = $1 AND test_date = $2', [id, testDate])
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

TakeExam.fetchCandidateAnswer = (id, testDate) => (
  db.manyOrNone('SELECT * FROM exam_candidate_submitted WHERE id = $1 AND test_date = $2', [id, testDate])
);

TakeExam.uploadResult = resultList => (
  db.tx((t) => {
    const queryList = [];
    Object(resultList).map((eachObject) => {
      const aquery = t.none(
        ' INSERT INTO exam_result (cd_id, ex_id, test_date, cd_answer, point, status)'
        + ' VALUES ($1, $2, $3, $4, $5, $6)'
        + ' ON CONFLICT (cd_id, ex_id, test_date)'
        + ' DO UPDATE SET cd_answer = $4, point = $5, status = $6',
        [
          eachObject.cd_id,
          eachObject.ex_id,
          eachObject.test_date,
          // eachObject.ex_question,
          // eachObject.ex_choices,
          // eachObject.ex_type,
          eachObject.cd_answer,
          eachObject.point,
          eachObject.status,
          // eachObject.ex_correct
        ]
      );
      queryList.push(aquery);
    });
    return t.batch(queryList);
  })
);

TakeExam.createBufferAnswer = (id, answerList, testDate, startTime) => (
  db.oneOrNone(
    'INSERT INTO exam_candidate_submitted (id, answer_list, test_date, start_time) VALUES ($1, $2, $3, $4)',
    [id, answerList, testDate, moment(startTime).format('YYYY-MM-DD HH:mm:ss')]
  )
);

TakeExam.findUploadedAnswer = (id, type, testDate) => {
  // this 2 query do similar thing in same table
  // their difference is only return value type
  // so write it together or wait for reason to
  if (type === 'existing check') {
    return db.oneOrNone('SELECT 1 FROM exam_candidate_submitted WHERE id = $1 AND test_date = $2', [id, testDate]);
  }
  else if (type === 'progress check') {
    return db.oneOrNone('SELECT * FROM exam_candidate_submitted WHERE id = $1 AND test_date = $2', [id, testDate]);
  }
  return null;
};

TakeExam.updateAnswer = (id, answerList, submittedTime, testDate) => (
  db.oneOrNone('UPDATE exam_candidate_submitted SET (answer_list, submitted_time) = ($2, $3)'
    + ' WHERE id = $1 AND test_date = $4', [id, answerList, submittedTime, testDate])
);

TakeExam.updateSubmittedTime = (id, time, testDate) => (
  db.oneOrNone('UPDATE exam_candidate_submitted SET submitted_time = $2 WHERE id = $1 AND test_date = $3', [id, moment(time).format('YYYY-MM-DD HH:mm:ss'), testDate])
);

TakeExam.changeStatus = (id, status) => (
  db.oneOrNone('UPDATE recruitments SET status = $2 WHERE citizen_id =$1', [id, status])
);

TakeExam.expiredActivationLifetime = id => (
  db.oneOrNone('UPDATE exam_users SET activation_lifetimes = 0 WHERE id = $1', [id])
);

TakeExam.getName = (id, current) => (
  db.oneOrNone('SELECT first_name, last_name FROM recruitments WHERE citizen_id = $1 AND appointment = $2', [id, current])
);

module.exports = TakeExam;
