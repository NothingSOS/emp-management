const router = require('express').Router();
const AssetController = require('../../controllers/AssetController');
const multer = require('multer');
const mime = require('mime/lite');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/storage/private/asset');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}.${mime.getExtension(file.mimetype)}`);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('assetImage'), AssetController.create);

router.put('/', AssetController.update);

router.get('/', AssetController.findAll);

router.delete('/', AssetController.delete);

module.exports = router;
