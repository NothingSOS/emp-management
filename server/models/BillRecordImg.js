const db = require('../db');
const moment = require('moment');

const ImageErp = {};

ImageErp.createImgErp = (filearray, id_record, userid) => (
  db.tx((t) => {
    const queries = filearray.map((data) => {
      return t.one('INSERT INTO billimageupload (bill_record_id, filepath, filename, created_date, created_user) VALUES ($1,$2,$3,$4,$5) RETURNING id',[
        id_record, data.destination, data.filename, moment().format('YYYY-MM-DD HH:mm:ss'), userid
      ], a => +a.id);
    })
    return t.batch(queries);
  })
);
ImageErp.deleteImgName = (bill_record_id) => (
  db.result("DELETE FROM billimageupload WHERE bill_record_id=$1 ",[bill_record_id])
);
// ImageErp.insertImgName= (filearray,rec_id,userid) => (
//   db.tx( t=>{
//     const queries = filearray.map(data=>{
//       return db.one("INSERT INTO billimageupload (bill_record_id, filepath, filename, created_date,, created_user) VALUES  (&1, $2, $3, $4, $5) RETURNING id",
//         [id_record, data.destination, data.filename, moment().format('YYYY-MM-DD HH:mm:ss'), userid])
//     })
//   })
// )
// billrecord.createBillData2 = (rec_id, data, userid) => {
//   db.tx(t => {
//     const queries = data.map(l => {
//       return t.one('INSERT INTO billdata (bill_record_id, field_1, field_2, field_3, field_4, field_5, created_date,created_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
//         [rec_id, l.field_1, l.field_2, l.field_3, l.field_4, l.field_5, moment().format('YYYY-MM-DD HH:mm:ss'), userid], a => +a.id
//       );
//     });
//     return t.batch(queries);
//   })

// }

module.exports = ImageErp;
