const router = require('express').Router();
const ExamController = require('../../controllers/ExamController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/storage/public/exam-img');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/upload-image-exam', upload.array('image'), ExamController.uploadImg);
router.post('/', ExamController.create);
router.get('/', ExamController.findAll);
router.delete('/', ExamController.delete);
router.put('/', ExamController.edit);

module.exports = router;
