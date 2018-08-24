const Applicant = require('../models/Applicant');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  host: 'cpanel01wh.bkk1.cloud.z.com',
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  secure: true
}));

exports.create = (req, res, next) => {
  const newApplicant = req.body;
  Applicant.create(newApplicant, req.user.rowId)
    .then((result) => {
      res.json(result.rowId);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Applicant.findAll()
    .then((applicants) => {
      res.json(applicants);
    })
    .catch(next);
};

exports.updateStatus = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateStatus(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateInterviewDateTime = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.findInfoById(editApplicant.rowId).then((selectApplicant) => {
    if (!(selectApplicant.interviewDate === null && selectApplicant.interviewTime === null)) {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: `${selectApplicant.email}`,
        subject: 'HR Playtorium : Interview Appointment เปลี่ยนวัน',
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
        <p>Playtorium Solutions Company Limited would like to make an appointment</p>
        <br />
        <hr />
        <p>for  <span style="background-color: #FFFF00">Interview</span> as details below;</p>    
        <p><span style="background-color: #FFFF00">Date : ${editApplicant.date} </span></p>
        <p><span style="background-color: #FFFF00">Time : ${editApplicant.time}  : Interview and Portfolio Presentation (If Applicable)</span></p>
        <p>Venue : PLAYTORIUM office, SJ Infinite One Business Complex, 11th Fl., (map as attached)</p>
        <p> Contact : Khun Suphattra 0819222562 </p>
        <br />
        <hr />
        <p>For more info about Company products and services please visit our website: <a href="https://www.playtorium.co.th">www.playtorium.co.th</a> [1] and FB: PlaytoriumSolutions </p>
        <p>Best regards,</p>
        <p>Suphattra Trairatwarakorn</p>
        <p>Account Manager</p>
        <p>Playtorium Solutions Company Limited</p>
        <p>Mobile : 0819222562</p>
        `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
        }]
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(info);
        }
      });
    }
    else {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: `${selectApplicant.email}`,
        subject: 'HR Playtorium : Interview Appointment',
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
            <p>Playtorium Solutions Company Limited would like to make an appointment</p>
            <br />
            <hr />
            <p>for  Interview&Exam as details below;</p>    
            <p><span style="background-color: #FFFF00">Interview Date : ${editApplicant.date} </span></p>
            <p><span style="background-color: #FFFF00">Interview Time : ${editApplicant.time}  : Interview and Portfolio Presentation (If Applicable)</span></p>
            <p><span style="background-color: #FFFF00">Exam Date : ${editApplicant.date} </span></p>
            <p><span style="background-color: #FFFF00">Exam Time : ${editApplicant.time}</span></p>
            <p>Venue : PLAYTORIUM office, SJ Infinite One Business Complex, 11th Fl., (map as attached)</p>
            <p> Contact : Khun Suphattra 0819222562 </p>
            <br />
            <hr />
            <p>For more info about Company products and services please visit our website: <a href="https://www.playtorium.co.th">www.playtorium.co.th</a> [1] and FB: PlaytoriumSolutions </p>
            <p>Best regards,</p>
            <p>Suphattra Trairatwarakorn</p>
            <p>Account Manager</p>
            <p>Playtorium Solutions Company Limited</p>
            <p>Mobile : 0819222562</p>
            `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
        }]
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(info);
        }
      });
    }
  }).catch(next);
  Applicant.updateInterviewDateTime(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateSignedPosition = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateSignedPosition(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateSignDateTime = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.findInfoById(editApplicant.rowId).then((selectApplicant) => {
    if (!(selectApplicant.signDate === null && selectApplicant.signTime === null)) {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: `${selectApplicant.email}`,
        subject: `HR Playtorium : Employment Contract Appointment for ${selectApplicant.signedPosition} (Change)`,
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
        <p> Congratulations! We are pleased to offer you an employment with Playtorium and welcome you to an exciting career and personal development. </p>
        <p> Confirmation for signing an employment agreement :${selectApplicant.signDate} (${selectApplicant.signTime}) </p>
        <p> In order to facilitate the employment process, we kindly ask you to bring the following documents on these day you come to our office to sign the agreement: </p>
        <p> 1.    One-inch photo  (1 photo)
            2.    Your resume
            3.    A copy of your Identification Card
            4.    A copy of your House Registration
            5.    A copy of your transcript (in case you hold a Master’s Degree or above, please provide all transcripts)
            6.  Toeic test score (if any)
            7.  A Copy of latest Pay Slip or Confirmation letter from latest company (หนังสือรับรองรายได้จากที่ทำงานล่าสุดหรือสำเนาสลิปเดือน)
            8.  Evidence of Military Exemption (if any)
            9.  A copy of  the first page of your Bangkok Bank Passbook with your Name and Account number (for salary payment)</p>
        <p> If you need any further information please contact to me. </p>
        <p> We look forward to meeting you soon, </p>
        <p>Suphattra Trairatwarakorn</p>
        <p>Account Manager</p>
        <p>Playtorium Solutions Company Limited</p>
        <p>Mobile : 0819222562</p>
        `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
        }]
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(info);
        }
      });
    }
    else {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: `${selectApplicant.email}`,
        subject: `HR Playtorium : Employment Contract Appointment for ${selectApplicant.signedPosition}`,
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
        <p> Congratulations! We are pleased to offer you an employment with Playtorium and welcome you to an exciting career and personal development. </p>
        <p> Confirmation for signing an employment agreement :${selectApplicant.signDate} (${selectApplicant.signTime}) </p>
        <p> In order to facilitate the employment process, we kindly ask you to bring the following documents on these day you come to our office to sign the agreement: </p>
        <p> 1.    One-inch photo  (1 photo)
            2.    Your resume
            3.    A copy of your Identification Card
            4.    A copy of your House Registration
            5.    A copy of your transcript (in case you hold a Master’s Degree or above, please provide all transcripts)
            6.  Toeic test score (if any)
            7.  A Copy of latest Pay Slip or Confirmation letter from latest company (หนังสือรับรองรายได้จากที่ทำงานล่าสุดหรือสำเนาสลิปเดือน)
            8.  Evidence of Military Exemption (if any)
            9.  A copy of  the first page of your Bangkok Bank Passbook with your Name and Account number (for salary payment)</p>
        <p> If you need any further information please contact to me. </p>
        <p> We look forward to meeting you soon, </p>
        <p>Suphattra Trairatwarakorn</p>
        <p>Account Manager</p>
        <p>Playtorium Solutions Company Limited</p>
        <p>Mobile : 0819222562</p>
        `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
        }]
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(info);
        }
      });
    }
  }).catch(next);
  Applicant.updateSignDateTime(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateFirstDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateFirstDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateRejectDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateRejectDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateCancelDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateCancelDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateBlacklistDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateBlacklistDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateExamDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.findInfoById(editApplicant.rowId).then((selectApplicant) => {
    if (!(selectApplicant.examDate === null && selectApplicant.examTime === null)) {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: `${selectApplicant.email}`,
        subject: 'HR Playtorium : Interview Appointment เปลี่ยนสอบ',
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
        <p>Playtorium Solutions Company Limited would like to make an appointment</p>
        <br />
        <hr />
        <p>for  <span style="background-color: #FFFF00">Exam</span> as details below;</p>    
        <p><span style="background-color: #FFFF00">Date : ${editApplicant.date} </span></p>
        <p><span style="background-color: #FFFF00">Time : ${editApplicant.time} </span></p>
        <p>Venue : PLAYTORIUM office, SJ Infinite One Business Complex, 11th Fl., (map as attached)</p>
        <p> Contact : Khun Suphattra 0819222562 </p>
        <br />
        <hr />
        <p>For more info about Company products and services please visit our website: <a href="https://www.playtorium.co.th">www.playtorium.co.th</a> [1] and FB: PlaytoriumSolutions </p>
        <p>Best regards,</p>
        <p>Suphattra Trairatwarakorn</p>
        <p>Account Manager</p>
        <p>Playtorium Solutions Company Limited</p>
        <p>Mobile : 0819222562</p>
        `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
        }]
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(info);
        }
      });
    }
  }).catch(next);
  Applicant.updateExamDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateNote = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateNote(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateInterviewResult = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateInterviewResult(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.findInfoById = (req, res, next) => {
  Applicant.findInfoById(req.query.id)
    .then((applicantInfo) => {
      res.json(applicantInfo);
    })
    .catch(next);
};

exports.findFileById = (req, res, next) => {
  Applicant.findFileById(req.query.id)
    .then((applicantInfo) => {
      res.json(applicantInfo);
    })
    .catch(next);
};

exports.upload = (req, res, next) => {
  // console.log(req);
  Applicant.upload(`/applicants-files/`, `${req.body.rowId}_${req.body.type}.pdf`, req.body.citizenId, req.body.type, req.body.rowId)
    .then(() => {
      res.json('complete');
    })
    .catch(next);
};

exports.getPosition = (req, res, next) => {
  Applicant.getPosition()
    .then((position) => {
      res.json(position);
    })
    .catch(next);
};

exports.getExamUser = (req, res, next) => {
  Applicant.getExamUser(req.body.rowId.toString(), req.body.testDate, req.body.citizenId)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

exports.activateExamUser = (req, res, next) => {
  let lifetime = parseInt(req.body.timeLength, 10);
  if (req.body.timeUnit === 'Hour(s)') {
    lifetime *= 60;
  }
  else if (req.body.timeUnit === 'Day(s)') {
    lifetime *= (60 * 24);
  }

  Applicant.getAndUpdateRequiredExam(req.body.rowId, req.body.testDate, lifetime, req.body.registerDate)
    .then((exam) => {
      res.json(exam);
    })
    .catch(next);
};

exports.updateTestStatus = (req, res, next) => {
  Applicant.updateTestStatus(req.body.rowId, req.body.testStatus)
    .then(() => res.json('Update test status complete'))
    .catch(next);
};

exports.getTestStatus = (req, res, next) => {
  Applicant.getTestStatus(req.body.rowId)
    .then((testStatus) => {
      res.json(testStatus);
    })
    .catch(next);
};

exports.changeInterviewDone = (req, res, next) => {
  console.log(req.body.applicant, typeof req.body.applicant);
  Applicant.changeInterviewDone(req.body.applicant)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

exports.changeStatus = (req, res, next) => {
  console.log('aaa:', req.body);
  Applicant.changeStatus(req.body.rowId, req.body.status)
    .then(() => {
      res.json('');
    })
    .catch(next);
};

exports.getExamDate = (req, res, next) => {
  Applicant.getExamDate(req.query.citizenId)
    .then((examDate) => {
      res.json(examDate);
    })
    .catch(next);
};

exports.fetchGradingExam = (req, res, next) => {
  Applicant.fetchGradingExam(req.query.rowId)
    .then((exam) => {
      res.json(exam);
    })
    .catch(next);
};

exports.fetchEPRList = (req, res, next) => {
  Applicant.fetchEPRList(req.query.id)
    .then((EPRList) => {
      res.json(EPRList);
    })
    .catch(next);
};

exports.fetchExamId = (req, res, next) => {
  Applicant.fetchExamId()
    .then((ExamIdObject) => {
      res.json(ExamIdObject);
    })
    .catch(next);
};

exports.uploadRandomExIdList = (req, res, next) => {
  const randomExIdList = [];
  Object(req.body.randomExIdList).map(item => (
    item.exIdList.map(sublist => (randomExIdList.push(sublist)))
  ));
  Applicant.uploadRandomExIdList(randomExIdList, req.body.rowId)
    .then()
    .catch(next);
};

exports.uploadGradeProgress = (req, res, next) => {
  Applicant.uploadGradeProgress(req.body.gradingList)
    .then((message) => {
      console.log('>>>>', message);
      res.json(message);
    })
    .catch(next);
};

exports.getRowId = (req, res, next) => {
  Applicant.getRowId(req.body.id, req.body.testDate)
    .then((rowId) => {
      console.log(req.body, rowId);
      res.json(rowId);
    })
    .catch(next);
};

exports.checkApproveStatus = (req, res, next) => {
  Applicant.checkApproveStatus(req.query.rowId)
    .then((retval) => {
      console.log('retval:', retval);
      console.log('retval.isExist === 1? :', retval.isExist === 1);
      res.json(retval.isExist === 1);
    })
    .catch(next);
};

exports.fetchViewResult = (req, res, next) => {
  Applicant.fetchViewResult(req.query.id)
    .then((retval) => {
      res.json(retval);
    })
    .catch(next);
};


exports.fetchGradedExam = (req, res, next) => {
  Applicant.fetchGradedExam(req.query.rowId)
    .then((exam) => {
      res.json(exam);
    })
    .catch(next);
};

exports.fetchWeight = (req, res, next) => {
  Applicant.fetchWeight(req.body.categoryList)
    .then((retval) => {
      res.json(retval);
    })
    .catch(next);
};
