const Recruitment = require('../models/Recruitment');

exports.fetchAllRecruitment = (req, res, next) => {
  Recruitment.fetchAllRecruitment()
    .then((recruitments) => {
      res.json(recruitments);
    })
    .catch(next);
};

exports.checkPasswordStatus = (req, res, next) => {
  Recruitment.checkPasswordStatus(req.query.id)
    .then((passwordStatusObject) => {
      res.json(passwordStatusObject);
    })
    .catch(next);
};

exports.getTestDate = (req, res, next) => {
  Recruitment.getTestDate(req.query.id)
    .then((testDate) => {
      res.json(testDate.appointment);
    })
    .catch(next);
};

exports.activatePassword = (req, res, next) => {
  // function didn't handle if no user in exam_users2
  Recruitment.activatePassword(
    req.body.id,
    req.body.lifetimes < 1 ? 0 : req.body.lifetimes,
    req.body.lifetimes < 1 ? null : req.body.testDate,
  )
    .then((message) => {
      res.json(message);
    })
    .catch(next);
};

exports.uploadRandomExIdList = (req, res, next) => {
  const randomExIdList = [];
  Object(req.body.randomExIdList).map(item => (
    item.exIdList.map(sublist => (randomExIdList.push(sublist)))
  ));
  Recruitment.uploadRandomExIdList(randomExIdList, req.body.id, req.body.testDate)
    .then((ok) => {
      res.json(ok);
    })
    .catch(next);
};

// Recruitment : View Result part

exports.grading = (req, res, next) => {
  // fetch a random-ed id list
  Recruitment.fetchRandomExIdList(req.body.id, req.body.testDate)
    .then((object) => {
      // send random-ed list to get an exam list
      Recruitment.fetchExamSpecifyId(object.randomExIdList)
        .then((examQuery) => {
          // console.log('EXAM QUERY:', examQuery);
          // fetch candidate answer
          Recruitment.fetchCandidateAnswer(req.body.id, req.body.testDate)
            .then((answerQuery) => {
              const resultList = [];
              console.log('Ans Qry:', answerQuery);
              // foreach exId let compare the answer
              object.randomExIdList.map((exId) => {
                Object(examQuery).map((eachExam) => {
                  if (eachExam.exId === exId) {
                    let correctCount = 0;
                    const answerTemp = [];
                    let tempAnswerList = [];
                    Object(answerQuery[0].answerList).map((eachAnswerList) => {
                      // console.log('???>>>???<<<???', answerQuery[0]);
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
                      ex_question: eachExam.exQuestion,
                      ex_choices: eachExam.exType === 'Choices' ? eachExam.exChoice : [],
                      cd_answer: tempAnswerList,
                      ex_correct: eachExam.exAnswer,
                      ex_type: eachExam.exType,
                      point,
                      status,
                    });
                  }
                });
              });
              console.log('ResultList', resultList);
              Recruitment.uploadResult(resultList)
                .then((returnStatus) => {
                  res.json(returnStatus);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.fetchExam = (req, res, next) => {
  Recruitment.fetchExam(req.body.id, req.body.testDate)
    .then((exam) => {
      res.json(exam);
    })
    .catch(next);
};
