const ApproveBillRecordControl = require('../models/ApproveBillRecord');

const findDetail = (approveidset, res) => {
  ApproveBillRecordControl.findDetail(approveidset)
    .then((dataapprove) => {
      var i = 0;
      approveidset.forEach((q) => {
        approveidset[i].data = dataapprove[i];
        i++;
      });
      res.json(approveidset);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findAll = (req, res, next) => {
  const userid = req.user.id;
  // console.log(userid);
  if (req.user.id === 10001) {
    ApproveBillRecordControl.findAll(userid)
      .then(approveidset => findDetail(approveidset, res))
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    ApproveBillRecordControl.findUserBill(userid)
      .then(approveidset => findDetail(approveidset, res))
      .catch((err) => {
        console.log(err);
      });
  }

};

const findApproveDataRecord = (res, next, output, userid, data, rec_id, comment) => {
  ApproveBillRecordControl.findApproveDataRecord(output.approveRecordId, output.createdUser)
    .then((record) => {
      console.log(record);

      var status_number;
      var first_approver = parseInt(record[0].approveStatus);
      var second_approver = parseInt(record[1].approveStatus);
      console.log(first_approver);
      console.log(second_approver);

      if (first_approver === 0 && second_approver === 0) {
        status_number = 0;
      }
      else if ((first_approver === 0 && second_approver === 1) || (first_approver === 1 && second_approver === 0)) {
        status_number = 1;
      }
      else if ((first_approver === 0 && second_approver === 2) || (first_approver === 2 && second_approver === 0)) {
        status_number = 2;
      }
      else if ((first_approver === 1 && second_approver === 2) || (first_approver === 2 && second_approver === 1)) {
        status_number = 2;
      }
      else if (first_approver === 1 && second_approver === 1) {
        status_number = 3;
      }
      else if (first_approver === 2 && second_approver === 2) {
        status_number = 2;
      }
      else {
        approveStatus_number = 999;
      }
      // 0 = pending; 1 = 1st complete; 2 = reject; 3 = complete
      console.log(status_number);
      console.log(record[0].approveRecordId);
      ApproveBillRecordControl.updateBillRecordByStatus(status_number, record[0].approveRecordId, userid, comment)
        .then((op) => {
          // console.log(userid);
          ApproveBillRecordControl.findAll(userid)
            .then((approveidset) => {
              // res.json([dataapprove])
              ApproveBillRecordControl.findDetail(approveidset)
                .then((dataapprove) => {
                  var i = 0;
                  approveidset.forEach((q) => {
                    approveidset[i].data = dataapprove[i];
                    i++;
                  });
                  res.json(approveidset);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((next));
};

exports.updateStatus = (req, res, next) => {
  const userid = req.user.id;
  const data = req.body.approvement;
  const rec_id = req.body.id;
  const comment = req.body.comment;
  const type = req.body.type;
  console.log(req.body);

  ApproveBillRecordControl.updateApproveData(data, rec_id, userid)
    .then((output) => {
      console.log(output);
      if (type === 1) {
        console.log('MD');
        ApproveBillRecordControl.updateBillApprovementMD(data, rec_id, userid)
          .then(() => findApproveDataRecord(res, next, output, userid, data, rec_id, comment))
          .catch(next);
      }
      else if (type === 0) {
        console.log('BOSS');

        ApproveBillRecordControl.updateBillApprovementBoss(data, rec_id, userid)
          .then(() => findApproveDataRecord(res, next, output, userid, data, rec_id, comment))
          .catch(next);
      }

    })
    .catch(next);
};
