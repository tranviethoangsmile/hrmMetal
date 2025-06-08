import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, '');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname);
    },
});
export const upload = multer({
    limits: { fileSize: 100 * 1024 * 1024 },
    storage: storage,
});
