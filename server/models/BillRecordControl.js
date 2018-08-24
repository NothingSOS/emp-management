const db = require('../db');
const moment = require('moment');

const billrecord = {};

billrecord.findAll = id => (
  db.manyOrNone('SELECT b.id,b.statusapproveid,b.type_id,b.created_date,b.created_user,t.name,b.comment FROM billrecord as b, typebill as t WHERE t.id=b.type_id AND b.user_id=$1', [id])
);
billrecord.findByDetailId = (record_id) => {
  db.manyOrNone('SELECT * FROM billrecord WHERE id=$1', [record_id]);
};

billrecord.findApprovement = () => (
  db.manyOrNone('SELECT * FROM billapprovement')
);
billrecord.findUser = id => (
  db.oneOrNone('SELECT i.*,p.* FROM employee_info as i, employee_work as w, positions as p WHERE p.id=w.position_id AND w.user_id=i.user_id AND i.user_id=$1 ', [id])
);

billrecord.findBilldata = () => (
  db.manyOrNone('SELECT * FROM billdata  ')
);

billrecord.findBillDataById = dataarray => (
  db.tx((t) => {
    const queries = dataarray.map((data) => {
      return t.manyOrNone('SELECT * FROM billdata WHERE bill_record_id=$1', [data.id])
    });
    return t.batch(queries);
  })
);

billrecord.findChildOfApprover = userid => (
  db.one('SELECT COUNT(*) FROM employee_work WHERE boss_id=$1', [userid])
);


billrecord.findBilldataById = bill_record_id => (
  db.manyOrNone('SELECT * FROM billrecord as b ,billdata as c WHERE c.bill_record_id=b.id AND c.bill_record_id=$1', [bill_record_id])
);

billrecord.createBillRecord = (BillRecords, userid) => (
  db.oneOrNone(
    'INSERT INTO billrecord (user_id,type_id,statusApproveId,created_date,created_user) VALUES ($1,$2,$3,$4,$5) RETURNING id',
    [userid,
      BillRecords,
      0,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      userid
    ])
);

billrecord.createBillData = (rec_id, data, userid) => {
  db.oneOrNone(
    'INSERT INTO billdata (bill_record_id, field_1, field_2, field_3, field_4, field_5, created_date,created_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id ',
    [rec_id,
      data.field_1,
      data.field_2,
      data.field_3,
      data.field_4,
      data.field_5,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      userid
    ]
  )
}

billrecord.createBillData2 = (rec_id, data, userid) => (
  db.tx((t) => {
    const queries = data.map((l) => {
      console.log(data);
      return t.one(
        'INSERT INTO billdata (bill_record_id, field_1, field_2, field_3, field_4, field_5, created_date,created_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
        [rec_id, l.field_1, l.field_2, l.field_3, l.field_4, l.field_5, moment().format('YYYY-MM-DD HH:mm:ss'), userid], a => +a.id
      );
    });
    return t.batch(queries);
  })
);

billrecord.createApproveData = (rec_id, approver, userid) => (
  db.tx((t) => {
    const queries = approver.map(l =>
      t.one(
        'INSERT INTO approvedata (approve_record_id, approve_status, approver, created_date, created_user) VALUES($1, $2, $3, $4, $5) RETURNING id',
        [rec_id, 0, l.bossId, moment().format('YYYY-MM-DD HH:mm:ss'), userid], a => +a.id
      ));
    return t.batch(queries);
  })
);

billrecord.findApprover = userid => (
  db.many('SELECT * FROM employee_work WHERE user_id=$1', [userid])
);

billrecord.findApprovementId = rec_id => (
  db.one('SELECT id FROM billapprovement WHERE bill_record_id=$1', [rec_id])
);

billrecord.createApproveBill = (rec_id, userid) => (
  db.oneOrNone(
    'INSERT INTO billapprovement (bill_record_id, approvement_1, approvement_2, created_date, created_user) VALUES ($1,$2,$3,$4,$5) RETURNING id',
    [rec_id,
      0,
      0,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      userid
    ]
  )
);

billrecord.deleteErpDetail = (rec_id) => {
  db.any('DELETE FROM billdata WHERE bill_record_id=$1', [rec_id]);
};

billrecord.createErpDetail = (rec_id, data, userid) => (
  db.tx((t) => {
    const queries = data.map(l =>
      t.one(
        'INSERT INTO billdata (bill_record_id, field_1, field_2, field_3, field_4, field_5, created_date,created_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
        [rec_id, l.field1, l.field2, l.field3, l.field4, l.field5, moment().format('YYYY-MM-DD HH:mm:ss'), userid], a => +a.id
      ));
    return t.batch(queries);
  })
);

billrecord.deleteByBillId = (rec_id, app_id) => (
  db.tx(t =>
    // `t` and `this` here are the same;
    // this.ctx = transaction config + state context;
    t.batch([
      t.result('DELETE FROM billdata WHERE bill_record_id=$1', [rec_id]),
      t.result('DELETE FROM billapprovement WHERE bill_record_id=$1', [rec_id]),
      t.result('DELETE FROM billrecord WHERE id=$1', [rec_id]),
      t.result('DELETE FROM approvedata WHERE approve_record_id=$1', [app_id])
    ]))
);

billrecord.getImage = rec_id => (
  db.manyOrNone('SELECT * FROM billimageupload WHERE bill_record_id=$1', [rec_id])
);

module.exports = billrecord;
