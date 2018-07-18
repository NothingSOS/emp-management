const db = require('../db');

const Exam = {};

const setFormatToDB = (exam) => {
  sendChoice = [];
  sendAnswer = [];
  examCategory = (exam.examCategory).toLowerCase();
  examSubCategory = (exam.examSubCategory).toLowerCase();

  if (exam.examType === 'Write-Up') {
    sendChoice.push('-');
    sendAnswer.push('-');
  }
  else {
    exam.choices.forEach(element => {
      sendChoice.push(element.data);
      if (element.answer === true) {
        sendAnswer.push(element.data);
      }
    });
  }

  return { sendChoice: sendChoice, examCategory: examCategory, sendAnswer: sendAnswer, examType: exam.examType, examSubCategory: examSubCategory };
}

Exam.create = (exam, question) => {
  examFormatDB = setFormatToDB(exam);
  return db.one(
    'INSERT INTO exams (ex_type, ex_question, ex_choice, ex_answer, ex_category, ex_subcategory) VALUES ($1, $2, $3, $4, $5, $6) RETURNING 1',
    [examFormatDB.examType,
    question,
    examFormatDB.sendChoice,
    examFormatDB.sendAnswer,
    examFormatDB.examCategory,
    examFormatDB.examSubCategory]
  )
};

Exam.findAll = () => (
  db.manyOrNone('SELECT * FROM exams ORDER BY ex_id ASC', ['Pending'])
);

Exam.delete = id => (
  db.none('DELETE FROM exams WHERE ex_id = $1', [parseInt(id.id)])
);

Exam.edit = (exam, question) => {
  examFormatDB = setFormatToDB(exam);
  return db.none(
    'UPDATE exams SET ex_type = $1, ex_question = $2, ex_choice = $3, ex_answer = $4, ex_category = $5, ex_subcategory = $6 WHERE ex_id = $7',
    [examFormatDB.examType,
    question,
    examFormatDB.sendChoice,
    examFormatDB.sendAnswer,
    examFormatDB.examCategory,
    examFormatDB.examSubCategory,
    exam.examId]
  )
};

module.exports = Exam;