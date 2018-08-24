const billRecordImg = require('../models/BillRecordImg');


exports.updateProfileImg = (req, res, next) => {
  // `/static/${req.file.destination}/${req.file.filename}`,req.file.filename,
  billRecordImg.createImgErp(req.files, req.body.idrecord, req.user.id)
    .then(() => {
      res.json('upload complete!!!');
    });
};

exports.imgUpdate = (req, res, next) => {
  let rec_id = req.body.idrecord;
  let body_id = req.body.img;
  let user_id = req.user.id;
  billRecordImg.deleteImgName(rec_id)
    .then((output) => {
      billRecordImg.createImgErp(body_id, rec_id, user_id)
        .then(() => {
          res.json('upload complete!!!');
        })
        .catch(next);
    })
    .catch(next);
};
