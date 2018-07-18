const Exam = require('../models/Exam');

exports.create = (req, res, next) => {
  Exam.create(req.body.exam, req.body.question)
    .then((addExam) => {
      res.json(addExam);
    })
    .catch(next);
}

exports.findAll = (req, res, next) => {
  Exam.findAll()
    .then((exam) => {
      res.json(exam);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Exam.delete(req.body.id)
    .then(() => {
      Exam.findAll()
        .then((exams) => {
          res.json(exams);
        })
        .catch(next);
    })
    .catch(next);
};

exports.edit = (req, res, next) => {
  Exam.edit(req.body.form, req.body.question)
    .then(() => {
      Exam.findAll()
        .then((exams) => {
          res.json(exams);
        })
        .catch(next);
    })
    .catch(next);
}

exports.uploadImg = (req,res,next) => {
  res.json('upload');
}
