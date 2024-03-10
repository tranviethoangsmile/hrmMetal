import { Request, Response, Router } from 'express';
const uploadAvatar: Router = Router();
import multer from 'multer';
import { create_media_path } from '../../../middlewares/createTrainning.middleware';
import { update } from '../../../controllers/user/user.controller';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/media/uploads/');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

uploadAvatar.post(
    '/',
    upload.single('avatar'),
    create_media_path,
    async (req: Request, res: Response) => {
        const user_field = req.body;
        try {
            const result = await update(user_field);
            if (result?.success) {
                res.status(201).send({
                    success: true,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: result?.message,
                });
            }
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: 'server error: ' + error.mesage,
            });
        }
    },
);

export default uploadAvatar;
