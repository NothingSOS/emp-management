const router = require('express').Router();
const BillRecordImgController = require('../../controllers/BillRecordImgController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/storage/public/imgerp');
  },
  filename: (req, file, cb) => {
    cb(null, String(req.user.id) + Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.array('addrow',10), BillRecordImgController.updateProfileImg);
router.post('/', BillRecordImgController.imgUpdate);

module.exports = router;
