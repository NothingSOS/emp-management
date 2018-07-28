const TakeExam = require('../models/TakeExam');
const mail = require('../mail');
const moment = require('moment');

exports.fetchRandomExIdList = (req, res, next) => {
  TakeExam.fetchRandomExIdList(req.body.rowId.toString())
    .then((List) => {
      console.log(List);
      res.json(List);
    })
    .catch(next);
};

exports.fetchExamSpecifyId = (req, res, next) => {
  const rawIdList = req.body.idList;
  TakeExam.fetchExamSpecifyId(rawIdList.randomExIdList)
    .then((examList) => {
      res.json(examList);
    })
    .catch(next);
};

exports.updateAnswer = (req, res, next) => {
  const object = req.body;
  TakeExam.findUploadedAnswer(object.rowId.toString(), 'existing check')
    .then((retval) => {
      if (!retval.isExist) {
        TakeExam.createBufferAnswer(object.id, object.answerList, object.testDate, moment().format('YYYY-MM-DD'), object.rowId)
          .then()
          .catch(next);
      }
      TakeExam.updateAnswer(object.rowId.toString(), object.answerList, new Date())
        .then((result) => {
          if (result === null) res.json('Update Complete');
          else res.json('Something wrong :'.concat(result));
        })
        .catch(next);
    })
    .catch(next);
};

exports.findUploadedAnswer = (req, res, next) => {
  const object = req.body;
  TakeExam.findUploadedAnswer(object.rowId.toString(), 'progress check')
    .then((result) => {
      if (!result) {
        TakeExam.createBufferAnswer(object.id, object.answerList, object.testDate, object.startTime, object.rowId)
          .then()
          .catch(next);
      }
      else res.json(result);
    })
    .catch(next);
};

exports.updateSubmittedTime = (req, res, next) => {
  TakeExam.updateSubmittedTime(req.body.rowId, req.body.time)
    .then(() => {
      res.json('update submitted time complete');
    })
    .catch(next);
};

exports.deActivate = (req, res, next) => {
  TakeExam.changeStatus(req.body.rowId, req.body.status)
    .then(() => {
      TakeExam.expiredActivationLifetime(req.body.rowId)
        .then((retval) => {
          res.json('deactive status: '.concat(retval === null ? 'OK' : 'Something wrong'));
        })
        .catch(next);
    })
    .catch(next);
};

exports.grading = (req, res, next) => {
  TakeExam.fetchRandomExIdList(req.body.rowId)
    .then((object) => {
      TakeExam.fetchSolutionSpecifyId(object.randomExIdList)
        .then((examQuery) => {
          TakeExam.fetchCandidateAnswer(req.body.rowId)
            .then((answerQuery) => {
              const resultList = [];
              object.randomExIdList.map((exId) => {
                Object(examQuery).map((eachExam) => {
                  if (eachExam.exId === exId) {
                    let correctCount = 0;
                    const answerTemp = [];
                    let tempAnswerList = [];
                    Object(answerQuery[0].answerList).map((eachAnswerList) => {
                      answerTemp.push(JSON.parse(eachAnswerList).answer);
                      if (JSON.parse(eachAnswerList).question === exId) {
                        tempAnswerList = JSON.parse(eachAnswerList).answer === '' ? [] : JSON.parse(eachAnswerList).answer;
                        tempAnswerList.map((eachAnswer) => {
                          if (eachExam.exAnswer.includes(eachAnswer)) correctCount += 1;
                          return null;
                        });
                      }
                      return null;
                    });
                    let point = [0, 0];
                    let status;
                    if (eachExam.exType === 'Choices') {
                      point = [correctCount, eachExam.exAnswerLength];
                      status = 'Graded';
                    }
                    else if (eachExam.exType === 'Write-Up') {
                      point = ['UNKNOWN', 'UNKNOWN'];
                      status = 'Wait for grading';
                    }
                    // feature in the future
                    // multi style on multi choices type exam
                    // pickable : correct : all
                    // if 'Choices - one:one:many':
                    // if 'Choices - some:many:many':
                    // if 'Choices - some:some:many':
                    console.log(exId, ',', req.body.rowId);
                    resultList.push({
                      ex_id: exId,
                      cd_id: answerQuery[0].id,
                      test_date: moment().format('YYYY-MM-DD'),
                      // ex_question: eachExam.exQuestion,
                      // ex_choices: eachExam.exType === 'Choices' ? eachExam.exChoice : [],
                      cd_answer: tempAnswerList,
                      rowId: req.body.rowId,
                      // ex_correct: eachExam.exAnswer,
                      // ex_type: eachExam.exType,
                      point,
                      status,
                    });
                  }
                  return null;
                });
                return null;
              });
              console.log(resultList);
              TakeExam.uploadResult(resultList)
                .then((retval) => {
                  // no any element that isn't null => all is null
                  const isGradeNeed = resultList.filter(eachOne => eachOne.point[0] === 'UNKNOWN' && eachOne.point[1] === 'UNKNOWN').length > 0;
                  console.log(isGradeNeed);
                  res.json(retval.filter(eachOne => eachOne === null).length === retval.length ? isGradeNeed : 'Something wrong');
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.sendMail = (req, res, next) => {
  console.log('?>', req.body);
  TakeExam.getName(req.body.id, req.body.currentTime)
    .then((name) => {
      let messageStatus = '<p>You can see the result in Playtorium HR site.</p>';
      if (req.body.needCheck) {
        messageStatus = '<p style="color: red">There are some questions that haven\'t checked yet. Please check those questions in Playtorium HR site.</p>';
      }
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: 'bestmaxger@hotmail.com',
        subject: '[Exam] '
          .concat(name.firstName)
          .concat(' ')
          .concat(name.lastName)
          .concat(' has already finished take exam.'),
        html: `<div>
        <p>${name.firstName} ${name.lastName} has already finished take exam.</p>
        ${messageStatus}
        <div>`
      };
      mail.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(info);
        }
      });
      res.json('Send mail success!');
    })
    .catch(next);
};

exports.getRowId = (req, res, next) => {
  TakeExam.getRowId(req.body.id, req.body.testDate)
    .then((rowId) => {
      console.log(req.body, rowId);
      res.json(rowId);
    })
    .catch(next);
};
