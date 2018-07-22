const TakeExam = require('../models/TakeExam');
const mail = require('../mail');

exports.fetchEPRList = (req, res, next) => {
  TakeExam.fetchEPRList(req.query.id)
    .then((EPRList) => {
      res.json(EPRList);
    })
    .catch(next);
};

exports.fetchExamId = (req, res, next) => {
  TakeExam.fetchExamId()
    .then((ExamIdObject) => {
      res.json(ExamIdObject);
    })
    .catch(next);
};

exports.fetchRandomExIdList = (req, res, next) => {
  TakeExam.fetchRandomExIdList(req.body.id, req.body.testDate.toString())
    .then((List) => {
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
  TakeExam.findUploadedAnswer(object.id, 'existing check', object.testDate)
    .then((isExist) => {
      // if no old answer exist so create it first
      if (!isExist) {
        TakeExam.createBufferAnswer(object.id, object.answerList, object.testDate)
          .then(() => { })
          .catch(next);
      }
      // after we make sure it exist update it
      TakeExam.updateAnswer(object.id, object.answerList, new Date(), object.testDate)
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
  TakeExam.findUploadedAnswer(object.id, 'progress check', object.testDate.toString())
    .then((result) => {
      // if result null > not exist > create it 1st
      // initialize answerList with empty list
      if (!result) {
        TakeExam.createBufferAnswer(object.id, object.answerList, object.testDate, object.startTime)
          .then((createresult) => {
            res.json(createresult);
          })
          .catch(next);
      }
      else res.json(result);
    })
    .catch(next);
};

exports.updateSubmittedTime = (req, res, next) => {
  TakeExam.updateSubmittedTime(req.body.id, req.body.time, req.body.testDate)
    .then((retval) => {
      res.json(retval);
    })
    .catch(next);
};

exports.deActivate = (req, res, next) => {
  if (req.body.status !== 'deactive') {
    res.json('deactive status: not deactive type!');
  }
  else {
    TakeExam.changeStatus(req.body.id, 'Wait for Grading')
      .then(() => {
        TakeExam.expiredActivationLifetime(req.body.id)
          .then((retval) => {
            res.json('deactive status: '.concat(retval === null ? 'OK' : 'Something wrong'));
          })
          .catch(next);
      })
      .catch(next);
  }
};

exports.grading = (req, res, next) => {
  // fetch a random-ed id list
  TakeExam.fetchRandomExIdList(req.body.id, req.body.testDate)
    .then((object) => {
      TakeExam.fetchSolutionSpecifyId(object.randomExIdList)
        .then((examQuery) => {
          // console.log('EXAM QUERY:', examQuery);
          TakeExam.fetchCandidateAnswer(req.body.id, req.body.testDate)
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
                          // if candidate's answer is in solve count it!
                          if (eachExam.exAnswer.includes(eachAnswer)) correctCount += 1;
                        });
                      }
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
                    resultList.push({
                      ex_id: exId,
                      cd_id: answerQuery[0].id,
                      test_date: req.body.testDate,
                      // ex_question: eachExam.exQuestion,
                      // ex_choices: eachExam.exType === 'Choices' ? eachExam.exChoice : [],
                      cd_answer: tempAnswerList,
                      // ex_correct: eachExam.exAnswer,
                      // ex_type: eachExam.exType,
                      point,
                      status,
                    });
                  }
                });
              });
              TakeExam.uploadResult(resultList)
                .then((retval) => {
                  // no any element that isn't null => all is null
                  const isGradeNeed = resultList.filter(eachOne => eachOne.ex_type === 'Write-Up').length > 0;
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
