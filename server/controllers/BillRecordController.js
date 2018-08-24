const BillRecordControl = require('../models/BillRecordControl');

exports.findByUserId = (req, res, next) => {
  let body_id = req.body.data_id
  BillRecordControl.findByUserId(body_id)
    .then((billrecordsbyuserid) => {
      res.json(billrecordsbyuserid);
    })
    .catch(next);
};

exports.findByDetailId = (req, res, next) => {
  let body_id = req.body.dataid;
  // console.log(req.body.dataid);
  BillRecordControl.findBilldataById(body_id)
    .then((billrecordsbyuserid) => {
      BillRecordControl.getImage(body_id)
        .then((image) => {
          res.json([billrecordsbyuserid, image]);
        });
    })
    .catch(next);
};

exports.createErpDetail = (req, res, next) => {
  let userid = req.user.id;
  let data_id = req.body.user[0].idbill;
  let databody = req.body.user[2].fieldlist;
  const delbill = BillRecordControl.deleteErpDetail(data_id);
  const readdbill = BillRecordControl.createErpDetail(data_id, databody, userid);
  Promise.all([readdbill])
    .then((data) => {
      // console.log(data);
      res.json(data);
    });
};

exports.create = (req, res, next) => {
  // console.log(req.body);
  const recordbody = req.body.billrecord[0].data;
  const databody = req.body.billrecord[1].fieldlist;
  // console.log(req.body.billrecord[1].fieldlist);
  BillRecordControl.createBillRecord(recordbody, req.user.id)
    .then((billrecordcreate) => {
      const record = billrecordcreate.id;
      // console.log(record);
      BillRecordControl.createBillData2(record, databody, req.user.id)
        .then((billdata) => {
          BillRecordControl.createApproveBill(record, req.user.id)
            .then((approvebill) => {
              const approvebill_rec_id = approvebill.id;
              // console.log(approvebill_rec_id);
              BillRecordControl.findApprover(req.user.id)
                .then((approverarray) => {
                  approverarray.push({ bossId: 10001 });
                  // console.log(approverarray);
                  BillRecordControl.createApproveData(approvebill_rec_id, approverarray, req.user.id)
                    .then((outputbill) => {
                      res.json(record);
                    }).catch(next);
                }).catch(next);
            }).catch(next);
        }).catch(next);
      // const billapprove = BillRecordControl.createApproveBill(record, req.user.id);
      // .then(approvebill_rec_id => {
      // })
      // .catch(next);
    })
    .catch(next);
};

exports.deleteByBillId = (req, res, next) => {
  const record_id = req.body.id;
  // console.log(record_id);
  BillRecordControl.findApprovementId(record_id)
    .then((app_id) => {
      BillRecordControl.deleteByBillId(record_id, app_id.id)
        .then((data) => {
          console.log(data);
          res.json(data);
        })
        .catch(next);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  const userid = req.user.id;
  BillRecordControl.findApprovement()
    .then((fetchApprove) => {
      BillRecordControl.findUser(userid)
        .then((fetchuser) => {
          BillRecordControl.findAll(userid)
            .then((fetchall) => {
              const fetching = [];
              fetching.push({ "fetchuser": fetchuser })
              fetching.push({ "fetchall": fetchall })
              fetching.push({ "fecthapprove": fetchApprove })
              BillRecordControl.findBilldata()
                .then((fetchoutput) => {
                  var i = 0;
                  fetching[1].fetchall.forEach((element) => {
                    fetching[1].fetchall[i]["data"] = [];
                    fetchoutput.forEach((element2) => {
                      if (element.id == element2.billRecordId) {
                        fetching[1].fetchall[i]["data"].push({ element2 });
                      }
                    });
                    i++;
                  });
                  // fetching.push(fetchoutput);
                  res.json(fetching);
                }).catch(next);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.findAllRecordErp = (req, res, next) => {
  const userid = req.user.id;
  BillRecordControl.findUser(userid)
    .then((data_user) => {
      BillRecordControl.findAll(userid)
        .then((data_erp_record) => {
          const fetching = [];
          fetching.push({ "fetchuser": data_user });
          fetching.push({ "fetchall": data_erp_record });
          BillRecordControl.findBillDataById(data_erp_record)
            .then((data_erpdetail_record) => {
              for (var i = 0; i < fetching[1].fetchall.length; i++) {
                fetching[1].fetchall[i]['data'] = [];
                fetching[1].fetchall[i]['data'].push(data_erpdetail_record[i][0]);
                // console.log(data_erpdetail_record[i][0])
              }
              BillRecordControl.findChildOfApprover(userid)
                .then((count_child) => {
                  // console.log(count_child);
                  var count_bool = true;
                  if (count_child.count > 0) {
                    count_bool = true;
                  }
                  else {
                    count_bool = false;
                  }
                  fetching.push({ approveBoolean: count_bool });
                  res.json(fetching);
                });
            });
        })
        .catch(next);
    })
    .catch(next);
};
